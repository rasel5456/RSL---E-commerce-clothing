"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
  soldCount?: number;
};

export default function ProductCard({ id, name, price, discountPrice, image, sizes = [], colors = [], stock = 1, soldCount = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isInWishlist(id);
  const outOfStock = stock <= 0;
  const hasDiscount = discountPrice !== null && discountPrice !== undefined && discountPrice < price;
  const effectivePrice = hasDiscount ? discountPrice! : price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice!) / price) * 100) : 0;
  const displaySold = 100 + soldCount;

  const defaultSize = sizes[0] || "";
  const defaultColor = colors[0] || "";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart({
      id,
      name,
      price: effectivePrice,
      image,
      size: defaultSize,
      color: defaultColor,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart({
      id,
      name,
      price: effectivePrice,
      image,
      size: defaultSize,
      color: defaultColor,
    });
    router.push("/checkout");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({ id, name, price: effectivePrice, image });
  };

  return (
    <div className="group">
      <Link href={`/product/${id}`} className="relative aspect-[4/5] bg-[#EFEAE0] overflow-hidden mb-3 block">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {hasDiscount ? (
          <span className="absolute top-3 left-3 bg-[#9C7A44] text-[#F7F4EF] text-[10px] tracking-[0.05em] px-2 py-1">
            -{discountPercent}%
          </span>
        ) : null}

        {outOfStock ? (
          <span className="absolute top-3 left-3 bg-[#14120F] text-[#F7F4EF] text-[10px] tracking-[0.05em] px-2 py-1">
            OUT OF STOCK
          </span>
        ) : null}

        <button
          onClick={handleWishlistToggle}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#F7F4EF]/90 backdrop-blur"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#9C7A44" : "none"}
            stroke={wishlisted ? "#9C7A44" : "#14120F"}
            strokeWidth="1.5"
          >
            <path d="M12 21s-7-4.4-9.5-8.9C.7 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.8C11 6.2 12.5 5 14.5 5 18 5 19.3 8.6 21.5 12.1 19 16.6 12 21 12 21Z" />
          </svg>
        </button>

        {!outOfStock ? (
          <div className="absolute left-0 right-0 bottom-0 flex translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 text-[10px] tracking-[0.1em] transition-colors ${
                justAdded ? "bg-[#9C7A44] text-[#F7F4EF]" : "bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44]"
              }`}
            >
              {justAdded ? "ADDED" : "QUICK ADD"}
            </button>

            <button
              onClick={handleOrderNow}
              className="flex-1 py-2.5 text-[10px] tracking-[0.1em] bg-[#9C7A44] text-[#F7F4EF] hover:bg-[#14120F] transition-colors border-l border-[#F7F4EF]/30"
            >
              ORDER NOW
            </button>
          </div>
        ) : null}
      </Link>

      <div style={{ fontFamily: "var(--font-sans)" }}>
        <Link href={`/product/${id}`}>
          <h3 className="text-sm text-[#14120F] mb-1 hover:text-[#9C7A44] transition-colors line-clamp-2 leading-snug min-h-[2.5em]">{name}</h3>
        </Link>

        <p className="text-sm mb-1">
          {hasDiscount ? (
            <>
              <span className="text-[#6E675C] line-through mr-2">৳{price.toLocaleString()}</span>
              <span className="text-[#9C7A44] font-medium">৳{discountPrice!.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-[#3A3630]">৳{price.toLocaleString()}</span>
          )}
        </p>

        <p className="text-[11px] text-[#6E675C]">
          {outOfStock ? "Out of stock" : stock + " in stock"} &middot; {displaySold}+ sold
        </p>
      </div>
    </div>
  );
}
