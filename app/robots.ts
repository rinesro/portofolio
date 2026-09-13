import type { MetadataRoute } from "next";
import { situs } from "@/content/situs";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${situs.url}/sitemap.xml`,
  };
}
