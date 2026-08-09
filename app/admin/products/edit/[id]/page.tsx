"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [images, setImages] = useState("");

  // পেজ লোড হওয়ার সাথে সাথেই existing product data নিয়ে আসছি
  // Python এর সাথে তুলনা করলে এটা অনেকটা __init__ এর মতো, কম্পোনেন্ট প্রথমবার লোড হলে একবার চলে
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/products/${id}`);
      const data = await res.json();

      if (data.success) {
        const p = data.product;
        setName(p.name);
        setDescription(p.description);
        setPrice(String(p.price));
        setCategory(p.category);
        setStock(String(p.stock));
        setSizes((p.sizes || []).join(", "));
        setColors((p.colors || []).join(", "));
        setImages((p.images || []).join(", "));
      } else {
        setError("Product not found");
      }
      setFetching(false);
    };

    fetchProduct();
  }, [id]);

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

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
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

  const handleDelete = async () => {
    const confirmed = confirm("আপনি কি নিশ্চিত এই প্রোডাক্টটি Delete করতে চান?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/products");
    } else {
      setError(data.message || "Delete failed");
    }
  };

  if (fetching) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Edit Product</h1>

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
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
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
            onChange={(e) => setStock(e.target.value.replace(/[^0-9]/g, ""))}
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
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Colors (comma separated)</label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Image URLs (comma separated)</label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", gap: "10px" }}>
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
            {loading ? "Saving..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: "10px 20px",
              backgroundColor: "#c0392b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}