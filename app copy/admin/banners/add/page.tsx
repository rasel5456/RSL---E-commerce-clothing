"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.success) {
      setImageUrl(data.url);
    } else {
      setError(data.message || "Image upload failed");
    }

    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!imageUrl) {
      setError("Please upload a banner image first");
      return;
    }

    setLoading(true);

    const payload = {
      image_url: imageUrl,
      title,
      subtitle,
      link_url: linkUrl,
      display_order: Number(displayOrder),
      is_active: isActive,
    };

    const res = await fetch("/api/admin/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/banners");
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Add New Banner</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Banner Image</label>
          <div style={{ marginTop: "5px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <p style={{ color: "#9C7A44" }}>Uploading...</p>}
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Banner preview"
              style={{ width: "100%", maxWidth: "400px", marginTop: "10px", borderRadius: "5px" }}
            />
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Define Your Style"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Subtitle (optional)</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g. Modern essentials, designed for the way you move."
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Link URL (optional — banner-এ ক্লিক করলে কোথায় যাবে)</label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="e.g. /shop"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Display Order (ছোট সংখ্যা আগে দেখাবে)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value.replace(/[^0-9]/g, ""))}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Active (Homepage এ দেখাবে)
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading || uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C7A44",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Add Banner"}
        </button>
      </form>
    </div>
  );
}