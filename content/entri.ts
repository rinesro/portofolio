import type { Entri, TrackSlug } from "./types";

/**
 * Setiap entri hanya tampil di halaman jalur yang disebut pada field `jalur`.
 * Jangan menambahkan jalur hanya supaya sebuah halaman terlihat lebih penuh.
 */
export const entri: Entri[] = [
  {
    slug: "synthetic-store-indonesia",
    judul: "Synthetic Store Indonesia, Analisis Penjualan Ritel",
    masalahSingkat:
      "Data transaksi ritel mentah penuh duplikasi dan label kategori yang tidak konsisten, sehingga laporan penjualan yang dibuat di atasnya menyesatkan.",
    jenis: "studi-kasus",
    struktur: "analisis",
    tahun: "2026",
    jalur: ["data-analyst"],
    sorotan: ["data-analyst"],
    ringkasan: {
      masalah:
        "Data transaksi ritel mentah belum siap dianalisis: ada duplikasi, label kategori yang tidak konsisten, dan nilai kosong.",
      pendekatan:
        "Pembersihan dan penyeragaman di Google Sheets, menjawab pertanyaan bisnis dengan logika SQL dan formula query, lalu memantau penjualan dan keuntungan lewat dashboard Looker Studio.",
      hasil: null,
    },
    tools: ["Google Sheets", "SQL", "Looker Studio", "Orange Data Mining"],
    tautan: [
      { label: "Spreadsheet Google Sheets", href: null },
      { label: "Dashboard Looker Studio", href: null },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Data transaksi ritel mentah yang belum siap dianalisis: ada duplikasi, label kategori yang tidak konsisten, dan nilai kosong. Tanpa pembersihan, laporan penjualan dan keuntungan yang dihasilkan akan menyesatkan.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis 3 sampai 5 pertanyaan SMART yang benar-benar dijawab dalam analisis ini. Contoh bentuknya: kategori produk mana yang menyumbang keuntungan terbesar, berapa selisihnya dengan kategori terendah, dan tindakan apa yang disarankan.",
          },
        ],
      },
      {
        id: "data-wrangling",
        judul: "Data Wrangling",
        blok: [
          {
            kind: "paragraf",
            teks: "Pembersihan dan penyeragaman dilakukan di Google Sheets: menangani duplikasi, menyamakan label kategori yang tidak konsisten, dan menangani nilai kosong.",
          },
        ],
      },
      {
        id: "eksplorasi-data",
        judul: "Eksplorasi Data",
        blok: [
          {
            kind: "paragraf",
            teks: "Pertanyaan bisnis seputar penjualan, keuntungan, dan performa produk dijawab menggunakan logika SQL dan formula query pada spreadsheet.",
          },
        ],
      },
      {
        id: "visualisasi",
        judul: "Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Dashboard Looker Studio untuk memantau penjualan dan keuntungan, lalu diekspor menjadi laporan siap presentasi.",
          },
        ],
      },
      {
        id: "analisis-lanjutan",
        judul: "Analisis Lanjutan",
        blok: [
          {
            kind: "paragraf",
            teks: "Analisis prediktif regresi terhadap keuntungan menggunakan Orange Data Mining, dengan alur kerja yang didokumentasikan agar bisa direproduksi.",
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis temuan utama dan rekomendasinya, sebagai jawaban atas pertanyaan SMART di atas.",
          },
        ],
      },
    ],
    gambar: [
      {
        src: null,
        alt: "",
        caption: "Data sebelum dan sesudah dibersihkan.",
        rasio: "16 / 9",
      },
      {
        src: null,
        alt: "",
        caption:
          "Dashboard Looker Studio untuk memantau penjualan dan keuntungan.",
        rasio: "16 / 9",
      },
      {
        src: null,
        alt: "",
        caption: "Hasil model regresi di Orange Data Mining.",
        rasio: "16 / 9",
      },
    ],
  },

  {
    slug: "prediksi-dropout-jaya-jaya-institut",
    judul: "Prediksi Dropout Mahasiswa, Jaya Jaya Institut",
    masalahSingkat:
      "Sebuah institusi pendidikan perlu tahu faktor apa yang paling berkaitan dengan tingginya angka dropout agar bisa melakukan intervensi lebih awal.",
    jenis: "studi-kasus",
    struktur: "analisis",
    tahun: "2025",
    jalur: ["data-analyst"],
    sorotan: ["data-analyst"],
    ringkasan: {
      masalah:
        "Angka dropout mahasiswa tinggi, tetapi institusi belum tahu faktor apa yang paling berkaitan dengannya.",
      pendekatan:
        "Eksplorasi dan pembersihan data akademik serta demografi mahasiswa dengan Python dan pandas, lalu membangun model klasifikasi untuk memprediksi kemungkinan dropout.",
      hasil: null,
    },
    tools: ["Python", "pandas"],
    toolsPlaceholder:
      "Lengkapi dengan library pemodelan yang dipakai, setelah algoritmanya ditulis di bagian Pemodelan.",
    tautan: [
      {
        label: "Repositori GitHub",
        href: "https://github.com/rinesro/jaya-jaya-dropout-prediction",
      },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Sebuah institusi pendidikan menghadapi angka dropout mahasiswa yang tinggi dan perlu tahu faktor apa yang paling berkaitan dengannya agar bisa melakukan intervensi lebih awal.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis 3 sampai 5 pertanyaan SMART yang dijawab analisis ini.",
          },
        ],
      },
      {
        id: "data-wrangling",
        judul: "Data Wrangling dan Eksplorasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Eksplorasi dan pembersihan data akademik serta demografi mahasiswa menggunakan Python dan pandas untuk menemukan faktor yang paling berkaitan dengan dropout.",
          },
        ],
      },
      {
        id: "pemodelan",
        judul: "Pemodelan",
        blok: [
          {
            kind: "paragraf",
            teks: "Model klasifikasi dibangun untuk memprediksi kemungkinan dropout.",
          },
          {
            kind: "placeholder",
            petunjuk:
              "Sebutkan algoritma yang dipakai dan metrik hasilnya, misalnya akurasi atau F1 score. Tulis angka yang sebenarnya saja.",
          },
        ],
      },
      {
        id: "visualisasi",
        judul: "Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Slot gambar di bawah disediakan untuk visualisasi faktor yang paling berkaitan dengan dropout.",
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Temuan disajikan dalam bentuk rekomendasi bisnis bagi institusi.",
          },
          { kind: "placeholder", petunjuk: "Rangkum rekomendasinya." },
        ],
      },
    ],
    gambar: [
      {
        src: null,
        alt: "",
        caption:
          "Visualisasi faktor yang paling berkaitan dengan dropout mahasiswa.",
        rasio: "16 / 9",
      },
    ],
  },

  {
    slug: "capital-bikeshare",
    judul: "Analisis Penggunaan Layanan Capital Bikeshare",
    masalahSingkat:
      "Pola permintaan layanan sepeda berbagi belum terbaca dari data perjalanan mentah selama beberapa tahun.",
    jenis: "studi-kasus",
    struktur: "analisis",
    tahun: "2025",
    jalur: ["data-analyst"],
    sorotan: [],
    ringkasan: {
      masalah:
        "Data perjalanan layanan sepeda berbagi selama beberapa tahun belum memberi gambaran soal pola permintaan.",
      pendekatan:
        "Exploratory data analysis menyeluruh, dengan visualisasi pola permintaan berdasarkan musim, cuaca, dan tipe pengguna.",
      hasil: null,
    },
    tools: [],
    toolsPlaceholder:
      "Tulis tools yang dipakai pada analisis ini, sesuai isi repositorinya.",
    tautan: [
      {
        label: "Repositori GitHub",
        href: "https://github.com/rinesro/bike-sharing-analysis",
      },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Data perjalanan layanan sepeda berbagi selama beberapa tahun dianalisis untuk memahami pola permintaan.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis pertanyaan SMART yang dijawab analisis ini, atau hapus bagian ini dari file konten kalau memang tidak ada.",
          },
        ],
      },
      {
        id: "eksplorasi-data",
        judul: "Eksplorasi Data dan Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Exploratory data analysis menyeluruh, dengan visualisasi pola permintaan berdasarkan musim, cuaca, dan tipe pengguna.",
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          { kind: "placeholder", petunjuk: "Tulis kesimpulan analisis ini." },
        ],
      },
    ],
    gambar: [
      {
        src: null,
        alt: "",
        caption:
          "Visualisasi pola permintaan berdasarkan musim, cuaca, dan tipe pengguna.",
        rasio: "16 / 9",
      },
    ],
  },

  {
    slug: "energicerdas-ai",
    judul:
      "EnergiCerdas AI, Platform Rekomendasi Konsumsi Energi Rumah Tangga",
    masalahSingkat:
      "Rumah tangga sulit mengetahui perangkat mana yang paling membebani tagihan listrik dan kapan sebaiknya dipakai.",
    jenis: "proyek",
    struktur: "rekayasa",
    tahun: "2026",
    jalur: ["data-engineer"],
    sorotan: [],
    ringkasan: {
      masalah:
        "Rumah tangga sulit mengetahui perangkat mana yang paling membebani tagihan listrik dan kapan sebaiknya dipakai.",
      pendekatan:
        "Memproses data konsumsi listrik menjadi fitur untuk model, lalu menggabungkan classifier fleksibilitas perangkat dengan optimizer penjadwalan untuk menghasilkan rekomendasi penghematan.",
      hasil:
        "Classifier LightGBM mencapai akurasi 97,93 persen, dibandingkan 61,67 persen pada sistem berbasis aturan yang dipakai sebagai fallback. Suite pengujian otomatis lolos 20 dari 20 kasus.",
    },
    tools: ["LightGBM"],
    toolsPlaceholder:
      "Lengkapi dengan tools lain yang dipakai, misalnya bahasa dan library pendukungnya.",
    tautan: [
      { label: "Demo langsung", href: "https://project-multiai.vercel.app" },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Rumah tangga sulit mengetahui perangkat mana yang paling membebani tagihan listrik dan kapan sebaiknya dipakai. Platform ini memetakan profil konsumsi listrik dan menghasilkan rekomendasi penghematan.",
          },
          {
            kind: "catatan",
            teks: "Ini skripsi, dengan Pak Singgih sebagai dosen pembimbing.",
          },
        ],
      },
      {
        id: "perancangan-data",
        judul: "Perancangan Data",
        blok: [
          {
            kind: "paragraf",
            teks: "Data konsumsi listrik diproses menjadi fitur untuk model, bukan diolah sebagai pekerjaan analisis. Seluruh perhitungan didasarkan pada tarif PLN dan acuan energi nasional yang terpublikasi.",
          },
          {
            kind: "placeholder",
            petunjuk:
              "Jelaskan sumber data konsumsi dan fitur apa saja yang dibentuk darinya.",
          },
        ],
      },
      {
        id: "implementasi",
        judul: "Implementasi",
        blok: [
          {
            kind: "daftar",
            item: [
              "Classifier LightGBM untuk menentukan fleksibilitas perangkat, dengan sistem berbasis aturan sebagai fallback.",
              "Optimizer penjadwalan greedy dengan batas pengurangan 50 persen dan langkah waktu 0,5 jam.",
              "Suite pengujian otomatis untuk menjaga hasil tetap konsisten.",
            ],
          },
        ],
      },
      {
        id: "kendala",
        judul: "Kendala dan Solusinya",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis kendala nyata yang muncul selama pengerjaan dan bagaimana diselesaikan.",
          },
        ],
      },
      {
        id: "hasil",
        judul: "Hasil",
        blok: [
          {
            kind: "daftar",
            item: [
              "Akurasi classifier LightGBM 97,93 persen, dibandingkan 61,67 persen pada sistem berbasis aturan sebagai fallback.",
              "Suite pengujian otomatis lolos 20 dari 20 kasus.",
            ],
          },
        ],
      },
    ],
    gambar: [
      {
        src: null,
        alt: "",
        caption: "Tampilan platform EnergiCerdas AI.",
        rasio: "16 / 9",
      },
    ],
    gambarDiBagian: "implementasi",
  },

  {
    slug: "inventaris-aset-kelurahan-gedong",
    judul: "Sistem Manajemen Inventaris dan Aset, Kelurahan Gedong",
    masalahSingkat:
      "Kantor kelurahan membutuhkan pencatatan pergerakan stok dan pelacakan aset yang sesuai aturan pengelolaan Barang Milik Daerah.",
    jenis: "proyek",
    struktur: "rekayasa",
    tahun: "2025",
    jalur: ["data-engineer"],
    sorotan: ["data-engineer"],
    ringkasan: {
      masalah:
        "Kantor kelurahan membutuhkan sistem pencatatan pergerakan stok dan pelacakan aset yang sesuai dengan aturan pengelolaan Barang Milik Daerah.",
      pendekatan:
        "Memetakan proses bisnis yang berjalan lebih dulu, menyelaraskan siklus hidup aset dengan Permendagri, lalu membangun sistemnya dengan Next.js, Prisma ORM, dan PostgreSQL.",
      hasil: null,
    },
    tools: [
      "Next.js (App Router)",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
    ],
    tautan: [
      { label: "Repositori GitHub", href: "https://github.com/rinesro/web-warehouse" },
      {
        label: "Demo",
        href: "https://source-code-web-pergudangan.vercel.app/",
      },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Kantor kelurahan membutuhkan sistem pencatatan pergerakan stok dan pelacakan aset yang sesuai dengan aturan pengelolaan Barang Milik Daerah.",
          },
        ],
      },
      {
        id: "peran",
        judul: "Peran",
        blok: [
          {
            kind: "paragraf",
            teks: "Project manager sekaligus developer. Atas arahan dosen pembimbing, saya tetap terlibat langsung di seluruh tahap pengembangan, bukan hanya koordinasi.",
          },
        ],
      },
      {
        id: "perancangan-data",
        judul: "Perancangan Data",
        blok: [
          {
            kind: "daftar",
            item: [
              "Pemetaan proses bisnis yang berjalan dilakukan lebih dulu sebelum merancang basis data.",
              "Siklus hidup aset diselaraskan dengan Permendagri No. 19/2016 beserta pembaruannya No. 7/2024 tentang Barang Milik Daerah.",
              "Penggalian kebutuhan dilakukan langsung dengan pengguna di kelurahan.",
            ],
          },
        ],
      },
      {
        id: "implementasi",
        judul: "Implementasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Dibangun dengan Next.js (App Router), TypeScript, Prisma ORM, PostgreSQL, dan NextAuth.",
          },
          {
            kind: "catatan",
            teks: "Akun dan basis data demo terpisah sepenuhnya dari yang dipakai Kelurahan Gedong untuk operasional. Tidak ada data asli kelurahan yang ditampilkan di sini.",
          },
        ],
      },
      {
        id: "kendala",
        judul: "Kendala dan Solusinya",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis kendala nyata selama pengerjaan dan bagaimana diselesaikan.",
          },
        ],
      },
      {
        id: "hasil",
        judul: "Hasil",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis hasil yang benar-benar terukur atau terpakai di kelurahan.",
          },
        ],
      },
    ],
    gambar: [
      {
        src: null,
        alt: "",
        caption:
          "Tangkapan layar sistem. Gunakan data demo saja, bukan data asli kelurahan.",
        rasio: "16 / 9",
      },
    ],
    gambarDiBagian: "implementasi",
  },

  {
    slug: "sbm-nac",
    judul: "SBM-NAC, Sistem Kontrol Akses Jaringan",
    masalahSingkat:
      "Akses perangkat ke jaringan perlu dikendalikan lewat sesi sementara dan blocklist, bukan pendaftaran manual satu per satu.",
    jenis: "studi-kasus",
    struktur: "rekayasa",
    tahun: "2025",
    jalur: ["data-engineer"],
    sorotan: [],
    ringkasan: {
      masalah:
        "Akses perangkat ke jaringan perlu dikendalikan dengan registrasi mandiri, sesi perangkat sementara, dan blocklist.",
      pendekatan:
        "Monorepo Next.js 15 dan Express.js dengan PostgreSQL, Socket.io, Prisma ORM, serta JWT dengan rotasi refresh token.",
      hasil:
        "Makalah akademik dalam format dua kolom IEEE, ditulis bersama Gerry Stefanus sebagai penulis kedua.",
    },
    tools: [
      "Next.js 15",
      "Express.js",
      "PostgreSQL (Neon)",
      "Prisma ORM",
      "Socket.io",
      "JWT",
    ],
    tautan: [],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis konteks dan masalah yang melatarbelakangi sistem ini.",
          },
        ],
      },
      {
        id: "perancangan-data",
        judul: "Perancangan Data",
        blok: [
          {
            kind: "daftar",
            item: [
              "PostgreSQL (Neon) dengan Prisma ORM sebagai lapisan akses data.",
              "Model sesi perangkat sementara yang terhapus otomatis setelah 30 menit.",
              "Blocklist fingerprint permanen.",
            ],
          },
        ],
      },
      {
        id: "implementasi",
        judul: "Implementasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Monorepo Next.js 15 dan Express.js dengan Socket.io serta JWT dengan rotasi refresh token.",
          },
          {
            kind: "daftar",
            item: [
              "Registrasi mandiri untuk perangkat.",
              "Endpoint login terpadu.",
            ],
          },
        ],
      },
      {
        id: "kendala",
        judul: "Kendala dan Solusinya",
        blok: [
          {
            kind: "placeholder",
            petunjuk:
              "Tulis kendala nyata selama pengerjaan dan bagaimana diselesaikan.",
          },
        ],
      },
      {
        id: "hasil",
        judul: "Hasil",
        blok: [
          {
            kind: "paragraf",
            teks: "Makalah akademik dalam format dua kolom IEEE, ditulis bersama Gerry Stefanus sebagai penulis kedua.",
          },
        ],
      },
    ],
    gambar: [],
  },
];

export function entriPerJalur(slug: TrackSlug): Entri[] {
  return entri
    .filter((e) => e.jalur.includes(slug))
    .sort((a, b) => {
      const sorotanA = a.sorotan.includes(slug) ? 1 : 0;
      const sorotanB = b.sorotan.includes(slug) ? 1 : 0;
      if (sorotanA !== sorotanB) return sorotanB - sorotanA;
      return Number(b.tahun) - Number(a.tahun);
    });
}

export function ambilEntri(slug: string): Entri | undefined {
  return entri.find((e) => e.slug === slug);
}
