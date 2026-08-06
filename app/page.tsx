import ProductCard from "./components/ProductCard";

const sampleProducts = [
  { id: 1, name: "কটন শার্ট", price: 850, image: "https://placehold.co/400x400?text=Shirt" },
  { id: 2, name: "পাঞ্জাবি", price: 1200, image: "https://placehold.co/400x400?text=Panjabi" },
  { id: 3, name: "জিন্স প্যান্ট", price: 1500, image: "https://placehold.co/400x400?text=Jeans" },
  { id: 4, name: "টি-শার্ট", price: 550, image: "https://placehold.co/400x400?text=T-Shirt" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">RSL</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-gray-600">হোম</a>
            <a href="#" className="hover:text-gray-600">প্রোডাক্ট</a>
            <a href="#" className="hover:text-gray-600">কার্ট</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            RSL এ স্বাগতম
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            আপনার পছন্দের পোশাক, ঘরে বসেই অর্ডার করুন
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800">
            এখনই কিনুন
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">আমাদের প্রোডাক্ট</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © 2026 RSL. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </div>
  );
}