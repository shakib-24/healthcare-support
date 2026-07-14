import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Local-only fallback so `next build` works before NEXT_PUBLIC_SITE_URL is
// configured. A real deployment must set NEXT_PUBLIC_SITE_URL.
const siteUrl = siteConfig.siteUrl ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/payment"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
