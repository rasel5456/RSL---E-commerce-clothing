"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function AccountDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
        setCity(profile.city || "");
      }

      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (orderData) setOrders(orderData);
    };

    loadData();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      phone: phone,
      address: address,
      city: city,
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || !user) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center text-[#6E675C]">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          My Account
        </h1>
        <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">
          Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Saved Details
          </h2>
          <form onSubmit={handleSaveProfile}>
            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL NAME</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>
            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PHONE</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>
            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">ADDRESS</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>
            <div className="mb-6">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">CITY</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#14120F] text-[#F7F4EF] px-6 py-3 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors"
            >
              {saving ? "SAVING..." : saved ? "SAVED" : "SAVE DETAILS"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Order History
          </h2>
          {orders.length === 0 ? (
            <p className="text-[#6E675C] text-sm">You have not placed any orders yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-[#DDD6C8] p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-sm">Order #{order.order_number}</p>
                    <p className="text-sm text-[#9C7A44]">৳{order.total_amount}</p>
                  </div>
                  <p className="text-xs text-[#6E675C] uppercase">{order.status}</p>
                  <p className="text-xs text-[#999] mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

