'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes?: string[];
  colors?: string[];
};

export default function ProductCard({ id, name, price, image, sizes = [], colors = [] }: ProductCardProps) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [justAdded, setJustAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: selectedColor,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-[4/5] bg-[#EFEAE0] overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#F7F4EF]/90 backdrop-blur"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={wishlisted ? '#9C7A44' : 'none'}
            stroke={wishlisted ? '#9C7A44' : '#14120F'}
            strokeWidth="1.5"
          >
            <path d="M12 21s-7-4.4-9.5-8.9C.7 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.8C11 6.2 12.5 5 14.5 5 18 5 19.3 8.6 21.5 12.1 19 16.6 12 21 12 21Z" />
          </svg>
        </button>

        {/* Quick add — reveals on hover */}
        <button
          onClick={handleAddToCart}
          className={`absolute left-0 right-0 bottom-0 py-3 text-[11px] tracking-[0.15em] transition-all duration-300 ${
            justAdded
              ? 'bg-[#9C7A44] text-[#F7F4EF] translate-y-0'
              : 'bg-[#14120F] text-[#F7F4EF] translate-y-full group-hover:translate-y-0'
          }`}
        >
          {justAdded ? '✓ ADDED TO CART' : 'QUICK ADD'}
        </button>
      </div>

      {/* Info */}
      <div style={{ fontFamily: 'var(--font-sans)' }}>
        <h3 className="text-sm text-[#14120F] mb-1">{name}</h3>
        <p className="text-sm text-[#6E675C] mb-3">৳{price}</p>

        {/* Color chips */}
        {colors.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2.5 py-1 text-[10px] tracking-[0.05em] border transition-colors ${
                  selectedColor === color
                    ? 'border-[#14120F] text-[#14120F]'
                    : 'border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        {/* Size chips */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 text-[10px] border transition-colors ${
                  selectedSize === size
                    ? 'border-[#14120F] text-[#14120F]'
                    : 'border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}