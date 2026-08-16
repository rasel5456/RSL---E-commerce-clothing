"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-[#6E675C] mb-6">Your cart is empty.</p>
        <a href="/" className="bg-[#14120F] text-[#F7F4EF] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors inline-block">
          CONTINUE SHOPPING
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
          Checkout
        </h1>

        {!user ? (
          <p className="text-[#6E675C] text-sm mb-6">
            Have an account? <a href="/account" className="text-[#9C7A44] underline">Sign in</a> to auto-fill your details.
          </p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PHONE NUMBER</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL ADDRESS</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
            />
          </div>

          <div className="mb-6">
            <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">CITY</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
            />
          </div>

          <div className="mb-6 border border-[#DDD6C8] p-4">
            <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2">PAYMENT METHOD</p>
            <p className="text-sm">Cash on Delivery</p>
          </div>

          {error ? <p className="text-red-600 mb-4">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-[13px] tracking-[0.1em] bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44] transition-colors"
          >
            {loading ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg mb-6" style={{ fontFamily: "var(--font-display)" }}>Order Summary</h2>
        <div className="border border-[#DDD6C8] divide-y divide-[#DDD6C8]">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between p-4 text-sm">
              <div>
                <p>{item.name}</p>
                <p className="text-[#6E675C] text-xs">{item.size} / {item.color} x {item.quantity}</p>
              </div>
              <p>৳{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-sm text-[#6E675C]">
            <p>Subtotal</p>
            <p>৳{totalPrice}</p>
          </div>
          <div className="flex justify-between text-sm text-[#6E675C]">
            <p>Shipping</p>
            <p>{qualifiesForFreeShipping ? "Free" : "৳" + actualShippingFee}</p>
          </div>
          <div className="flex justify-between text-lg font-medium border-t border-[#DDD6C8] pt-2 mt-1">
            <p>Total</p>
            <p>৳{grandTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

