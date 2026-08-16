import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import ReviewSection from "@/app/components/ReviewSection";
import ProductCard from "@/app/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", id)
    .limit(4);

  return (
    <div>
      <ProductDetailClient product={product} />
      <ReviewSection productId={id} initialReviews={reviews || []} />

      {relatedProducts && relatedProducts.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-[#DDD6C8]">
          <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                discountPrice={p.discount_price}
                image={p.images && p.images[0] ? p.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
                sizes={p.sizes || []}
                colors={p.colors || []}
                stock={p.stock}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
