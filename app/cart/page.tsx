"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#F7F4EF]">
        <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-4">YOUR CART</p>
        <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Your cart is empty
        </h1>
        <p className="text-[#6E675C] mb-8 max-w-sm">Looks like you have not added anything yet. Let&apos;s find something you&apos;ll love.</p>
        <Link
          href="/"
          className="bg-[#14120F] text-[#F7F4EF] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]" style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-3">SHOPPING BAG</p>
        <h1 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col divide-y divide-[#DDD6C8] border-t border-[#DDD6C8]">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-5 py-6">
                <div className="w-24 h-28 flex-shrink-0 bg-[#EFEAE0] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[#14120F] mb-1" style={{ fontFamily: "var(--font-display)" }}>{item.name}</h3>
                  <p className="text-[13px] text-[#6E675C]">
                    {item.size ? "Size: " + item.size : ""}{item.size && item.color ? " · " : ""}{item.color ? "Color: " + item.color : ""}
                  </p>
                  <p className="text-[#9C7A44] mt-2">৳{item.price}</p>

                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="mt-2 text-[11px] tracking-[0.08em] text-[#6E675C] hover:text-[#9C7A44] transition-colors underline"
                  >
                    REMOVE
                  </button>
                </div>

                <div className="flex items-center border border-[#DDD6C8]">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                    className="w-9 h-9 hover:bg-[#EFEAE0] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    className="w-9 h-9 hover:bg-[#EFEAE0] transition-colors"
                  >
                    +
                  </button>
                </div>

                <p className="w-24 text-right text-[#14120F]" style={{ fontFamily: "var(--font-sans)" }}>
                  ৳{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-96">
            <div className="border border-[#DDD6C8] p-8 sticky top-24">
              <h2 className="text-lg mb-6" style={{ fontFamily: "var(--font-display)" }}>Order Summary</h2>

              <div className="flex justify-between text-sm text-[#6E675C] mb-3">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6E675C] mb-5">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="border-t border-[#DDD6C8] pt-5 flex justify-between mb-8">
                <span style={{ fontFamily: "var(--font-display)" }} className="text-lg">Total</span>
                <span className="text-lg text-[#14120F]">৳{totalPrice}</span>
              </div>

              <Link
                href="/checkout"
                className="block text-center bg-[#14120F] text-[#F7F4EF] py-4 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors mb-4"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                href="/"
                className="block text-center text-[#6E675C] text-[13px] hover:text-[#9C7A44] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

