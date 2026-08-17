import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import ProductCard from "./components/ProductCard";
import BannerCarousel from "./components/BannerCarousel";
import CategorySlider from "./components/CategorySlider";
import SiteHeader from "./components/SiteHeader";
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

const whyItems = [
  { label: "Premium Quality", icon: "Q" },
  { label: "Modern Design", icon: "D" },
  { label: "Secure Payment", icon: "P" },
  { label: "Fast Delivery Across Bangladesh", icon: "S" },
];

export default async function Home() {
  const [productsRes, bannersRes, allProductsRes] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("banners").select("*").eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("products").select("*").order("created_at", { ascending: false }),
  ]);

  const products = productsRes.data;
  const error = productsRes.error;
  const banners = bannersRes.data;
  const allProducts = allProductsRes.data || [];

  const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean)));

  const productsByCategory = uniqueCategories.map((cat) => {
    return { category: cat, items: allProducts.filter((p) => p.category === cat) };
  });

  const menProduct = allProducts.find((p) => p.gender === "men" && p.images && p.images[0]);
  const womenProduct = allProducts.find((p) => p.gender === "women" && p.images && p.images[0]);
  const newestProduct = allProducts.find((p) => p.images && p.images[0]);

  const placeholderImg = "https://placehold.co/600x750/26221C/F7F4EF?text=RSL";

  const categories = [
    { label: "MEN", href: "/shop?gender=men", image: menProduct && menProduct.images && menProduct.images[0] ? menProduct.images[0] : placeholderImg },
    { label: "WOMEN", href: "/shop?gender=women", image: womenProduct && womenProduct.images && womenProduct.images[0] ? womenProduct.images[0] : placeholderImg },
    { label: "NEW ARRIVALS", href: "/shop", image: newestProduct && newestProduct.images && newestProduct.images[0] ? newestProduct.images[0] : placeholderImg },
  ];

  const iconMap: { [key: string]: React.ReactNode } = {
    Q: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.6 1.5 6.8L12 17l-6.2 3.5 1.5-6.8-5.1-4.6 6.9-.8z"></path></svg>
    ),
    D: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h12M3 18h6"></path></svg>
    ),
    P: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path></svg>
    ),
    S: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="7" width="15" height="13" rx="1"></rect><path d="M16 10h3l3 3v4h-6z"></path><circle cx="5.5" cy="20.5" r="1.5"></circle><circle cx="18.5" cy="20.5" r="1.5"></circle></svg>
    ),
  };

  return (
    <div className={display.variable + " " + bangla.variable + " " + sans.variable + " min-h-screen bg-[#F7F4EF] text-[#14120F]"} style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}>
      <div className="bg-[#B5651D] text-[#F7F4EF] text-center text-[11px] tracking-[0.15em] py-2.5 px-4">
        FREE SHIPPING ON ORDERS OVER TAKA 2,000
      </div>

      <SiteHeader />

      {banners && banners.length > 0 ? <BannerCarousel banners={banners} /> : (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-center text-[#6E675C]">
          Ekhono kono Banner jog kora hoyni. Admin Panel theke Banner jog korun.
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>Shop By Category</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map(function (cat) {
            return (
              <a key={cat.label} href={cat.href} className="group relative h-[440px] overflow-hidden flex items-end p-8">
                <img src={cat.image} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,18,15,0) 40%, rgba(20,18,15,0.85) 100%)" }} />
                <div className="relative text-[#F7F4EF]">
                  <span className="block text-[28px] mb-2 tracking-[0.05em]" style={{ fontFamily: "var(--font-display)" }}>{cat.label}</span>
                  <span className="text-[11px] tracking-[0.15em] border-b border-[#F7F4EF]/50 pb-1 group-hover:border-[#9C7A44] group-hover:pl-1 transition-all">SHOP NOW</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="new-arrivals" className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>New Arrivals</h2>
          <a href="/shop" className="text-[11px] tracking-[0.08em] text-[#6E675C] hover:text-[#9C7A44] transition-colors">View All</a>
        </div>

        {error ? <p className="text-red-600">Product load korte somossa hoyeche: {error.message}</p> : null}
        {!error && (!products || products.length === 0) ? <p className="text-[#6E675C]">Ekhono kono product jog kora hoyni.</p> : null}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products ? products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discount_price}
                image={product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x750/F7F4EF/14120F?text=RSL"}
                sizes={product.sizes || []}
                colors={product.colors || []}
                stock={product.stock}
                soldCount={product.sold_count}
              />
            );
          }) : null}
        </div>
      </section>

      {productsByCategory.map(function (group) {
        return <CategorySlider key={group.category} title={group.category} products={group.items} />;
      })}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40 grid md:grid-cols-2 gap-14 items-center">
        <div className="h-[460px]" style={{ background: "linear-gradient(160deg, #E8E2D6, #DDD6C8)" }} />
        <div>
          <p className="text-[12px] tracking-[0.2em] text-[#9C7A44] mb-5">OUR PHILOSOPHY</p>
          <h2 className="text-3xl md:text-5xl leading-tight mb-8" style={{ fontFamily: "var(--font-display)" }}>Built around modern essentials, refined details and effortless style.</h2>
          <p className="text-[#6E675C] mb-10 max-w-md leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>RSL suru hoyeche ekta e biswas theke shadharon poshak o joyto ar nikhut karukaje osadharon hoye othe.</p>
          <a href="#" className="text-[13px] tracking-[0.1em] border-b border-[#14120F] pb-1 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">OUR STORY</a>
        </div>
      </section>

      <section className="relative py-32 md:py-44 px-6 text-center" style={{ background: "linear-gradient(160deg, #221F1B, #14120F)" }}>
        <p className="text-[12px] tracking-[0.25em] text-[#9C7A44] mb-5">SIGNATURE COLLECTION</p>
        <h2 className="text-4xl md:text-7xl text-[#F7F4EF] mb-6" style={{ fontFamily: "var(--font-display)" }}>The Everyday Collection</h2>
        <p className="text-[#F7F4EF]/70 mb-10" style={{ fontFamily: "var(--font-sans)" }}>Designed for every version of you.</p>
        <a href="/shop" className="inline-block bg-[#F7F4EF] text-[#14120F] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] hover:text-[#F7F4EF] transition-colors">EXPLORE COLLECTION</a>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-2 md:grid-cols-4 gap-10">
        {whyItems.map(function (item) {
          return (
            <div key={item.label} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-[#9C7A44] rounded-full text-[#9C7A44]">
                {iconMap[item.icon]}
              </div>
              <p className="text-[13px] tracking-[0.03em]" style={{ fontFamily: "var(--font-sans)" }}>{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-[#14120F] text-[#F7F4EF] py-24 px-6 text-center">
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
            <p className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-4">EST. 2026</p>
            <div className="flex gap-4">
              <a href="https://wa.me/8801409000421" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C7A44] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2m0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.27-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07.89 2.4 1.02 2.57c.12.16 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29"/></svg></a>
              <a href="https://www.facebook.com/share/18S865vmAM/" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C7A44] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94"/></svg></a>
              <a href="mailto:rslbdshop@gmail.com" className="hover:text-[#9C7A44] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m2 7 10 6 10-6"></path></svg></a>
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">SHOP</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="/shop?gender=men" className="hover:text-[#9C7A44]">Men</a></li>
              <li><a href="/shop?gender=women" className="hover:text-[#9C7A44]">Women</a></li>
              <li><a href="/shop" className="hover:text-[#9C7A44]">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">SUPPORT</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="/support" className="hover:text-[#9C7A44]">Customer Support</a></li>
              <li><a href="/shipping-returns" className="hover:text-[#9C7A44]">Shipping & Returns</a></li>
              <li><a href="/about" className="hover:text-[#9C7A44]">About RSL</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] text-[#9C7A44] mb-4">LEGAL</p>
            <ul className="space-y-2 text-sm text-[#3A3630]">
              <li><a href="/privacy-policy" className="hover:text-[#9C7A44]">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#9C7A44]">Terms & Conditions</a></li>
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



