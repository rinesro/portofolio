import { profil } from "./profil";

export const situs = {
  nama: `${profil.nama} — Portofolio Data Analyst`,
  judulSingkat: profil.nama,
  deskripsi:
    "Portofolio data analyst Sandhika Hamzah: studi kasus pembersihan data, eksplorasi, dashboard, dan laporan yang bisa dipakai mengambil keputusan.",

  /**
   * Alamat situs, dipakai untuk URL kanonik, Open Graph, dan sitemap.
   * Urutan pencariannya:
   *   1. NEXT_PUBLIC_SITE_URL, kalau Anda mengisinya sendiri di Vercel
   *   2. domain produksi yang diberikan Vercel saat build, termasuk domain
   *      kustom kalau sudah dipasang
   *   3. alamat cadangan di bawah, dipakai saat build di komputer sendiri
   * Jadi setelah deploy pertama, tidak ada yang perlu diubah manual.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://sandhika-hamzah.vercel.app"),

  cv: {
    /** Taruh file PDF-nya di /public dengan nama yang sama persis. */
    path: "/cv-sandhika-hamzah.pdf",
    /** Ubah ke true setelah file CV benar-benar ada di /public. */
    tersedia: true,
  },
} as const;
