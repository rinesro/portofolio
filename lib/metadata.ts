import type { Metadata } from "next";
import { situs } from "@/content/situs";

type Opsi = {
  judul: string;
  deskripsi: string;
  path: string;
};

/** Gambar pratinjau saat tautan situs dibagikan di WhatsApp, LinkedIn, dan sejenisnya. */
export const gambarPratinjau = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Kartu portofolio Sandhika Hamzah, data analyst, dengan grafik tren penjualan ritel 2014 sampai 2017.",
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
      images: [gambarPratinjau],
    },
    twitter: {
      card: "summary_large_image",
      title: judul,
      description: deskripsi,
      images: [gambarPratinjau.url],
    },
  };
}
