"use client";

import { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import SearchBox from "./SearchBox";
import WishlistIcon from "./WishlistIcon";
import AccountIcon from "./AccountIcon";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "MEN", href: "/shop?gender=men" },
  { label: "WOMEN", href: "/shop?gender=women" },
  { label: "NEW ARRIVALS", href: "/shop" },
  { label: "COLLECTIONS", href: "/shop" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F4EF]/95 backdrop-blur border-b border-[#DDD6C8]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="md:hidden mr-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <img src="/header-logo.png" alt="RSL" className="h-7 w-auto" />
          <span className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-[12px] tracking-[0.06em] text-[#3A3630]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 border border-[#DDD6C8] rounded-sm hover:border-[#9C7A44] hover:bg-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-[#14120F]">
          <SearchBox />
          <AccountIcon />
          <WishlistIcon />
          <CartIcon />
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden fixed inset-0 z-50" style={{ backgroundColor: "#F7F4EF" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDD6C8]">
            <span className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-5 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 border border-[#DDD6C8] rounded hover:border-[#9C7A44] hover:bg-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
