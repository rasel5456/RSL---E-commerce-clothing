import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminBannersPage() {
  const { data: banners, error } = await supabase
    .from("banners")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Banner Management</h1>
        <Link
          href="/admin/banners/add"
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C7A44",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          + Add New Banner
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {banners && banners.length > 0 ? (
          banners.map((banner) => (
            <div
              key={banner.id}
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                src={banner.image_url}
                alt={banner.title || "Banner"}
                style={{ width: "150px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", margin: 0 }}>{banner.title || "(No title)"}</p>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{banner.subtitle}</p>
                <p style={{ margin: 0, fontSize: "13px", color: banner.is_active ? "green" : "red" }}>
                  {banner.is_active ? "Active" : "Inactive"} · Order: {banner.display_order}
                </p>
              </div>
              <Link href={`/admin/banners/edit/${banner.id}`}>Edit</Link>
            </div>
          ))
        ) : (
          <p>No banners found</p>
        )}
      </div>
    </div>
  );
}