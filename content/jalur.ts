import type { Track } from "./types";

export const jalur: Track[] = [
  {
    slug: "data-analyst",
    nama: "Data Analyst",
    fokus:
      "Mengambil, membersihkan, dan menganalisis data, lalu menyajikannya sebagai dashboard dan laporan yang bisa dipakai mengambil keputusan.",
    pembuka:
      "Mengambil data dengan SQL, membersihkan dan memvalidasinya, merekonsiliasi sumber yang berbeda, lalu menyajikannya sebagai dashboard dan laporan rutin yang bisa dipakai mengambil keputusan. Isi jalur ini adalah studi kasus analisis data.",
    keahlian: [
      "pengolahan-data",
      "spreadsheet",
      "visualisasi",
      "analisis",
      "tools",
    ],
  },
  {
    slug: "data-engineer",
    nama: "Data Engineer",
    fokus:
      "Merancang dan membangun tempat data itu tinggal: pemodelan basis data, skema relasional, dan sistem yang menghasilkan datanya.",
    pembuka:
      "Merancang dan membangun tempat data itu tinggal: pemodelan basis data, skema relasional, dan sistem yang menghasilkan datanya. Isi jalur ini ditampilkan apa adanya, tanpa dipinjami entri dari jalur analis.",
    keahlian: ["pengolahan-data", "perancangan-data", "tools"],
  },
];

export function ambilJalur(slug: string): Track | undefined {
  return jalur.find((j) => j.slug === slug);
}
