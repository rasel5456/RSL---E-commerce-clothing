import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import BannerCarousel from "./components/BannerCarousel";
import CategorySlider from "./components/CategorySlider";
import SiteHeader from "./components/SiteHeader";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "RSL - Premium Fashion Store in Bangladesh | Buy Trendy Clothing Online",
  description: "Shop the latest fashion trends at RSL. Premium quality men's and women's clothing with fast delivery across Bangladesh. Cash on delivery available.",
  openGraph: {
    title: "RSL - Premium Fashion Store in Bangladesh",
    description: "Shop the latest fashion trends at RSL. Premium quality clothing with fast delivery across Bangladesh.",
    type: "website",
  },
};

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

type StorefrontProduct = {
  name?: unknown;
  price?: unknown;
  stock?: unknown;
  images?: unknown;
};

function isStorefrontReady(product: StorefrontProduct) {
  return Boolean(
    product &&
      typeof product.name === "string" &&
      product.name.trim().length >= 4 &&
      Number(product.price) > 0 &&
      Number(product.stock) > 0 &&
      Array.isArray(product.images) &&
      product.images[0]
  );
}

export default async function Home() {
  const [productsRes, bannersRes, allProductsRes] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("banners").select("*").eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("products").select("*").order("created_at", { ascending: false }),
  ]);

  const products = (productsRes.data || []).filter(isStorefrontReady).slice(0, 8);
  const error = productsRes.error;
  const banners = bannersRes.data;
  const allProducts = (allProductsRes.data || []).filter(isStorefrontReady);

  const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean)));

  const productsByCategory = uniqueCategories.map((cat) => {
    return { category: cat, items: allProducts.filter((p) => p.category === cat) };
  });

  const menProduct = allProducts.find((p) => p.gender === "men");
  const womenProduct = allProducts.find((p) => p.gender === "women");
  const newestProduct = allProducts[0];

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
      <div className="bg-[#14120F] text-[#F7F4EF] text-center text-[10px] sm:text-[11px] tracking-[0.16em] py-2.5 px-4" role="note">
        <span className="text-[#D9B879]">RSL / 01</span>&nbsp;&nbsp; FREE SHIPPING ON ORDERS OVER ৳2,000 &nbsp;·&nbsp; DELIVERY ACROSS BANGLADESH
      </div>

      <SiteHeader />
      <h1 className="sr-only">RSL - Premium Fashion Store in Bangladesh</h1>

      {banners && banners.length > 0 ? <BannerCarousel banners={banners} /> : (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-center text-[#6E675C]">
          Ekhono kono Banner jog kora hoyni. Admin Panel theke Banner jog korun.
        </section>
      )}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#9C7A44] mb-3">CURATED WORLDS</p>
            <h2 className="text-4xl md:text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Shop by category</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#6E675C]" style={{ fontFamily: "var(--font-sans)" }}>Modern silhouettes and everyday pieces, selected for your wardrobe.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 md:gap-5">
          {categories.map(function (cat, index) {
            return (
              <a key={cat.label} href={cat.href} className="group relative h-[360px] sm:h-[440px] overflow-hidden flex items-end p-6 md:p-8 bg-[#DDD6C8]">
                <Image src={cat.image} alt={cat.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/85 via-[#14120F]/10 to-transparent" />
                <span className="absolute top-5 right-5 text-[10px] tracking-[0.2em] text-[#F7F4EF]/80">0{index + 1}</span>
                <div className="relative text-[#F7F4EF]">
                  <span className="block text-3xl md:text-4xl mb-3 tracking-[0.04em]" style={{ fontFamily: "var(--font-display)" }}>{cat.label}</span>
                  <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.18em] border-b border-[#F7F4EF]/60 pb-2 group-hover:border-[#D9B879] transition-colors">EXPLORE <span aria-hidden="true" className="text-base leading-none transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="new-arrivals" className="bg-[#EDE8DF] border-y border-[#DDD6C8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#9C7A44] mb-3">THE LATEST EDIT</p>
            <h2 className="text-4xl md:text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>New arrivals</h2>
          </div>
          <a href="/shop" className="self-start md:self-end inline-flex items-center gap-3 text-[11px] tracking-[0.14em] text-[#6E675C] hover:text-[#9C7A44] transition-colors border-b border-[#6E675C]/40 pb-2">VIEW ALL <span aria-hidden="true" className="text-base">→</span></a>
        </div>

        {error ? <p className="text-red-600">Product load korte somossa hoyeche: {error.message}</p> : null}
        {!error && (!products || products.length === 0) ? <p className="text-[#6E675C]">Ekhono kono product jog kora hoyni.</p> : null}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.slug || product.id}
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
          })}
        </div>
        </div>
      </section>

      {productsByCategory.filter((group) => group.items.length >= 2).map(function (group) {
        return <CategorySlider key={group.category} title={group.category} products={group.items} />;
      })}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-20 items-center">
        <div className="relative h-[420px] md:h-[560px] overflow-hidden bg-[#DDD6C8]">
          <Image src={newestProduct?.images?.[0] || placeholderImg} alt="RSL everyday collection" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/30 to-transparent" />
          <span className="absolute left-6 bottom-6 text-[10px] tracking-[0.2em] text-[#F7F4EF]">RSL / EVERYDAY 01</span>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] text-[#9C7A44] mb-5">THE RSL POINT OF VIEW</p>
          <h2 className="text-4xl md:text-6xl leading-[0.98] mb-8" style={{ fontFamily: "var(--font-display)" }}>Quiet confidence, made for every day.</h2>
          <p className="text-[#6E675C] mb-10 max-w-md leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>RSL শুরু হয়েছে একটি বিশ্বাস থেকে—সাধারণ পোশাক ও যত্নশীল কারুকাজ মিলেই অসাধারণ হয়ে ওঠে।</p>
          <a href="/about" className="inline-flex items-center gap-4 text-[11px] tracking-[0.16em] border-b border-[#14120F] pb-2 hover:text-[#9C7A44] hover:border-[#9C7A44] transition-colors">READ OUR STORY <span aria-hidden="true" className="text-base">→</span></a>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-40 px-6 text-center" style={{ background: "radial-gradient(circle at 50% 0%, #3B342B 0%, #221F1B 36%, #14120F 78%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(247,244,239,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(247,244,239,.18) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="relative">
        <p className="text-[10px] tracking-[0.28em] text-[#D9B879] mb-5">SIGNATURE COLLECTION / 01</p>
        <h2 className="text-5xl md:text-8xl leading-[0.9] text-[#F7F4EF] mb-7" style={{ fontFamily: "var(--font-display)" }}>The everyday<br /><em>collection.</em></h2>
        <p className="text-[#F7F4EF]/70 mb-10" style={{ fontFamily: "var(--font-sans)" }}>Designed for every version of you.</p>
        <a href="/shop" className="inline-flex items-center gap-4 bg-[#F7F4EF] text-[#14120F] px-8 py-4 text-[11px] tracking-[0.16em] hover:bg-[#D9B879] transition-colors">EXPLORE COLLECTION <span aria-hidden="true" className="text-base">→</span></a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-5">
        {whyItems.map(function (item) {
          return (
            <div key={item.label} className="text-center md:text-left md:border-l md:border-[#DDD6C8] md:pl-6">
              <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#9C7A44] rounded-full text-[#9C7A44] mx-auto md:mx-0">
                {iconMap[item.icon]}
              </div>
              <p className="text-[12px] leading-relaxed tracking-[0.03em]" style={{ fontFamily: "var(--font-sans)" }}>{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-[#14120F] text-[#F7F4EF] py-24 px-6 text-center">
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>Stay In The Loop</h2>
        <p className="text-[#F7F4EF]/70 max-w-md mx-auto mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>Be the first to discover new drops, exclusive collections and special offers.</p>
        <form action="mailto:rslbdshop@gmail.com" method="post" encType="text/plain" className="flex max-w-sm mx-auto border-b border-[#F7F4EF]/40">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input id="newsletter-email" name="email" type="email" required placeholder="Your email address" className="flex-1 bg-transparent py-3 text-sm placeholder:text-[#F7F4EF]/40 focus:outline-none" />
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
