"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: colors.split(",").map((c) => c.trim()).filter(Boolean),
      images: images.split(",").map((i) => i.trim()).filter(Boolean),
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/products");
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Price (৳)</label>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => {
              // শুধু সংখ্যা (digit) allow করছি, বাকি সব বাদ দিয়ে দিচ্ছি
              const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
              setPrice(onlyDigits);
            }}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. T-Shirt, Jacket, Shirt"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Stock (Quantity)</label>
          <input
            type="text"
            inputMode="numeric"
            value={stock}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
              setStock(onlyDigits);
            }}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Sizes (comma separated)</label>
          <input
            type="text"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="S, M, L, XL"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Colors (comma separated)</label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="কালো, সাদা, নেভি ব্লু"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Image URLs (comma separated)</label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C7A44",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}