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

        <Link href="/" className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</Link>

        <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.08em] text-[#3A3630]">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#9C7A44] transition-colors">
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
        <div className="md:hidden fixed inset-0 z-50 bg-[#F7F4EF]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDD6C8]">
            <span className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-6 text-lg" style={{ fontFamily: "var(--font-display)" }}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-[#9C7A44] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
