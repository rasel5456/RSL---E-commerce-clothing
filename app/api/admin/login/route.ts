import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  // আগে চেক করছি ADMIN_PASSWORD আদৌ সেট করা আছে কিনা
  // এটা না থাকলে TypeScript এর কাছে "undefined" এর সম্ভাবনা থাকে
  if (!adminPassword) {
    return NextResponse.json(
      { success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  if (password === adminPassword) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_auth", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Incorrect password" },
    { status: 401 }
  );
}