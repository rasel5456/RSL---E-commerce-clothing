import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("settings").select("*");

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  const settingsObj: { [key: string]: string } = {};
  data.forEach((row) => {
    settingsObj[row.key] = row.value;
  });

  return NextResponse.json({ success: true, settings: settingsObj });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updates = Object.keys(body).map((key) =>
    supabaseAdmin.from("settings").upsert({ key: key, value: String(body[key]) })
  );

  await Promise.all(updates);

  return NextResponse.json({ success: true });
}
