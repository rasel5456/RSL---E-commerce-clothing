import Link from "next/link";

export default function AdminDashboardPage() {
  const sections = [
    {
      title: "Products",
      description: "Add, edit, or delete products",
      href: "/admin/products",
      color: "#9C7A44",
    },
    {
      title: "Banners",
      description: "Manage homepage banner images",
      href: "/admin/banners",
      color: "#14120F",
    },
    {
      title: "Orders",
      description: "View customer orders",
      href: "/admin/orders",
      color: "#6E675C",
    },
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "10px" }}>Admin Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Welcome to RSL Admin Panel. Select a section below.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {sections.map(function (section) {
          return (
            <Link
              key={section.title}
              href={section.href}
              style={{
                display: "block",
                padding: "24px",
                border: "1px solid #eee",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#14120F",
                borderTop: "4px solid " + section.color,
                transition: "box-shadow 0.2s",
              }}
            >
              <h2 style={{ margin: "0 0 8px 0", fontSize: "20px" }}>{section.title}</h2>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
