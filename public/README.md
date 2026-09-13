# Folder /public

Semua file statis diletakkan di sini dan bisa diakses lewat path root.
Contoh: file `public/cv-sandhika-hamzah.pdf` diakses sebagai
`/cv-sandhika-hamzah.pdf`.

Yang perlu ditaruh di sini:

1. `cv-sandhika-hamzah.pdf` — setelah file ada, ubah `cv.tersedia` menjadi
   `true` di `content/situs.ts` supaya tombol unduh CV aktif.
2. Screenshot untuk studi kasus. Disarankan dikelompokkan per entri, misalnya
   `public/studi-kasus/synthetic-store-indonesia/dashboard.png`, lalu isi
   `src` dan `alt` pada field `gambar` di `content/entri.ts`.
