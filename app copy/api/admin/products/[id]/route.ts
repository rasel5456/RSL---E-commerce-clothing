import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET: à¦à¦•à¦Ÿà¦¾ à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ product à¦à¦° data à¦¨à¦¿à¦¯à¦¼à§‡ à¦†à¦¸à¦¾
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, product: data });
}

// PUT: existing product à¦à¦° data à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à¦¾
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("products")
    .update({
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      gender: body.gender,
      stock: body.stock,
      sizes: body.sizes,
      colors: body.colors,
      images: body.images,
    })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, product: data[0] });
}

// DELETE: product à¦®à§à¦›à§‡ à¦«à§‡à¦²à¦¾
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
