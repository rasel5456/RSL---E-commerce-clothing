"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistIcon() {
  const { totalWishlistItems } = useWishlist();

  return (
    <Link href="/wishlist" aria-label="Wishlist" className="relative hidden sm:block hover:text-[#9C7A44] transition-colors">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4.4-9.5-8.9C.7 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.8C11 6.2 12.5 5 14.5 5 18 5 19.3 8.6 21.5 12.1 19 16.6 12 21 12 21Z"></path></svg>

      {totalWishlistItems > 0 ? (
        <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-[#9C7A44] text-white text-[10px] rounded-full">
          {totalWishlistItems}
        </span>
      ) : null}
    </Link>
  );
}
