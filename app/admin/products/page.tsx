import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Product Management</h1>
        <Link
          href="/admin/products/add"
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C7A44",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          + Add New Product
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Category</th>
            <th style={{ padding: "10px" }}>Price</th>
            <th style={{ padding: "10px" }}>Stock</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{product.name}</td>
                <td style={{ padding: "10px" }}>{product.category}</td>
                <td style={{ padding: "10px" }}>à§³{product.price}</td>
                <td style={{ padding: "10px" }}>{product.stock ?? "N/A"}</td>
                <td style={{ padding: "10px" }}>
                  <Link href={`/admin/products/edit/${product.id}`} style={{ marginRight: "10px" }}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ padding: "10px", textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
