import type { Metadata } from "next";
import { situs } from "@/content/situs";

type Opsi = {
  judul: string;
  deskripsi: string;
  path: string;
};

/** Metadata dasar + Open Graph untuk tiap route. */
export function buatMetadata({ judul, deskripsi, path }: Opsi): Metadata {
  const url = `${situs.url}${path}`;
  return {
    title: judul,
    description: deskripsi,
    alternates: { canonical: url },
    openGraph: {
      title: judul,
      description: deskripsi,
      url,
      siteName: situs.nama,
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: judul,
      description: deskripsi,
    },
  };
}
