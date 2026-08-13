import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import ReviewSection from "@/app/components/ReviewSection";

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

  return (
    <div>
      <ProductDetailClient product={product} />
      <ReviewSection productId={id} initialReviews={reviews || []} />
    </div>
  );
}
