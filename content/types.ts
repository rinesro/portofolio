/**
 * Tipe data untuk seluruh isi situs.
 * Semua teks situs tinggal di folder /content, komponen tidak menyimpan teks.
 */

/**
 * Penamaan sengaja dibedakan:
 * - "studi-kasus": pekerjaan analisis yang dikerjakan sendiri
 * - "proyek": hanya untuk pekerjaan dengan klien atau pengguna nyata
 */
export type JenisEntri = "studi-kasus" | "proyek";

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
  /** Path file di /public, contoh: "/gambar/capital-bikeshare/tren.png". */
  src: string | null;
  /** Teks alternatif wajib diisi bersamaan dengan src. */
  alt: string;
  caption: string;
  /** Rasio kotak gambar, sesuaikan dengan ukuran asli file. */
  rasio?: string;
};

export type Tautan = {
  label: string;
  /** null berarti tautan belum tersedia dan ditampilkan sebagai placeholder. */
  href: string | null;
};

export type Berkas = {
  label: string;
  /** Path file di /public. */
  path: string;
  /** Keterangan singkat, misalnya format dan isinya. */
  keterangan: string;
};

export type Entri = {
  slug: string;
  judul: string;
  /** Ditampilkan di kartu daftar: satu kalimat masalah yang dijawab. */
  masalahSingkat: string;
  jenis: JenisEntri;
  tahun: string;
  /** Ditandai sebagai sorotan pada daftar studi kasus. */
  sorotan: boolean;
  ringkasan: {
    masalah: string;
    pendekatan: string;
    /** null = belum diisi pemilik situs. */
    hasil: string | null;
  };
  tools: string[];
  /** Ditampilkan jika daftar tools belum lengkap. */
  toolsPlaceholder?: string;
  /** Berkas yang bisa diunduh langsung: notebook, dokumen, spreadsheet. */
  berkas: Berkas[];
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
