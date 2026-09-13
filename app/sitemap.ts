import type { MetadataRoute } from "next";
import { entri } from "@/content/entri";
import { jalur } from "@/content/jalur";
import { situs } from "@/content/situs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rute = [
    "/",
    "/tentang/",
    ...jalur.map((j) => `/${j.slug}/`),
    ...entri.map((e) => `/studi-kasus/${e.slug}/`),
  ];

  return rute.map((path) => ({
    url: `${situs.url}${path}`,
    lastModified: new Date(),
  }));
}
