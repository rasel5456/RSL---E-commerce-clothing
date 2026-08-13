"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Thank You!
      </h1>
      <p className="text-[#6E675C] mb-2">Your order has been placed successfully.</p>
      {orderNumber ? (
        <p className="text-[#6E675C] mb-8 text-lg font-medium">Order #{orderNumber}</p>
      ) : null}
      <p className="text-[#6E675C] mb-8">We will contact you shortly to confirm your delivery.</p>
      <Link href="/" className="bg-[#14120F] text-[#F7F4EF] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors inline-block">
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-6 py-24 text-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
