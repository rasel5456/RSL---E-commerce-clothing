import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import ProductCard from "./components/ProductCard";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});

const bangla = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bangla",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div
      className={`${display.variable} ${bangla.variable} ${sans.variable} min-h-screen bg-[#F7F4EF] text-[#14120F]`}
      style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}
    >
      {/* Announcement Bar */}
      <div className="bg-[#14120F] text-[#F7F4EF] text-center text-[11px] tracking-[0.15em] py-2.5 px-4">
        FREE SHIPPING ON ORDERS OVER ৳2000
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#F7F4EF]/95 backdrop-blur border-b border-[#DDD6C8]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl tracking-[0.2em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            RSL
          </a>

          <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.08em] text-[#3A3630]">
            <a href="#" className="hover:text-[#9C7A44] transition-colors">HOME</a>
            <a href="#" className="hover:text-[#9C7A44] transition-colors">SHOP</a>
            <a href="#" className="hover:text-[#9C7A44] transition-colors">MEN</a>
            <a href="#" className="hover:text-[#9C7A44] transition-colors">WOMEN</a>
            <a href="#" className="hover:text-[#9C7A44] transition-colors">NEW ARRIVALS</a>
            <a href="#" className="hover:text-[#9C7A44] transition-colors">COLLECTIONS</a>
          </nav>

          <div className="flex items-center gap-5 text-[#14120F]">
            <button aria-label="Search" className="hover:text-[#9C7A44] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button aria-label="Account" className="hidden sm:block hover:text-[#9C7A44] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
            </button>
            <button aria-label="Wishlist" className="hidden sm:block hover:text-[#9C7A44] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4.4-9.5-8.9C.7 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.8C11 6.2 12.5 5 14.5 5 18 5 19.3 8.6 21.5 12.1 19 16.6 12 21 12 21Z"/></svg>
            </button>
            <button aria-label="Cart" className="hover:text-[#9C7A44] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6h15l-1.5 9h-12L6 6Z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 min-h-[86vh]">
          {/* Left: copy */}
          <div className="flex flex-col justify-center py-16 md:py-0 order-2 md:order-1">
            <p className="text-[12px] tracking-[0.25em] text-[#9C7A44] mb-5">RSL — EST. 2026</p>
            <h1
              className="text-[15vw] md:text-[4.6vw] leading-[0.95] font-medium mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Define
              <br />
              Your Style.
            </h1>
            <p className="text-[#6E675C] text-base md:text-lg max-w-sm mb-9" style={{ fontFamily: "var(--font-sans)" }}>
              Modern essentials, designed for the way you move.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#new-arrivals"
                className="bg-[#14120F] text-[#F7F4EF] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors"
              >
                SHOP NOW
              </a>
              <a
                href="#"
                className="text-[13px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors"
              >
                EXPLORE COLLECTION
              </a>
            </div>
          </div>

          {/* Right: editorial panel + hangtag signature */}
          <div className="relative order-1 md:order-2 min-h-[50vh] md:min-h-0">
            <div
              className="absolute inset-0 md:inset-y-8"
              style={{
                background:
                  "linear-gradient(155deg, #221F1B 0%, #14120F 55%, #3A3227 100%)",
              }}
            >
              {/* TODO: replace this gradient div's background with a real editorial
                  fashion photo, e.g. style={{ backgroundImage: "url(/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} */}
              <div
                className="absolute bottom-10 left-8 right-8 text-[#F7F4EF]/70 text-[11px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                SS26 EDITORIAL
              </div>
            </div>

            {/* Signature hangtag */}
            <div className="hidden md:flex absolute top-16 -right-3 items-center gap-2 bg-[#F7F4EF] border border-[#DDD6C8] px-3 py-6 shadow-sm">
              <span
                className="text-[11px] tracking-[0.3em] [writing-mode:vertical-rl] rotate-180"
                style={{ fontFamily: "var(--font-display)" }}
              >
                RSL · EST. 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "MEN", from: "#2B2620", to: "#14120F" },
            { label: "WOMEN", from: "#3A3227", to: "#221F1B" },
            { label: "NEW ARRIVALS", from: "#4A3F2E", to: "#26221C" },
          ].map((cat) => (
            <a
              key={cat.label}
              href="#"
              className="group relative h-[420px] overflow-hidden flex items-end p-7"
              style={{ background: `linear-gradient(160deg, ${cat.from}, ${cat.to})` }}
            >
              {/* TODO: swap for a real category photo per the pattern above */}
              <div className="relative text-[#F7F4EF]">
                <span
                  className="block text-2xl mb-2 tracking-[0.05em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cat.label}
                </span>
                <span className="text-[11px] tracking-[0.15em] border-b border-[#F7F4EF]/50 pb-1 group-hover:border-[#9C7A44] transition-colors">
                  SHOP NOW
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals — real products from Supabase */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-16">
        <div className="flex items-end justify-between mb-10">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Arrivals
          </h2>
          <a href="#" className="text-[12px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">
            VIEW ALL
          </a>
        </div>

        {error && (
          <p className="text-red-600">প্রোডাক্ট লোড করতে সমস্যা হয়েছে: {error.message}</p>
        )}

        {!error && (!products || products.length === 0) && (
          <p className="text-[#6E675C]">এখনো কোনো প্রোডাক্ট যোগ করা হয়নি।</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
              sizes={product.sizes || []}
              colors={product.colors || []}
            />
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
        <div
          className="h-[420px]"
          style={{ background: "linear-gradient(160deg, #E8E2D6, #DDD6C8)" }}
        >
          {/* TODO: replace with a real lifestyle image */}
        </div>
        <div>
          <p className="text-[12px] tracking-[0.2em] text-[#9C7A44] mb-5">OUR PHILOSOPHY</p>
          <h2
            className="text-3xl md:text-4xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built around modern essentials, refined details and effortless style.
          </h2>
          <p className="text-[#6E675C] mb-8 max-w-md" style={{ fontFamily: "var(--font-sans)" }}>
            RSL শুরু হয়েছে একটাই বিশ্বাস থেকে — সাধারণ পোশাকও যত্ন আর নিখুঁত কারুকাজে অসাধারণ হয়ে ওঠে।
          </p>
          <a href="#" className="text-[13px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">
            OUR STORY
          </a>
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section
        className="relative py-28 md:py-36 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #221F1B, #14120F)" }}
      >
        <p className="text-[12px] tracking-[0.25em] text-[#9C7A44] mb-5">SIGNATURE COLLECTION</p>
        <h2
          className="text-4xl md:text-6xl text-[#F7F4EF] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Everyday Collection
        </h2>
        <p className="text-[#F7F4EF]/70 mb-10" style={{ fontFamily: "var(--font-sans)" }}>
          Designed for every version of you.
        </p>
        <a
          href="#"
          className="inline-block bg-[#F7F4EF] text-[#14120F] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] hover:text-[#F7F4EF] transition-colors"
        >
          EXPLORE COLLECTION
        </a>
      </section>

      {/* Why RSL */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-2 md:grid-cols-4 gap-10">
        {[
          "Premium Quality",
          "Modern Design",
          "Secure Payment",
          "Fast Delivery Across Bangladesh",
        ].map((item) => (
          <div key={item} className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 border border-[#9C7A44] rounded-full" />
            <p className="text-[13px] tracking-[0.03em]" style={{ fontFamily: "var(--font-sans)" }}>
              {item}
            </p>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section className="bg-[#14120F] text-[#F7F4EF] py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Stay In The Loop
        </h2>
        <p className="text-[#F7F4EF]/70 max-w-md mx-auto mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
          Be the first to discover new drops, exclusive collections and special offers.
        </p>
        <form className="flex max-w-sm mx-auto border-b border-[#F7F4EF]/40">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent py-3 text-sm placeholder:text-[#F7F4EF]/40 focus:outline-none"
          />
          <button type="submit" className="text-[12px] tracking-[0.1em] px-3 hover:text-[#9C7A44] transition-colors">
            SUBSCRIBE
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DDD6C8] px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="text-2xl tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-display)" }}>RSL</p>
            <p className="text-[11px] tracking-[0.15em] text-[#6E675C]">EST. 2026</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">SHOP</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="#" className="hover:text-[#9C7A44]">Men</a></li>
              <li><a href="#" className="hover:text-[#9C7A44]">Women</a></li>
              <li><a href="#" className="hover:text-[#9C7A44]">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">SUPPORT</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="#" className="hover:text-[#9C7A44]">Customer Support</a></li>
              <li><a href="#" className="hover:text-[#9C7A44]">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#9C7A44]">About RSL</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">LEGAL</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="#" className="hover:text-[#9C7A44]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#9C7A44]">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-[#DDD6C8] pt-6 text-center text-[12px] text-[#6E675C]">
          © 2026 RSL. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </div>
  );
}
