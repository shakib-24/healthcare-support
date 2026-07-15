import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Local-only fallback so `next build` works before NEXT_PUBLIC_SITE_URL is
// configured. A real deployment must set NEXT_PUBLIC_SITE_URL so the sitemap
// contains real, crawlable URLs.
const siteUrl = siteConfig.siteUrl ?? "http://localhost:3000";

// Checkout and payment utility pages are excluded: they are not standalone
// content pages and are already disallowed in robots.ts.
const routes = ["", "/pricing", "/legal", "/terms", "/contact", "/medical-matching"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
