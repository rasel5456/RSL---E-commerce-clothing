import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rslbd.shop";

  const { data: products } = await supabase.from("products").select("id, created_at");

  const productUrls = (products || []).map((product) => ({
    url: baseUrl + "/product/" + product.id,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: baseUrl + "/shop", lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: baseUrl + "/about", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: baseUrl + "/support", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: baseUrl + "/shipping-returns", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: baseUrl + "/privacy-policy", lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: baseUrl + "/terms", lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...staticUrls, ...productUrls];
}
