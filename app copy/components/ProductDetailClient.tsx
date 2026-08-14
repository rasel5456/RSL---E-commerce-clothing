"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  description?: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://placehold.co/600x750/F7F4EF/14120F?text=RSL"];

  const sizes = product.sizes || [];
  const colors = product.colors || [];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItemsToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: images[0],
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  const handleAddToCart = () => {
    addItemsToCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOrderNow = () => {
    addItemsToCart();
    router.push("/checkout");
  };

  return (
    <div
      className="min-h-screen bg-[#F7F4EF] text-[#14120F]"
      style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-[4/5] bg-[#EFEAE0] overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 overflow-hidden border-2 ${
                    selectedImage === img ? "border-[#14120F]" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ fontFamily: "var(--font-sans)" }}>
          <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h1>
          <p className="text-xl text-[#6E675C] mb-6">Taka {product.price}</p>

          {product.description && (
            <p className="text-[#6E675C] mb-8 leading-relaxed">{product.description}</p>
          )}

          {colors.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2">COLOR</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedColor === color
                        ? "border-[#14120F] text-[#14120F]"
                        : "border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-sm border transition-colors ${
                      selectedSize === size
                        ? "border-[#14120F] text-[#14120F]"
                        : "border-[#DDD6C8] text-[#6E675C] hover:border-[#9C7A44]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2">QUANTITY</p>
            <div className="flex items-center border border-[#DDD6C8] w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 hover:bg-[#EFEAE0] transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 hover:bg-[#EFEAE0] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
}

