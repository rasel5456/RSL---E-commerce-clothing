"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await fetch("/api/admin/banners/" + id);
      const data = await res.json();

      if (data.success) {
        const b = data.banner;
        setImageUrl(b.image_url);
        setTitle(b.title || "");
        setSubtitle(b.subtitle || "");
        setLinkUrl(b.link_url || "");
        setDisplayOrder(String(b.display_order));
        setIsActive(b.is_active);
      } else {
        setError("Banner not found");
      }
      setFetching(false);
    };

    fetchBanner();
  }, [id]);

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
    setLoading(true);

    const payload = {
      image_url: imageUrl,
      title,
      subtitle,
      link_url: linkUrl,
      display_order: Number(displayOrder),
      is_active: isActive,
    };

    const res = await fetch("/api/admin/banners/" + id, {
      method: "PUT",
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

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this banner?");
    if (!confirmed) return;

    const res = await fetch("/api/admin/banners/" + id, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/banners");
    } else {
      setError(data.message || "Delete failed");
    }
  };

  if (fetching) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Edit Banner</h1>

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
            {uploading ? <p style={{ color: "#9C7A44" }}>Uploading...</p> : null}
          </div>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Banner preview"
              style={{ width: "100%", maxWidth: "400px", marginTop: "10px", borderRadius: "5px" }}
            />
          ) : null}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Subtitle (optional)</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Link URL (optional)</label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Display Order</label>
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
            Active (Show on Homepage)
          </label>
        </div>

        {error ? <p style={{ color: "red" }}>{error}</p> : null}

        <div style={{ display: "flex", gap: "10px" }}>
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
            {loading ? "Saving..." : "Update Banner"}
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
            Delete Banner
          </button>
        </div>
      </form>
    </div>
  );
}
