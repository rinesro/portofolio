import { profil } from "./profil";

export const situs = {
  nama: `${profil.nama} — Portofolio Data Analyst`,
  judulSingkat: profil.nama,
  deskripsi:
    "Portofolio data analyst Sandhika Hamzah: studi kasus pembersihan data, eksplorasi, dashboard, dan laporan yang bisa dipakai mengambil keputusan.",

  /**
   * Ganti dengan domain final setelah situs dideploy.
   * Bisa juga diisi lewat environment variable NEXT_PUBLIC_SITE_URL di Vercel.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandhika-hamzah.vercel.app",

  cv: {
    /** Taruh file PDF-nya di /public dengan nama yang sama persis. */
    path: "/cv-sandhika-hamzah.pdf",
    /** Ubah ke true setelah file CV benar-benar ada di /public. */
    tersedia: false,
  },
} as const;
