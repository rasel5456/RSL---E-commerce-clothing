import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import ReviewSection from "@/app/components/ReviewSection";
import ProductCard from "@/app/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function fetchProduct(slug: string) {
  // প্রথমে slug দিয়ে খুঁজছি (নতুন, SEO-friendly URL)
  const { data: bySlug } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (bySlug) return bySlug;

  // slug দিয়ে না পেলে, পুরনো UUID হিসেবে চেষ্টা করছি (আগের Link গুলো ভেঙে না যাওয়ার জন্য)
  const { data: byId } = await supabase.from("products").select("*").eq("id", slug).single();
  return byId;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return { title: "Product Not Found | RSL" };
  }

  const description = product.description
    ? product.description.slice(0, 155)
    : "Shop " + product.name + " at RSL. Premium quality clothing with fast delivery across Bangladesh.";

  const image = product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL";

  return {
    title: product.name + " | RSL Fashion Store",
    description: description,
    openGraph: {
      title: product.name + " | RSL",
      description: description,
      images: [image],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image: product.images && product.images[0] ? product.images[0] : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.discount_price || product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetailClient product={product} />

      {relatedProducts && relatedProducts.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-[#DDD6C8]">
          <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.slug || p.id}
                name={p.name}
                price={p.price}
                discountPrice={p.discount_price}
                image={p.images && p.images[0] ? p.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
                sizes={p.sizes || []}
                colors={p.colors || []}
                stock={p.stock}
                soldCount={p.sold_count}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ReviewSection productId={product.id} initialReviews={reviews || []} />
    </div>
  );
}
