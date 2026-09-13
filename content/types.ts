/**
 * Tipe data untuk seluruh isi situs.
 * Semua teks situs tinggal di folder /content, komponen tidak menyimpan teks.
 */

export type TrackSlug = "data-analyst" | "data-engineer";

/**
 * Penamaan sengaja dibedakan:
 * - "studi-kasus": pekerjaan analisis/rekayasa yang dikerjakan sendiri
 * - "proyek": hanya untuk pekerjaan dengan klien/pengguna nyata dan skripsi
 */
export type JenisEntri = "studi-kasus" | "proyek";

/** Menentukan urutan bagian pada halaman detail. */
export type StrukturHalaman = "analisis" | "rekayasa";

export type Blok =
  | { kind: "paragraf"; teks: string }
  | { kind: "daftar"; item: string[] }
  | { kind: "daftar-nomor"; item: string[] }
  | { kind: "catatan"; teks: string }
  /** Placeholder yang sengaja terlihat sampai pemilik situs mengisinya. */
  | { kind: "placeholder"; petunjuk: string };

export type Bagian = {
  /** Dipakai sebagai anchor id dan entri daftar isi. */
  id: string;
  judul: string;
  blok: Blok[];
};

export type Gambar = {
  /** Isi dengan path file di /public, contoh: "/studi-kasus/dashboard.png". */
  src: string | null;
  /** Teks alternatif wajib diisi bersamaan dengan src. */
  alt: string;
  caption: string;
  /** Rasio kotak gambar, contoh: "16 / 9". */
  rasio?: string;
};

export type Tautan = {
  label: string;
  /** null berarti tautan belum tersedia dan ditampilkan sebagai placeholder. */
  href: string | null;
};

export type Entri = {
  slug: string;
  judul: string;
  /** Ditampilkan di kartu daftar: satu kalimat masalah yang dijawab. */
  masalahSingkat: string;
  jenis: JenisEntri;
  struktur: StrukturHalaman;
  tahun: string;
  /** Entri hanya muncul di halaman jalur yang disebut di sini. */
  jalur: TrackSlug[];
  /** Jalur yang menjadikan entri ini sorotan utama. */
  sorotan: TrackSlug[];
  ringkasan: {
    masalah: string;
    pendekatan: string;
    /** null = belum diisi pemilik situs. */
    hasil: string | null;
  };
  tools: string[];
  /** Ditampilkan jika daftar tools belum lengkap. */
  toolsPlaceholder?: string;
  tautan: Tautan[];
  bagian: Bagian[];
  gambar: Gambar[];
  /** id bagian tempat gambar ditampilkan. Default: "visualisasi". */
  gambarDiBagian?: string;
};

export type KelompokKeahlian = {
  id: string;
  judul: string;
  item: string[];
};

export type Track = {
  slug: TrackSlug;
  nama: string;
  /** Satu kalimat fokus jalur, dipakai di kartu beranda. */
  fokus: string;
  pembuka: string;
  /** id kelompok keahlian yang relevan untuk jalur ini. */
  keahlian: string[];
};
