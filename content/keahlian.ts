import type { KelompokKeahlian } from "./types";

export const kelompokKeahlian: KelompokKeahlian[] = [
  {
    id: "pengolahan-data",
    judul: "Pengolahan dan pengambilan data",
    item: [
      "SQL (MySQL, PostgreSQL)",
      "JOIN, agregasi, subquery",
      "Python (pandas, NumPy)",
    ],
  },
  {
    id: "spreadsheet",
    judul: "Spreadsheet dan pelaporan",
    item: [
      "Microsoft Excel",
      "Google Sheets (PIVOT, QUERY, LOOKUP, conditional formatting)",
      "Rekonsiliasi data dari berbagai sumber",
    ],
  },
  {
    id: "visualisasi",
    judul: "Visualisasi data",
    item: ["Looker Studio", "Matplotlib", "Seaborn"],
  },
  {
    id: "analisis",
    judul: "Analisis dan pemodelan",
    item: [
      "Exploratory data analysis",
      "Data cleaning dan validasi",
      "Statistika deskriptif",
      "Regresi dan klasifikasi (Scikit-learn, LightGBM, Orange Data Mining)",
    ],
  },
  {
    id: "tools",
    judul: "Tools pendukung",
    item: [
      "Git dan GitHub",
      "Google Colab",
      "Jupyter Notebook",
      "Dokumentasi proses",
    ],
  },
];

/** Beranda hanya menampilkan versi ringkas, maksimal tiga kelompok. */
export const keahlianBeranda = [
  "pengolahan-data",
  "spreadsheet",
  "visualisasi",
];

export function ambilKeahlian(ids: string[]): KelompokKeahlian[] {
  return ids
    .map((id) => kelompokKeahlian.find((k) => k.id === id))
    .filter((k): k is KelompokKeahlian => Boolean(k));
}
