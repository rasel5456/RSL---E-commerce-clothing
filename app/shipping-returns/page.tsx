export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 min-h-[60vh]">
      <p className="text-[11px] tracking-[0.2em] text-[#B28B52] mb-3">RSL / CUSTOMER CARE</p>
      <h1 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-display)" }}>Shipping & Returns</h1>

      <div className="space-y-10 text-[#66727A] leading-relaxed">
        <section>
          <h2 className="text-xl text-[#14212B] mb-3" style={{ fontFamily: "var(--font-display)" }}>Delivery</h2>
          <p>We deliver across Bangladesh. Standard delivery usually takes 3–5 business days inside Dhaka and 5–7 business days outside Dhaka. Delivery timing may vary slightly during holidays or campaign periods.</p>
        </section>

        <section>
          <h2 className="text-xl text-[#14212B] mb-3" style={{ fontFamily: "var(--font-display)" }}>Shipping charges</h2>
          <p>Enjoy free shipping on orders over ৳2,000. Any applicable delivery charge is shown clearly at checkout before you place your order.</p>
        </section>

        <section>
          <h2 className="text-xl text-[#14212B] mb-3" style={{ fontFamily: "var(--font-display)" }}>Exchange and returns</h2>
          <p>Request an exchange or return within 3 days of delivery. Items must be unused, unworn, unwashed, and returned with the original packaging and tags. Items that are damaged after use, altered, or missing their original packaging may not qualify.</p>
        </section>

        <section>
          <h2 className="text-xl text-[#14212B] mb-3" style={{ fontFamily: "var(--font-display)" }}>How to request help</h2>
          <p>Contact us with your order number, a short description of the issue, and clear photos if the item arrived damaged or incorrect. Our customer care team will guide you through the next step.</p>
          <a href="https://wa.me/8801409000421" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 text-[#14212B] border-b border-[#14212B] pb-1 hover:text-[#B28B52] hover:border-[#B28B52] transition-colors">CONTACT US ON WHATSAPP →</a>
        </section>
      </div>
    </div>
  );
}
