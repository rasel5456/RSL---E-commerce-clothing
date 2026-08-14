import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // supabaseAdmin à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à¦›à¦¿ à¦•à¦¾à¦°à¦£ à¦à¦Ÿà¦¾ RLS (Row Level Security) à¦•à§‡ bypass à¦•à¦°à§‡
  // Public client (supabase.ts) à¦¦à¦¿à¦¯à¦¼à§‡ insert à¦•à¦°à¦¾ à¦¯à¦¾à¦¬à§‡ à¦¨à¦¾, à¦•à¦¾à¦°à¦£ à¦¶à§à¦§à§ SELECT policy à¦†à¦›à§‡
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name: body.name,
      description: body.description,
      price: body.price,
      discount_price: body.discount_price,
      category: body.category,
      gender: body.gender,
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

