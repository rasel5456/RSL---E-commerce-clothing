"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [shippingFee, setShippingFee] = useState(0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setName(profile.full_name || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
        setCity(profile.city || "");
      }
    };

    loadProfile();
  }, [user]);

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from("settings").select("*");
      if (data) {
        const feeRow = data.find((r) => r.key === "shipping_fee");
        const thresholdRow = data.find((r) => r.key === "free_shipping_threshold");
        setShippingFee(feeRow ? Number(feeRow.value) : 0);
        setFreeShippingThreshold(thresholdRow ? Number(thresholdRow.value) : 0);
      }
    };
    loadSettings();
  }, []);

  const qualifiesForFreeShipping = freeShippingThreshold > 0 && totalPrice >= freeShippingThreshold;
  const actualShippingFee = qualifiesForFreeShipping ? 0 : shippingFee;
  const grandTotal = totalPrice + actualShippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);

    const payload = {
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      customer_city: city,
      items: cartItems,
      total_amount: grandTotal,
      payment_method: "cod",
      customer_id: user ? user.id : null,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      clearCart();
      router.push("/order-confirmation?order_number=" + data.order.order_number);
    } else {
      setError(data.message || "Something went wrong. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#F7F4EF]">
        <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-4">CHECKOUT</p>
        <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Your cart is empty
        </h1>
        <p className="text-[#6E675C] mb-8 max-w-sm">Add something to your bag before checking out.</p>
        <Link href="/" className="bg-[#14120F] text-[#F7F4EF] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]" style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.08em] text-[#6E675C] mb-6">
          <Link href="/cart" className="hover:text-[#9C7A44] transition-colors">CART</Link>
          <span>/</span>
          <span className="text-[#14120F]">CHECKOUT</span>
        </nav>

        <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-3">SECURE CHECKOUT</p>
        <h1 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Delivery Details
        </h1>

        <div className="grid md:grid-cols-5 gap-14">
          <div className="md:col-span-3">
            {!user ? (
              <p className="text-[#6E675C] text-sm mb-8 border border-[#DDD6C8] px-4 py-3">
                Have an account? <a href="/account" className="text-[#9C7A44] underline">Sign in</a> to auto-fill your details next time.
              </p>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL ADDRESS</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                  className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors resize-none"
                />
              </div>

              <div className="mb-8 sm:w-1/2 sm:pr-2.5">
                <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">CITY</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                />
              </div>

              <div className="mb-8">
                <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-3">PAYMENT METHOD</p>
                <div className="border border-[#14120F] px-4 py-4 flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-2 border-[#14120F] flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#14120F]"></span>
                  </span>
                  <div>
                    <p className="text-sm text-[#14120F]">Cash on Delivery</p>
                    <p className="text-[12px] text-[#6E675C]">Pay when your order arrives</p>
                  </div>
                </div>
              </div>

              {error ? (
                <p className="text-red-600 mb-4 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-[13px] tracking-[0.15em] bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44] transition-colors disabled:opacity-60"
              >
                {loading ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="border border-[#DDD6C8] p-8 sticky top-24">
              <h2 className="text-lg mb-6" style={{ fontFamily: "var(--font-display)" }}>Order Summary</h2>

              <div className="flex flex-col gap-4 mb-6 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-14 h-16 bg-[#EFEAE0] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#14120F] truncate">{item.name}</p>
                      <p className="text-[12px] text-[#6E675C]">{item.size} / {item.color} &times; {item.quantity}</p>
                    </div>
                    <p className="text-sm text-[#14120F] whitespace-nowrap">৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#DDD6C8] pt-5 flex flex-col gap-2.5">
                <div className="flex justify-between text-sm text-[#6E675C]">
                  <p>Subtotal</p>
                  <p>৳{totalPrice}</p>
                </div>
                <div className="flex justify-between text-sm text-[#6E675C]">
                  <p>Shipping</p>
                  <p>{qualifiesForFreeShipping ? "Free" : "৳" + actualShippingFee}</p>
                </div>
                <div className="flex justify-between text-lg pt-3 mt-1 border-t border-[#DDD6C8]">
                  <p style={{ fontFamily: "var(--font-display)" }}>Total</p>
                  <p className="text-[#14120F]">৳{grandTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
