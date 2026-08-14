export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 min-h-[50vh]">
      <h1 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: "var(--font-display)" }}>Shipping & Returns</h1>
      <h2 className="text-lg mb-2 mt-6" style={{ fontFamily: "var(--font-display)" }}>Shipping</h2>
      <p className="text-[#6E675C] mb-4">We deliver across Bangladesh. Free shipping on orders over Taka 2000. Standard delivery takes 3-5 business days inside Dhaka and 5-7 business days outside Dhaka.</p>
      <h2 className="text-lg mb-2 mt-6" style={{ fontFamily: "var(--font-display)" }}>Returns</h2>
      <p className="text-[#6E675C] mb-4">If you are not satisfied with your order, you can request a return or exchange within 3 days of delivery. The product must be unused and in its original packaging.</p>
    </div>
  );
}
