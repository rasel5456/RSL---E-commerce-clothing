"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  discount_price?: number | null;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  color_images?: { [key: string]: string };
  description?: string;
  stock?: number;
  category?: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const colorImages = product.color_images || {};
  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const stock = product.stock ?? 1;
  const outOfStock = stock <= 0;
  const hasDiscount = product.discount_price !== null && product.discount_price !== undefined && product.discount_price < product.price;
  const effectivePrice = hasDiscount ? (product.discount_price as number) : product.price;

  const fallbackImage = product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL";
  const initialColor = colors[0] || "";
  const initialImage = initialColor && colorImages[initialColor] ? colorImages[initialColor] : fallbackImage;

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (colorImages[color]) {
      setSelectedImage(colorImages[color]);
    }
  };

  const addItemsToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: effectivePrice,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
      });
    }
    return true;
  };

  const handleAddToCart = () => {
    if (outOfStock) return;
    const ok = addItemsToCart();
    if (!ok) return;
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOrderNow = () => {
    if (outOfStock) return;
    const ok = addItemsToCart();
    if (!ok) return;
    router.push("/checkout");
  };

  return (
    <div
      className="min-h-screen bg-[#F7F4EF] text-[#14120F]"
      style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-8">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.08em] text-[#6E675C] mb-8">
          <Link href="/" className="hover:text-[#9C7A44] transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#9C7A44] transition-colors">SHOP</Link>
          {product.category ? (
            <>
              <span>/</span>
              <span className="text-[#14120F]">{product.category.toUpperCase()}</span>
            </>
          ) : null}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24 grid md:grid-cols-2 gap-14 md:gap-20">
        <div>
          <div className="aspect-[4/5] bg-[#EFEAE0] overflow-hidden mb-4 relative">
            <img
              src={selectedImage}
              alt={product.name + (product.category ? " - " + product.category : "") + " | RSL Fashion Store"}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {hasDiscount && !outOfStock ? (
              <span className="absolute top-5 left-5 bg-[#9C7A44] text-[#F7F4EF] text-[10px] tracking-[0.15em] px-3 py-1.5">
                SALE
              </span>
            ) : null}
            {outOfStock ? (
              <span className="absolute top-5 left-5 bg-[#14120F] text-[#F7F4EF] text-[10px] tracking-[0.15em] px-3 py-1.5">
                OUT OF STOCK
              </span>
            ) : null}
          </div>

          {colors.length > 1 ? (
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-20 h-24 overflow-hidden border-2 transition-colors ${
                    selectedColor === color ? "border-[#14120F]" : "border-[#DDD6C8] hover:border-[#9C7A44]"
                  }`}
                >
                  <img src={colorImages[color] || fallbackImage} alt={color} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ fontFamily: "var(--font-sans)" }}>
          {product.category ? (
            <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-3">{product.category.toUpperCase()}</p>
          ) : null}

          <h1 className="text-3xl md:text-4xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h1>

          <p className="text-xl mb-8">
            {hasDiscount ? (
              <>
                <span className="text-[#6E675C] line-through mr-3 text-base">৳{product.price}</span>
                <span className="text-[#9C7A44]">৳{product.discount_price}</span>
              </>
            ) : (
              <span className="text-[#14120F]">৳{product.price}</span>
            )}
          </p>

          {product.description ? (
            <p className="text-[#6E675C] mb-10 leading-relaxed max-w-md">{product.description}</p>
          ) : null}

          {colors.length > 0 ? (
            <div className="mb-7">
              <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-3">
                COLOR{selectedColor ? <span className="text-[#14120F] ml-2">— {selectedColor}</span> : null}
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 border transition-colors ${
                      selectedColor === color
                        ? "border-[#14120F] bg-[#14120F] text-[#F7F4EF]"
                        : "border-[#DDD6C8] text-[#3A3630] hover:border-[#9C7A44]"
                    }`}
                  >
                    <span className="w-8 h-8 overflow-hidden flex-shrink-0">
                      <img src={colorImages[color] || fallbackImage} alt={color} className="w-full h-full object-cover" />
                    </span>
                    <span className="text-sm">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {sizes.length > 0 ? (
            <div className="mb-7">
              <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-3">
                SIZE{selectedSize ? <span className="text-[#14120F] ml-2">— {selectedSize}</span> : null}
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-12 h-12 text-sm border transition-colors ${
                      selectedSize === size
                        ? "border-[#14120F] bg-[#14120F] text-[#F7F4EF]"
                        : "border-[#DDD6C8] text-[#3A3630] hover:border-[#9C7A44]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError ? <p className="text-red-600 text-xs mt-2">Please select a size.</p> : null}
            </div>
          ) : null}

          {!outOfStock ? (
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-3">QUANTITY <span className="text-[#9C7A44] ml-2">({stock} in stock)</span></p>
              <div className="flex items-center border border-[#DDD6C8] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 hover:bg-[#EFEAE0] transition-colors text-lg"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 hover:bg-[#EFEAE0] transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ) : null}

          {outOfStock ? (
            <div className="w-full py-4 text-center text-[13px] tracking-[0.1em] bg-[#EFEAE0] text-[#6E675C]">
              CURRENTLY OUT OF STOCK
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 text-[13px] tracking-[0.1em] transition-colors ${
                  justAdded ? "bg-[#9C7A44] text-[#F7F4EF]" : "bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44]"
                }`}
              >
                {justAdded ? "ADDED TO CART" : "ADD TO CART"}
              </button>

              <button
                onClick={handleOrderNow}
                className="w-full py-4 text-[13px] tracking-[0.1em] border-2 border-[#14120F] text-[#14120F] hover:bg-[#14120F] hover:text-[#F7F4EF] transition-colors"
              >
                ORDER NOW
              </button>
            </div>
          )}

          <div className="border-t border-[#DDD6C8] pt-6 flex flex-col gap-3 text-[13px] text-[#6E675C]">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0"><rect x="1" y="7" width="15" height="13" rx="1"></rect><path d="M16 10h3l3 3v4h-6z"></path><circle cx="5.5" cy="20.5" r="1.5"></circle><circle cx="18.5" cy="20.5" r="1.5"></circle></svg>
              Cash on Delivery available across Bangladesh
            </div>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0"><path d="M20 6L9 17l-5-5"></path></svg>
              3-day easy exchange on unused items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




