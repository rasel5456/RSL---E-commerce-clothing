import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return base + "-" + randomSuffix;
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, products: data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

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
      color_images: body.color_images,
      images: body.images,
      slug: generateSlug(body.name),
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
