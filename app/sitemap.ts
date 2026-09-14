import type { MetadataRoute } from "next";
import { entri } from "@/content/entri";
import { situs } from "@/content/situs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rute = [
    "/",
    "/tentang/",
    ...entri.map((e) => `/studi-kasus/${e.slug}/`),
  ];

  return rute.map((path) => ({
    url: `${situs.url}${path}`,
    lastModified: new Date(),
  }));
}
