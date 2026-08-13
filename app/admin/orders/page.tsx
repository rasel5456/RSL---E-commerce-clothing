import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Order Management</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <p style={{ fontWeight: "bold", margin: 0 }}>Order #{order.order_number} - {order.customer_name}</p>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{order.customer_phone}</p>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{order.customer_address}, {order.customer_city}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold", color: "#9C7A44" }}>Taka {order.total_amount}</p>
                  <p style={{ margin: 0, fontSize: "13px", textTransform: "uppercase" }}>{order.status}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
                {order.items.map((item: any, idx: number) => (
                  <p key={idx} style={{ margin: "4px 0", fontSize: "14px" }}>
                    {item.name} ({item.size}/{item.color}) x {item.quantity} — Taka {item.price * item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
}


