'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  // যদি cart খালি থাকে, তাহলে "empty cart" message দেখাবো
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F7F4EF]">
        <h1 className="text-2xl font-semibold text-[#14120F] mb-3">
          আপনার কার্ট খালি
        </h1>
        <p className="text-[#14120F]/70 mb-6">
          এখনো কোনো প্রোডাক্ট কার্টে যোগ করেননি
        </p>
        <Link
          href="/"
          className="bg-[#9C7A44] text-white px-6 py-3 rounded-md hover:bg-[#846636] transition-colors"
        >
          শপিং শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] px-4 py-10 md:px-10">
      <h1 className="text-2xl font-semibold text-[#14120F] mb-8">
        আপনার কার্ট
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* বাম পাশে - Cart items list */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
            >
              {/* প্রোডাক্টের ছবি */}
              <div className="relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden bg-[#F7F4EF]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* প্রোডাক্টের তথ্য */}
              <div className="flex-1">
                <h3 className="text-[#14120F] font-medium">{item.name}</h3>
                <p className="text-sm text-[#14120F]/60 mt-1">
                  সাইজ: {item.size} | কালার: {item.color}
                </p>
                <p className="text-[#9C7A44] font-semibold mt-1">
                  ৳{item.price}
                </p>
              </div>

              {/* Quantity বাড়ানো/কমানোর বাটন */}
              <div className="flex items-center gap-3 border border-[#14120F]/20 rounded-md px-2 py-1">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                  }
                  className="text-[#14120F] hover:text-[#9C7A44] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center text-[#14120F]">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                  }
                  className="text-[#14120F] hover:text-[#9C7A44] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* আইটেমের মোট দাম */}
              <p className="w-20 text-right font-medium text-[#14120F]">
                ৳{item.price * item.quantity}
              </p>

              {/* Remove বাটন */}
              <button
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* ডান পাশে - Order Summary */}
        <div className="w-full lg:w-80 bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-[#14120F] mb-4">
            অর্ডার সামারি
          </h2>

          <div className="flex justify-between text-[#14120F]/80 mb-2">
            <span>সাবটোটাল</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between text-[#14120F]/80 mb-4">
            <span>ডেলিভারি চার্জ</span>
            <span>চেকআউটে হিসাব হবে</span>
          </div>

          <div className="border-t border-[#14120F]/10 pt-4 flex justify-between font-semibold text-[#14120F] text-lg mb-6">
            <span>মোট</span>
            <span>৳{totalPrice}</span>
          </div>

          <Link
            href="/checkout"
            className="block text-center bg-[#9C7A44] text-white py-3 rounded-md hover:bg-[#846636] transition-colors"
          >
            চেকআউট করুন
          </Link>

          <Link
            href="/"
            className="block text-center text-[#14120F]/60 text-sm mt-3 hover:text-[#14120F] transition-colors"
          >
            শপিং চালিয়ে যান
          </Link>
        </div>
      </div>
    </div>
  );
}