"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "grid" },
  { label: "Products", href: "/admin/products", icon: "box" },
  { label: "Banners", href: "/admin/banners", icon: "image" },
  { label: "Orders", href: "/admin/orders", icon: "receipt" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    box: <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
    receipt: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M8 8h8M8 12h8M8 16h4" /></>,
    settings: <><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.3a2 2 0 1 1-4 0v-.2A2 2 0 0 0 5.8 18l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.6 12.8h-.2a2 2 0 1 1 0-4h.2A2 2 0 0 0 3 5.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 9.2 1.2V1a2 2 0 1 1 4 0v.2A2 2 0 0 0 16.6 3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0 1.4 3.4h.2a2 2 0 1 1 0 4h-.2A2 2 0 0 0 19.4 15Z" /></>,
  };
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login" || pathname === "/admin/forgot-password") {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#14212B] text-[#F7F5F0] w-10 h-10 flex items-center justify-center rounded"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
      </button>

      <aside
        className={
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-[#14212B] text-[#F7F5F0] flex flex-col z-40 transition-transform duration-300 " +
          (sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        <div className="px-6 py-6 border-b border-[#F7F5F0]/10 flex items-center justify-between">
          <span className="text-xl tracking-[0.2em]" style={{ fontFamily: "Georgia, serif" }}>RSL Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={
                  "px-4 py-3 rounded text-sm tracking-[0.03em] transition-colors flex items-center gap-3 " +
                  (isActive ? "bg-[#B28B52] text-[#F7F5F0]" : "text-[#F7F5F0]/70 hover:bg-[#F7F5F0]/10 hover:text-[#F7F5F0]")
                }
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-[#F7F5F0]/10">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-[#F7F5F0]/50 hover:text-[#F7F5F0] transition-colors">
            <span aria-hidden="true">↗</span> View Live Site
          </a>
        </div>
      </aside>

      {sidebarOpen ? (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      ) : null}

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
