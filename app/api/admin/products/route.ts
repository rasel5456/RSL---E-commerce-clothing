import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // supabaseAdmin ব্যবহার করছি কারণ এটা RLS (Row Level Security) কে bypass করে
  // Public client (supabase.ts) দিয়ে insert করা যাবে না, কারণ শুধু SELECT policy আছে
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      stock: body.stock,
      sizes: body.sizes,
      colors: body.colors,
      images: body.images,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, product: data[0] });
}