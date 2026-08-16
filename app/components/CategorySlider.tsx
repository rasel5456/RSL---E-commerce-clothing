"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number | null;
  images: string[] | null;
  sizes: string[] | null;
  colors: string[] | null;
  stock?: number;
  sold_count?: number;
}

interface CategorySliderProps {
  title: string;
  products: Product[];
}

export default function CategorySlider({ title, products }: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 flex items-center justify-center border border-[#DDD6C8] hover:border-[#9C7A44] hover:text-[#9C7A44] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 flex items-center justify-center border border-[#DDD6C8] hover:border-[#9C7A44] hover:text-[#9C7A44] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[45vw] sm:w-[220px] md:w-[240px]">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discount_price}
              image={product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
              sizes={product.sizes || []}
              colors={product.colors || []}
              stock={product.stock}
              soldCount={product.sold_count}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


