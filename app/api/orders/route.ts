import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  for (const item of body.items) {
    const { data: productData } = await supabaseAdmin
      .from("products")
      .select("stock, name")
      .eq("id", item.id)
      .single();

    if (productData && productData.stock < item.quantity) {
      return NextResponse.json(
        { success: false, message: "Sorry, " + productData.name + " does not have enough stock (only " + productData.stock + " left)." },
        { status: 400 }
      );
    }
  }

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
      customer_id: body.customer_id,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  const order = data[0];

  for (const item of body.items) {
    const { data: productData } = await supabaseAdmin
      .from("products")
      .select("stock, sold_count")
      .eq("id", item.id)
      .single();

    if (productData) {
      const newStock = Math.max(0, productData.stock - item.quantity);
      const newSoldCount = (productData.sold_count || 0) + item.quantity;
      await supabaseAdmin
        .from("products")
        .update({ stock: newStock, sold_count: newSoldCount })
        .eq("id", item.id);
    }
  }

  const itemsListHtml = body.items
    .map(function (item: any) {
      return "<li>" + item.name + " (" + item.size + "/" + item.color + ") x " + item.quantity + " - Taka " + (item.price * item.quantity) + "</li>";
    })
    .join("");

  try {
    await resend.emails.send({
      from: "RSL Shop <onboarding@resend.dev>",
      to: "rslbdshop@gmail.com",
      subject: "New Order #" + order.order_number + " - " + order.customer_name,
      html:
        "<h2>New Order #" + order.order_number + "</h2>" +
        "<p><strong>Customer:</strong> " + order.customer_name + "</p>" +
        "<p><strong>Phone:</strong> " + order.customer_phone + "</p>" +
        "<p><strong>Address:</strong> " + order.customer_address + ", " + order.customer_city + "</p>" +
        "<p><strong>Total:</strong> Taka " + order.total_amount + "</p>" +
        "<p><strong>Items:</strong></p>" +
        "<ul>" + itemsListHtml + "</ul>",
    });
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
  }

  return NextResponse.json({ success: true, order: order });
}
