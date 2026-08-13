import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("reviews")
    .insert({
      product_id: body.product_id,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      rating: body.rating,
      comment: body.comment,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, review: data[0] });
}
