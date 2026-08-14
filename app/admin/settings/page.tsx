"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [shippingFee, setShippingFee] = useState("");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setShippingFee(data.settings.shipping_fee || "0");
        setFreeShippingThreshold(data.settings.free_shipping_threshold || "0");
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping_fee: shippingFee,
        free_shipping_threshold: freeShippingThreshold,
      }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Shipping Settings</h1>

      <form onSubmit={handleSave}>
        <div style={{ marginBottom: "15px" }}>
          <label>Shipping Fee (Taka)</label>
          <input
            type="text"
            inputMode="numeric"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value.replace(/[^0-9]/g, ""))}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            This amount will be added to every order below the free shipping threshold.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Free Shipping Threshold (Taka)</label>
          <input
            type="text"
            inputMode="numeric"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value.replace(/[^0-9]/g, ""))}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            Orders equal to or above this amount get free shipping. Set to 0 to disable free shipping.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C7A44",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
