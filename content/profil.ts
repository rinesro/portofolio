export const profil = {
  nama: "Sandhika Hamzah",
  panggilan: "Dika",
  lokasi: "Depok, Jawa Barat",
  email: "sanvinzah@gmail.com",
  telepon: "081222532975",
  linkedin: "https://linkedin.com/in/sandhika-hamzah-24a31b266",
  github: "https://github.com/rinesro",

  /** Satu kalimat posisi yang dicari. */
  posisi: "Mencari posisi data analyst, terutama magang data analyst.",

  perkenalan:
    "Fresh graduate S1 Informatika Universitas Gunadarma dengan IPK 3.76 dari 4.00 yang fokus di analisis data. Terbiasa mengambil data dengan SQL, membersihkan dan memvalidasinya dengan Python atau spreadsheet, merekonsiliasi data dari beberapa sumber, lalu menyajikannya sebagai dashboard dan laporan rutin yang siap dibaca. Setiap tahap didokumentasikan agar bisa diulang orang lain. Latar belakang membangun sistem membuat saya paham dari mana data berasal dan mengapa data bisa kotor, bukan hanya cara menganalisisnya.",

  /** Bagian "Cara Saya Mengerjakan Analisis" di halaman Tentang Saya. */
  caraKerja: [
    "Memahami pertanyaan bisnisnya lebih dulu.",
    "Memeriksa kualitas dan struktur data.",
    "Membersihkan serta merekonsiliasi sumber yang berbeda.",
    "Mengeksplorasi untuk mencari pola.",
    "Memvisualisasikan seperlunya.",
    "Menutup dengan rekomendasi yang bisa ditindaklanjuti.",
  ],
  caraKerjaCatatan:
    "Dokumentasi dibuat sepanjang proses, bukan di akhir.",

  pendidikan: {
    institusi: "Universitas Gunadarma, Depok",
    periode: "2022 sampai 2026",
    program: "S1 Informatika (nomenklatur sebelumnya Teknik Informatika)",
    ipk: "3.76 / 4.00",
    catatan:
      "Status kelulusan tercatat di PDDikti semester 2025/2026 Genap.",
    mataKuliah: [
      "Sistem Basis Data",
      "Data Mining",
      "Statistika dan Probabilitas",
      "Machine Learning",
      "Algoritma dan Struktur Data",
      "Jaringan Komputer",
    ],
  },

  sertifikasi: [
    {
      nama: "IDCamp 2025, Data Scientist Expert Level",
      keterangan: "Predikat Outstanding.",
    },
    {
      nama: "Uji kompetensi BNSP Data Engineering",
      keterangan:
        "Dinyatakan kompeten. Sertifikat masih dalam proses penerbitan.",
    },
    {
      nama: "Dicoding, Belajar Data Analisis untuk Pemula",
      keterangan: "",
    },
  ],
} as const;
