# Portofolio Sandhika Hamzah — Data Analyst

Situs portofolio pribadi untuk melamar posisi **data analyst**, terutama magang
data analyst. Dibuat dengan Next.js App Router, TypeScript, dan Tailwind CSS,
tanpa database dan tanpa CMS.

Situs ini sengaja hanya memuat satu tema, yaitu pekerjaan analisis data. Kalau
nanti ada tema lain, buat situs terpisah, jangan dicampur ke sini.

Seluruh teks situs disimpan sebagai data terstruktur di folder `/content`.
Untuk mengubah isi situs, Anda cukup mengedit file di folder itu — tidak perlu
menyentuh komponen React sama sekali.

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Perintah lain:

| Perintah            | Fungsi                                          |
| ------------------- | ----------------------------------------------- |
| `npm run build`     | Membangun situs statis ke folder `out/`          |
| `npm run lint`      | Memeriksa gaya penulisan kode                    |
| `npm run typecheck` | Memeriksa kesalahan TypeScript                   |

Situs ini memakai **static export** (`output: "export"` di `next.config.ts`).
Hasil `npm run build` adalah HTML statis biasa, tidak butuh server Node.

## Struktur halaman

| Route                   | Isinya                                                         |
| ----------------------- | -------------------------------------------------------------- |
| `/`                     | Hero, seluruh studi kasus, dan ringkasan keahlian               |
| `/studi-kasus/[slug]/`  | Halaman detail tiap studi kasus                                 |
| `/tentang/`             | Perkenalan, cara kerja, pendidikan, sertifikasi, keahlian penuh |

Tidak ada halaman daftar studi kasus tersendiri. Daftarnya ada di beranda, dan
menu "Studi Kasus" di navigasi mengarah ke bagian itu (`/#studi-kasus`).

## Isi folder `/content`

| File          | Isinya                                                          |
| ------------- | --------------------------------------------------------------- |
| `profil.ts`   | Nama, kontak, perkenalan, cara kerja, pendidikan, sertifikasi     |
| `keahlian.ts` | Kelompok keahlian, dan mana yang tampil di beranda                |
| `entri.ts`    | Semua studi kasus                                                 |
| `situs.ts`    | Judul situs, deskripsi, URL, dan pengaturan tombol CV              |
| `types.ts`    | Definisi tipe data. Baca ini kalau ragu field apa yang tersedia   |

### Aturan penamaan

- **Studi kasus**: pekerjaan analisis yang dikerjakan sendiri.
- **Proyek**: hanya untuk pekerjaan dengan klien atau pengguna nyata.

Bedanya diatur lewat field `jenis` pada tiap entri (`"studi-kasus"` atau
`"proyek"`). Label pada kartu dan halaman detail ikut field ini. Saat ini
ketiga entri berjenis studi kasus.

## Menambah studi kasus baru

Tambahkan satu objek baru ke array `entri` di `content/entri.ts`. Halaman
detailnya, kartu di beranda, sitemap, dan metadata Open Graph akan terbentuk
sendiri.

```ts
{
  slug: "nama-di-url",              // halaman jadi /studi-kasus/nama-di-url/
  judul: "Judul Lengkap Pekerjaan",
  masalahSingkat: "Satu kalimat masalah yang dijawab. Tampil di kartu daftar.",
  jenis: "studi-kasus",
  tahun: "2026",
  sorotan: true,                    // beri badge "Sorotan utama" dan taruh di atas
  ringkasan: {
    masalah: "Satu sampai dua kalimat.",
    pendekatan: "Satu sampai dua kalimat.",
    hasil: null,                    // null = tampil sebagai placeholder
  },
  tools: ["SQL", "Looker Studio"],
  berkas: [                         // muncul di blok "Berkas dan Tautan"
    {
      label: "Notebook analisis",
      path: "/notebook/nama-file.ipynb",
      keterangan: "IPYNB. Berisi seluruh kode dan outputnya.",
    },
  ],
  tautan: [
    { label: "Repositori GitHub", href: "https://..." },
    { label: "Dashboard", href: null },   // null = tampil sebagai "belum diisi"
  ],
  bagian: [ /* lihat di bawah */ ],
  gambar: [ /* lihat di bawah */ ],
}
```

### Urutan bagian

Struktur halaman detail mengikuti urutan array `bagian`, jadi Andalah yang
menentukan urutannya. Pola yang dipakai ketiga studi kasus sekarang:

Latar Belakang → Pertanyaan SMART → Data Wrangling → Eksplorasi Data →
Visualisasi → (Analisis Lanjutan, opsional) → Kesimpulan dan Rekomendasi.

Field `id` pada tiap bagian dipakai sebagai anchor dan entri daftar isi, jadi
tulis dalam huruf kecil dan tanpa spasi.

### Jenis blok isi

```ts
{ kind: "paragraf", teks: "..." }
{ kind: "daftar", item: ["...", "..."] }
{ kind: "daftar-nomor", item: ["...", "..."] }   // dipakai untuk pertanyaan SMART
{ kind: "catatan", teks: "..." }                 // kotak catatan kecil
{ kind: "placeholder", petunjuk: "..." }         // penanda "belum diisi"
```

Pertanyaan SMART memakai `daftar-nomor` supaya tampil sebagai daftar bernomor
yang menonjol, bukan paragraf.

## Menaruh berkas dan gambar

Semua berkas statis ada di `/public` dan diakses lewat path root. Susunannya:

| Folder              | Isinya                                                      |
| ------------------- | ----------------------------------------------------------- |
| `/public/notebook/` | Notebook Jupyter mentah, ditautkan sebagai tombol unduh       |
| `/public/dokumen/`  | PDF dan spreadsheet, ditautkan sebagai tombol unduh           |
| `/public/gambar/`   | Grafik yang tampil di bagian Visualisasi, dikelompokkan per studi kasus |

Ukuran file pada tombol unduh dibaca otomatis saat build, jadi tidak perlu
ditulis manual.

### Menambahkan gambar

1. Ekspor grafiknya jadi PNG, taruh di `/public/gambar/<slug-studi-kasus>/`.
2. Isi field `gambar` pada entri:

```ts
gambar: [
  {
    src: "/gambar/capital-bikeshare/pola-penyewaan-per-jam.png",
    alt: "Grafik garis rata-rata penyewaan per jam, hari kerja berpuncak dua kali.",
    caption: "Pola penyewaan per jam.",
    rasio: "1005 / 548",   // isi dengan lebar/tinggi asli file
  },
],
```

`alt` wajib diisi begitu `src` diisi, dan `rasio` sebaiknya mengikuti ukuran
asli file supaya gambar tidak terpotong atau melar. Selama `src` masih `null`,
yang tampil adalah kotak placeholder dengan rasio yang sama.

Gambar ditampilkan di bagian ber-`id` `"visualisasi"`. Kalau entri Anda memakai
id lain, sebutkan lewat field `gambarDiBagian`.

Grafik yang lebar sulit dibaca di layar ponsel, jadi tiap gambar bisa diketuk
untuk dibuka pada ukuran aslinya di tab baru. Ini berjalan otomatis.

## Mengganti tampilan

- **Warna**: seluruh palet ada sebagai CSS variable di bagian atas
  `app/globals.css` (`:root` untuk mode terang, `[data-theme="dark"]` untuk mode
  gelap). Situs ini sengaja memakai satu warna aksen saja: `--warna-aksen`.
  Kalau menggantinya, pastikan kontras terhadap `--warna-latar` tetap minimal
  4.5:1 supaya memenuhi WCAG AA.
- **Font**: diatur di `app/layout.tsx` lewat `next/font`. Fraunces untuk judul,
  IBM Plex Sans untuk isi.
- **Mode gelap**: mengikuti preferensi sistem, dan bisa diganti manual lewat
  tombol di navigasi. Pilihan manual tersimpan di `localStorage`.

## Deploy ke Vercel

1. Push repositori ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new), pilih repositorinya, klik
   **Import**.
3. Vercel mendeteksi Next.js sendiri. Tidak ada pengaturan yang perlu diubah,
   dan tidak ada environment variable yang wajib diisi.
4. Klik **Deploy**.

Setelah dapat domain finalnya, isi URL itu di `content/situs.ts` (field `url`)
atau set environment variable `NEXT_PUBLIC_SITE_URL` di Vercel, supaya metadata
Open Graph dan `sitemap.xml` menunjuk ke alamat yang benar.

Setiap `git push` berikutnya akan otomatis di-deploy ulang.

Karena hasil build berupa file statis, situs ini juga bisa di-host di Netlify,
Cloudflare Pages, atau GitHub Pages dengan mengunggah isi folder `out/`.

---

## Daftar placeholder yang masih perlu diisi

Sisanya tinggal sedikit. Semua placeholder tampil mencolok di situs sebagai
kotak bergaris putus-putus bertuliskan "Belum diisi", jadi tidak akan lolos
tanpa disadari.

### 1. File CV

- [ ] Taruh `cv-sandhika-hamzah.pdf` di `/public`, lalu ubah `cv.tersedia`
      menjadi `true` di `content/situs.ts` supaya tombol "Unduh CV" di navigasi
      aktif. Sebelum itu, tombolnya tampil sebagai "CV (belum diunggah)".

### 2. Alamat situs

- [ ] `url` di `content/situs.ts` masih memakai alamat sementara
      `https://sandhika-hamzah.vercel.app`. Ganti setelah domain finalnya ada.
- [ ] Gambar Open Graph (opsional) — kalau ingin thumbnail saat link dibagikan,
      taruh `og.png` (1200×630) di `/public` lalu daftarkan di `lib/metadata.ts`.

### 3. Synthetic Store Indonesia

- [ ] **Analisis Lanjutan** — hasil model regresi di Orange Data Mining. Ini
      satu-satunya bagian yang datanya tidak ada di spreadsheet, jadi perlu
      dijalankan ulang atau dicari catatan metriknya.
- [ ] **Tautan versi online** — link spreadsheet Google Sheets dan dashboard
      Looker Studio yang bisa dibuka langsung. Versi unduhannya (XLSX dan PDF)
      sudah terpasang, tetapi link hidup lebih meyakinkan bagi recruiter.

### 4. Prediksi Dropout Mahasiswa

- [ ] **Rekomendasi** pada bagian Kesimpulan. Notebooknya berhenti di temuan dan
      tidak memuat rekomendasi, jadi bagian ini memang perlu ditulis manual:
      kapan mahasiswa berisiko mulai dihubungi, dan siapa yang menanganinya.

### 5. Capital Bikeshare

Tidak ada placeholder. Seluruh isinya sudah lengkap dari notebook.

---

## Catatan soal isi

Angka dan temuan di tiap studi kasus diambil langsung dari berkas kerjanya,
yaitu spreadsheet `synthetic-store-indonesia.xlsx` dan dua notebook Jupyter di
`/public/notebook/`. Kalau berkas sumbernya diperbarui, perbarui juga angkanya
di `content/entri.ts` supaya keduanya tidak berbeda.

### Yang sengaja tidak ada di situs ini

- Tableau dan Power BI, dalam bentuk apa pun. Keduanya memang belum pernah
  dipakai.
- Section "Pengalaman Kerja", magang, atau organisasi. Belum ada isinya, jadi
  sectionnya sekalian ditiadakan, bukan dibiarkan kosong.
- Pekerjaan rekayasa sistem dan data engineering. Dipindahkan keluar dari situs
  ini sesuai keputusan pemilik situs.
- Klaim bahwa sertifikat BNSP sudah terbit. Statusnya ditulis apa adanya:
  dinyatakan kompeten, sertifikat masih dalam proses penerbitan.
