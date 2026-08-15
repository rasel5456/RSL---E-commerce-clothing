import { supabase } from "@/lib/supabase";
import ProductCard from "../components/ProductCard";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .or("name.ilike.%" + query + "%,category.ilike.%" + query + "%")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 min-h-[60vh]">
      <h1 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
        Search results for: "{query}"
      </h1>

      {error ? <p className="text-red-600">Something went wrong: {error.message}</p> : null}

      {!error && (!products || products.length === 0) ? (
        <p className="text-[#6E675C]">No products found matching your search.</p>
      ) : null}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {products ? products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
            sizes={product.sizes || []}
            colors={product.colors || []}
            discountPrice={product.discount_price}
            stock={product.stock}
          />
        )) : null}
      </div>
    </div>
  );
}

