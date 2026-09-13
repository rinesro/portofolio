# Portofolio Sandhika Hamzah

Situs portofolio pribadi untuk melamar posisi **data analyst** (jalur utama)
dan **data engineer** (jalur kedua). Dibuat dengan Next.js App Router,
TypeScript, dan Tailwind CSS, tanpa database dan tanpa CMS.

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

| Perintah            | Fungsi                                                        |
| ------------------- | ------------------------------------------------------------- |
| `npm run build`     | Membangun situs statis ke folder `out/`                        |
| `npm run lint`      | Memeriksa gaya penulisan kode                                  |
| `npm run typecheck` | Memeriksa kesalahan TypeScript                                 |

Situs ini memakai **static export** (`output: "export"` di `next.config.ts`).
Hasil `npm run build` adalah HTML statis biasa, tidak butuh server Node.

## Isi folder `/content`

| File          | Isinya                                                        |
| ------------- | ------------------------------------------------------------- |
| `profil.ts`   | Nama, kontak, perkenalan, cara kerja, pendidikan, sertifikasi  |
| `keahlian.ts` | Kelompok keahlian dan pembagiannya per halaman                |
| `jalur.ts`    | Dua jalur karier beserta teks pembukanya                      |
| `entri.ts`    | Semua studi kasus dan proyek                                  |
| `situs.ts`    | Judul situs, deskripsi, URL, dan pengaturan tombol CV          |
| `types.ts`    | Definisi tipe data. Baca ini kalau ragu field apa yang tersedia |

### Aturan penamaan

- **Studi kasus**: pekerjaan yang dikerjakan sendiri tanpa klien.
- **Proyek**: hanya untuk pekerjaan dengan klien atau pengguna nyata, dan skripsi.

Bedanya diatur lewat field `jenis` pada tiap entri (`"studi-kasus"` atau
`"proyek"`). Label pada kartu dan halaman detail ikut field ini.

## Menambah studi kasus baru

Tambahkan satu objek baru ke array `entri` di `content/entri.ts`. Halaman
detailnya, entri di halaman jalur, sitemap, dan metadata Open Graph akan
terbentuk sendiri.

```ts
{
  slug: "nama-di-url",              // halaman jadi /studi-kasus/nama-di-url/
  judul: "Judul Lengkap Pekerjaan",
  masalahSingkat: "Satu kalimat masalah yang dijawab. Tampil di kartu daftar.",
  jenis: "studi-kasus",             // atau "proyek"
  struktur: "analisis",             // atau "rekayasa"
  tahun: "2026",
  jalur: ["data-analyst"],          // entri hanya muncul di jalur yang disebut
  sorotan: ["data-analyst"],        // beri badge "Sorotan utama", boleh []
  ringkasan: {
    masalah: "Satu sampai dua kalimat.",
    pendekatan: "Satu sampai dua kalimat.",
    hasil: null,                    // null = tampil sebagai placeholder
  },
  tools: ["SQL", "Looker Studio"],
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
menentukan urutannya. Dua pola yang dipakai sekarang:

- `struktur: "analisis"` — Latar Belakang, Pertanyaan SMART, Data Wrangling,
  Eksplorasi Data, Visualisasi, Kesimpulan dan Rekomendasi.
- `struktur: "rekayasa"` — Latar Belakang, Perancangan Data, Implementasi,
  Kendala dan Solusinya, Hasil.

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

Pertanyaan SMART sebaiknya memakai `daftar-nomor` supaya tampil sebagai daftar
bernomor yang menonjol, bukan paragraf.

### Menambahkan gambar

1. Taruh file di `/public`, misalnya
   `public/studi-kasus/synthetic-store/dashboard.png`.
2. Isi field `gambar` pada entri:

```ts
gambar: [
  {
    src: "/studi-kasus/synthetic-store/dashboard.png",
    alt: "Dashboard Looker Studio menampilkan penjualan per kategori produk",
    caption: "Dashboard untuk memantau penjualan dan keuntungan.",
    rasio: "16 / 9",
  },
],
```

`alt` wajib diisi begitu `src` diisi. Selama `src` masih `null`, yang tampil
adalah kotak placeholder dengan rasio yang sama, jadi tata letak tidak bergeser
saat gambar aslinya dipasang.

Gambar ditampilkan di bagian ber-`id` `"visualisasi"`. Kalau entri Anda memakai
id lain, sebutkan lewat field `gambarDiBagian`, misalnya
`gambarDiBagian: "implementasi"`.

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

Semua placeholder tampil mencolok di situs sebagai kotak bergaris putus-putus
bertuliskan "Belum diisi", jadi tidak akan lolos tanpa disadari. Berikut
daftar lengkapnya.

### 1. File di `/public`

- [ ] `cv-sandhika-hamzah.pdf` — setelah diunggah, ubah `cv.tersedia` menjadi
      `true` di `content/situs.ts` supaya tombol "Unduh CV" di navigasi aktif.
      Sebelum itu, tombolnya tampil sebagai "CV (belum diunggah)".
- [ ] Gambar Open Graph (opsional) — kalau ingin thumbnail saat link dibagikan,
      taruh `og.png` (1200×630) di `/public` lalu daftarkan di `lib/metadata.ts`.

### 2. Alamat situs

- [ ] `url` di `content/situs.ts` masih memakai alamat sementara
      `https://sandhika-hamzah.vercel.app`. Ganti setelah domain finalnya ada.

### 3. Synthetic Store Indonesia (`content/entri.ts`)

- [ ] **Pertanyaan SMART** — 3 sampai 5 pertanyaan yang benar-benar dijawab.
- [ ] **Kesimpulan dan Rekomendasi** — temuan utama dan rekomendasinya.
- [ ] **Ringkasan → hasil** — satu sampai dua kalimat hasilnya.
- [ ] **Tautan** — link spreadsheet Google Sheets dan dashboard Looker Studio.
- [ ] **3 gambar** — data sebelum/sesudah dibersihkan, dashboard Looker Studio,
      hasil model regresi di Orange.

### 4. Prediksi Dropout Mahasiswa, Jaya Jaya Institut

- [ ] **Pertanyaan SMART**.
- [ ] **Pemodelan** — algoritma yang dipakai dan metrik hasilnya (akurasi atau
      F1 score). Tulis angka yang sebenarnya saja.
- [ ] **Kesimpulan** — rangkuman rekomendasinya.
- [ ] **Ringkasan → hasil**.
- [ ] **Tools** — lengkapi setelah algoritmanya ditulis.
- [ ] **1 gambar** — visualisasi faktor yang paling berkaitan dengan dropout.

### 5. Analisis Penggunaan Layanan Capital Bikeshare

- [ ] **Pertanyaan SMART** — atau hapus bagian itu dari `content/entri.ts`
      kalau analisis ini memang tidak memakainya.
- [ ] **Kesimpulan**.
- [ ] **Ringkasan → hasil**.
- [ ] **Tools** — belum ada satu pun yang dicantumkan.
- [ ] **1 gambar** — visualisasi pola permintaan.

### 6. EnergiCerdas AI

- [ ] **Perancangan Data** — sumber data konsumsi dan fitur yang dibentuk.
- [ ] **Kendala dan Solusinya**.
- [ ] **Tools** — baru LightGBM yang tercantum.
- [ ] **1 gambar** — tampilan platformnya.

### 7. Sistem Inventaris dan Aset, Kelurahan Gedong

- [ ] **Kendala dan Solusinya**.
- [ ] **Hasil**.
- [ ] **Ringkasan → hasil**.
- [ ] **1 gambar** — tangkapan layar sistem. **Gunakan data demo saja**, jangan
      data asli kelurahan.

### 8. SBM-NAC

- [ ] **Latar Belakang** — konteks dan masalah yang melatarbelakangi sistem ini.
- [ ] **Kendala dan Solusinya**.

### 9. Teks pembuka jalur Data Engineer

File konten aslinya menyebut jalur ini "isinya lebih sedikit daripada jalur
analis". Setelah semua entri dimasukkan, jumlahnya ternyata sama, tiga lawan
tiga, jadi kalimat itu tidak dipakai supaya situs tidak memuat klaim yang tidak
sesuai kenyataan. Kalau nanti jumlahnya berubah, sesuaikan teks `pembuka` pada
`content/jalur.ts`.

---

## Yang sengaja tidak ada di situs ini

Supaya tidak dimasukkan lagi tanpa sengaja:

- Tableau dan Power BI, dalam bentuk apa pun. Keduanya memang belum pernah
  dipakai.
- Section "Pengalaman Kerja", magang, atau organisasi. Belum ada isinya, jadi
  sectionnya sekalian ditiadakan, bukan dibiarkan kosong.
- Data asli milik Kelurahan Gedong.
- Klaim bahwa sertifikat BNSP sudah terbit. Statusnya ditulis apa adanya:
  dinyatakan kompeten, sertifikat masih dalam proses penerbitan.
