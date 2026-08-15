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
};

export default function ProductCard({ id, name, price, discountPrice, image, sizes = [], colors = [], stock = 1 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isInWishlist(id);
  const outOfStock = stock <= 0;
  const hasDiscount = discountPrice !== null && discountPrice !== undefined && discountPrice < price;
  const effectivePrice = hasDiscount ? discountPrice! : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart({
      id,
      name,
      price: effectivePrice,
      image,
      size: selectedSize,
      color: selectedColor,
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
      size: selectedSize,
      color: selectedColor,
    });
    router.push("/checkout");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({ id, name, price: effectivePrice, image });
  };

  return (
    <div className="group">
      <Link href={`/product/${id}`} className="relative aspect-[4/5] bg-[#EFEAE0] overflow-hidden mb-4 block">
        <img
          src={image}
          alt={name}
          className={"w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" + (outOfStock ? " grayscale opacity-60" : "")}
        />

        {hasDiscount ? (
          <span className="absolute top-3 left-3 bg-[#9C7A44] text-[#F7F4EF] text-[10px] tracking-[0.05em] px-2 py-1">
            SALE
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
              className={`flex-1 py-3 text-[10px] tracking-[0.1em] transition-colors ${
                justAdded ? "bg-[#9C7A44] text-[#F7F4EF]" : "bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44]"
              }`}
            >
              {justAdded ? "ADDED" : "QUICK ADD"}
            </button>

            <button
              onClick={handleOrderNow}
              className="flex-1 py-3 text-[10px] tracking-[0.1em] bg-[#9C7A44] text-[#F7F4EF] hover:bg-[#14120F] transition-colors border-l border-[#F7F4EF]/30"
            >
              ORDER NOW
            </button>
          </div>
        ) : null}
      </Link>

      <div style={{ fontFamily: "var(--font-sans)" }}>
        <Link href={`/product/${id}`}>
          <h3 className="text-sm text-[#14120F] mb-1 hover:text-[#9C7A44] transition-colors">{name}</h3>
        </Link>

        <p className="text-sm mb-3">
          {hasDiscount ? (
            <>
              <span className="text-[#6E675C] line-through mr-2">Taka {price}</span>
              <span className="text-[#9C7A44] font-medium">Taka {discountPrice}</span>
            </>
          ) : (
            <span className="text-[#6E675C]">Taka {price}</span>
          )}
        </p>

        {colors.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2.5 py-1 text-[10px] tracking-[0.05em] border transition-colors ${
                  selectedColor === color
                    ? "border-[#14120F] text-[#14120F]"
                    : "border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        ) : null}

        {sizes.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 text-[10px] border transition-colors ${
                  selectedSize === size
                    ? "border-[#14120F] text-[#14120F]"
                    : "border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
