import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET: সব banner এর লিস্ট আনা
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("banners")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, banners: data });
}

// POST: নতুন banner যোগ করা
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("banners")
    .insert({
      image_url: body.image_url,
      title: body.title,
      subtitle: body.subtitle,
      link_url: body.link_url,
      display_order: body.display_order,
      is_active: body.is_active,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, banner: data[0] });
}