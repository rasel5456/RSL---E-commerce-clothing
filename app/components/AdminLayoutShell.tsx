"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Banners", href: "/admin/banners" },
  { label: "Orders", href: "/admin/orders" },
];

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#14120F] text-[#F7F4EF] w-10 h-10 flex items-center justify-center rounded"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
      </button>

      <aside
        className={
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-[#14120F] text-[#F7F4EF] flex flex-col z-40 transition-transform duration-300 " +
          (sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        <div className="px-6 py-6 border-b border-[#F7F4EF]/10 flex items-center justify-between">
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
                  "px-4 py-3 rounded text-sm tracking-[0.03em] transition-colors " +
                  (isActive ? "bg-[#9C7A44] text-[#F7F4EF]" : "text-[#F7F4EF]/70 hover:bg-[#F7F4EF]/10 hover:text-[#F7F4EF]")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-[#F7F4EF]/10">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#F7F4EF]/50 hover:text-[#F7F4EF] transition-colors">
            View Live Site &rarr;
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
