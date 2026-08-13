import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      customer_address: body.customer_address,
      customer_city: body.customer_city,
      items: body.items,
      total_amount: body.total_amount,
      payment_method: body.payment_method,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  const order = data[0];

  const itemsListHtml = body.items
    .map(function (item: any) {
      return "<li>" + item.name + " (" + item.size + "/" + item.color + ") x " + item.quantity + " - Taka " + (item.price * item.quantity) + "</li>";
    })
    .join("");

  try {
    await resend.emails.send({
      from: "RSL Shop <onboarding@resend.dev>",
      to: "rslbdshop@gmail.com",
      subject: "New Order Received - " + order.customer_name,
      html:
        "<h2>New Order Received</h2>" +
        "<p><strong>Customer:</strong> " + order.customer_name + "</p>" +
        "<p><strong>Phone:</strong> " + order.customer_phone + "</p>" +
        "<p><strong>Address:</strong> " + order.customer_address + ", " + order.customer_city + "</p>" +
        "<p><strong>Total:</strong> Taka " + order.total_amount + "</p>" +
        "<p><strong>Items:</strong></p>" +
        "<ul>" + itemsListHtml + "</ul>" +
        "<p><strong>Order ID:</strong> " + order.id + "</p>",
    });
  } catch (emailError) {
    // ইমেইল পাঠাতে ব্যর্থ হলেও, অর্ডার তো সফলভাবে database এ save হয়ে গেছে
    // তাই আমরা customer কে error দেখাবো না, শুধু server-এ log করে রাখবো
    console.error("Email sending failed:", emailError);
  }

  return NextResponse.json({ success: true, order: order });
}
