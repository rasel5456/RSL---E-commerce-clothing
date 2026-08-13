import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import BannerCarousel from "./components/BannerCarousel";
import CartIcon from "./components/CartIcon";
import SearchBox from "./components/SearchBox";
import WishlistIcon from "./components/WishlistIcon";
import AccountIcon from "./components/AccountIcon";
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

const categories = [
  { label: "MEN", from: "#2B2620", to: "#14120F" },
  { label: "WOMEN", from: "#3A3227", to: "#221F1B" },
  { label: "NEW ARRIVALS", from: "#4A3F2E", to: "#26221C" },
];

const whyItems = [
  "Premium Quality",
  "Modern Design",
  "Secure Payment",
  "Fast Delivery Across Bangladesh",
];

export default async function Home() {
  const [productsRes, bannersRes] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("banners").select("*").eq("is_active", true).order("display_order", { ascending: true }),
  ]);

  const products = productsRes.data;
  const error = productsRes.error;
  const banners = bannersRes.data;

  return (
    <div
      className={`${display.variable} ${bangla.variable} ${sans.variable} min-h-screen bg-[#F7F4EF] text-[#14120F]`}
      style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}
    >
      <div className="bg-[#14120F] text-[#F7F4EF] text-center text-[11px] tracking-[0.15em] py-2.5 px-4">
        FREE SHIPPING ON ORDERS OVER TAKA 2000
      </div>

      <header className="sticky top-0 z-40 bg-[#F7F4EF]/95 backdrop-blur border-b border-[#DDD6C8]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</Link>

          <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.08em] text-[#3A3630]">
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">HOME</Link>
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">SHOP</Link>
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">MEN</Link>
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">WOMEN</Link>
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">NEW ARRIVALS</Link>
            <Link href="#" className="hover:text-[#9C7A44] transition-colors">COLLECTIONS</Link>
          </nav>

          <div className="flex items-center gap-5 text-[#14120F]">
            <SearchBox />
            <AccountIcon />
            <WishlistIcon />
            <CartIcon />
          </div>
        </div>
      </header>

      {banners && banners.length > 0 ? (
        <BannerCarousel banners={banners} />
      ) : (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-center text-[#6E675C]">
          Ekhono kono Banner jog kora hoyni. Admin Panel theke Banner jog korun.
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map(function (cat) {
            return (
              <a key={cat.label} href="#" className="group relative h-[420px] overflow-hidden flex items-end p-7" style={{ background: "linear-gradient(160deg, " + cat.from + ", " + cat.to + ")" }}>
                <div className="relative text-[#F7F4EF]">
                  <span className="block text-2xl mb-2 tracking-[0.05em]" style={{ fontFamily: "var(--font-display)" }}>{cat.label}</span>
                  <span className="text-[11px] tracking-[0.15em] border-b border-[#F7F4EF]/50 pb-1 group-hover:border-[#9C7A44] transition-colors">SHOP NOW</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="new-arrivals" className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>New Arrivals</h2>
          <a href="#" className="text-[12px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">VIEW ALL</a>
        </div>

        {error ? <p className="text-red-600">Product load korte somossa hoyeche: {error.message}</p> : null}
        {!error && (!products || products.length === 0) ? <p className="text-[#6E675C]">Ekhono kono product jog kora hoyni.</p> : null}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {products ? products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
                sizes={product.sizes || []}
                colors={product.colors || []}
              />
            );
          }) : null}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
        <div className="h-[420px]" style={{ background: "linear-gradient(160deg, #E8E2D6, #DDD6C8)" }} />
        <div>
          <p className="text-[12px] tracking-[0.2em] text-[#9C7A44] mb-5">OUR PHILOSOPHY</p>
          <h2 className="text-3xl md:text-4xl leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>Built around modern essentials, refined details and effortless style.</h2>
          <p className="text-[#6E675C] mb-8 max-w-md" style={{ fontFamily: "var(--font-sans)" }}>RSL suru hoyeche ekta e biswas theke shadharon poshak o joyto ar nikhut karukaje osadharon hoye othe.</p>
          <a href="#" className="text-[13px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">OUR STORY</a>
        </div>
      </section>

      <section className="relative py-28 md:py-36 px-6 text-center" style={{ background: "linear-gradient(160deg, #221F1B, #14120F)" }}>
        <p className="text-[12px] tracking-[0.25em] text-[#9C7A44] mb-5">SIGNATURE COLLECTION</p>
        <h2 className="text-4xl md:text-6xl text-[#F7F4EF] mb-6" style={{ fontFamily: "var(--font-display)" }}>The Everyday Collection</h2>
        <p className="text-[#F7F4EF]/70 mb-10" style={{ fontFamily: "var(--font-sans)" }}>Designed for every version of you.</p>
        <a href="#" className="inline-block bg-[#F7F4EF] text-[#14120F] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] hover:text-[#F7F4EF] transition-colors">EXPLORE COLLECTION</a>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-2 md:grid-cols-4 gap-10">
        {whyItems.map(function (item) {
          return (
            <div key={item} className="text-center">
              <div className="w-10 h-10 mx-auto mb-4 border border-[#9C7A44] rounded-full" />
              <p className="text-[13px] tracking-[0.03em]" style={{ fontFamily: "var(--font-sans)" }}>{item}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-[#14120F] text-[#F7F4EF] py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>Stay In The Loop</h2>
        <p className="text-[#F7F4EF]/70 max-w-md mx-auto mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>Be the first to discover new drops, exclusive collections and special offers.</p>
        <form className="flex max-w-sm mx-auto border-b border-[#F7F4EF]/40">
          <input type="email" placeholder="Your email address" className="flex-1 bg-transparent py-3 text-sm placeholder:text-[#F7F4EF]/40 focus:outline-none" />
          <button type="submit" className="text-[12px] tracking-[0.1em] px-3 hover:text-[#9C7A44] transition-colors">SUBSCRIBE</button>
        </form>
      </section>

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
          (c) 2026 RSL. Sarbossotto songrokkhito.
        </div>
      </footer>
    </div>
  );
}




