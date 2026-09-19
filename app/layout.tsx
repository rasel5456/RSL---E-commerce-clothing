import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rslbd.shop"),
  title: {
    default: "RSL | Modern Fashion in Bangladesh",
    template: "%s | RSL",
  },
  description: "Discover modern men's and women's clothing from RSL, with delivery across Bangladesh and free shipping over ৳2,000.",
  openGraph: {
    title: "RSL | Modern Fashion in Bangladesh",
    description: "Modern essentials, refined details, and effortless style—delivered across Bangladesh.",
    url: "https://www.rslbd.shop",
    siteName: "RSL",
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RSL | Modern Fashion in Bangladesh",
    description: "Modern essentials, refined details, and effortless style from RSL.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
