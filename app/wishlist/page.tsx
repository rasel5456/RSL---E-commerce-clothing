"use client";

import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 min-h-[60vh]">
      <h1 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-[#6E675C]">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-[#DDD6C8] rounded p-3">
              <Link href={"/product/" + item.id}>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2 rounded" />
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm text-[#9C7A44]">Taka {item.price}</p>
              </Link>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2 text-[12px] text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
