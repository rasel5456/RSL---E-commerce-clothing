"use client";

import { useState, useEffect } from "react";

interface OrderItem {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

const statusOptions = ["pending", "shipped", "delivered", "cancelled"];

const statusColors: { [key: string]: string } = {
  pending: "#9C7A44",
  shipped: "#3A6EA5",
  delivered: "#2E7D32",
  cancelled: "#C0392B",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);

    const res = await fetch("/api/admin/orders/" + orderId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    setUpdatingId("");

    if (data.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Order Management</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    Order #{order.order_number} - {order.customer_name}
                  </p>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{order.customer_phone}</p>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                    {order.customer_address}, {order.customer_city}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold", color: "#9C7A44" }}>Taka {order.total_amount}</p>
                  <p style={{ margin: "4px 0", fontSize: "12px", color: "#999" }}>
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      color: statusColors[order.status] || "#333",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "12px",
                    }}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "48px", height: "60px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
                      />
                    ) : null}
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      {item.name} ({item.size}/{item.color}) x {item.quantity} — Taka {item.price * item.quantity}
                    </p>
                  </div>
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
