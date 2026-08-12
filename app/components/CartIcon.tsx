"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" aria-label="Cart" className="relative hover:text-[#9C7A44] transition-colors">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6h15l-1.5 9h-12L6 6Z"></path><path d="M6 6 5 3H2"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>

      {totalItems > 0 ? (
        <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-[#9C7A44] text-white text-[10px] rounded-full">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
