import type { Entri } from "./types";

/**
 * Seluruh isi studi kasus di bawah ini diambil dari berkas kerja aslinya:
 * spreadsheet Google Sheets untuk Synthetic Store Indonesia, dan notebook
 * Jupyter untuk dua studi kasus lainnya. Angka hanya boleh diubah kalau
 * berkas sumbernya ikut berubah.
 */
export const entri: Entri[] = [
  {
    slug: "synthetic-store-indonesia",
    judul: "Synthetic Store Indonesia, Analisis Penjualan Ritel",
    masalahSingkat:
      "Data transaksi ritel mentah penuh duplikasi, kota yang tidak konsisten, dan tanggal pengiriman kosong, sehingga laporan penjualan yang dibuat di atasnya menyesatkan.",
    jenis: "studi-kasus",
    tahun: "2026",
    sorotan: true,
    ringkasan: {
      masalah:
        "Data transaksi ritel 2014–2017 belum siap dianalisis: ada 417 baris duplikat, kolom kota dengan variasi kapitalisasi dan nilai kosong, serta tanggal pengiriman yang tidak lengkap.",
      pendekatan:
        "Pembersihan dan penyeragaman di Google Sheets memakai kolom turunan yang bisa diverifikasi ulang, menjawab pertanyaan bisnis dengan formula query, lalu memantau hasilnya lewat dashboard Looker Studio.",
      hasil:
        "Data bersih menyisakan 10.076 dari 10.493 baris dengan seluruh kolom kunci terisi penuh. Dashboard menunjukkan penjualan yang tumbuh sepanjang 2014–2017, dengan November sebagai bulan tertinggi dan wilayah Central menyumbang 38,4 persen pesanan.",
    },
    tools: ["Google Sheets", "SQL", "Looker Studio", "Orange Data Mining"],
    berkas: [
      {
        label: "Spreadsheet pembersihan dan analisis",
        path: "/dokumen/synthetic-store-indonesia.xlsx",
        keterangan:
          "XLSX. Berisi data mentah, kolom hasil pembersihan, catatan tiap langkah, dan sheet jawaban tiap pertanyaan.",
      },
      {
        label: "Dashboard penjualan",
        path: "/dokumen/dashboard-penjualan-super-market-indonesia.pdf",
        keterangan: "PDF, 2 halaman. Ekspor dashboard beserta insight dan sarannya.",
      },
    ],
    tautan: [
      {
        label: "Spreadsheet pembersihan dan analisis (Google Sheets)",
        href: "https://docs.google.com/spreadsheets/d/1AmI79UeT6z-amRZiLrSEJL_v3ov2Xi-ZlkdH00Opzik/edit?usp=sharing",
      },
      {
        label: "Dashboard penjualan (Looker Studio)",
        href: "https://datastudio.google.com/reporting/ff430b20-a3f4-4b9f-b7fb-f9382f9a5d3d",
      },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Data transaksi ritel mentah yang belum siap dianalisis: ada duplikasi, label yang tidak konsisten, dan nilai kosong. Tanpa pembersihan, laporan penjualan yang dihasilkan akan menyesatkan.",
          },
          {
            kind: "paragraf",
            teks: "Datanya berisi 10.493 baris transaksi Super Market Indonesia periode 2014 sampai 2017, mencakup identitas pesanan, pelanggan, kota dan provinsi, wilayah, kategori produk, metode pengiriman, serta nilai penjualan.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "daftar-nomor",
            item: [
              "Berapa total penjualan, bukan keuntungan, sepanjang tahun 2016?",
              "Berapa total kuantitas produk yang terjual sepanjang tahun 2016?",
              "Berapa jumlah pemesanan dengan metode pengiriman First Class pada periode 2014 sampai 2017?",
              "Berapa jumlah pelanggan di setiap kota?",
              "Berapa rata-rata nilai penjualan per transaksi di setiap kota sepanjang 2014 sampai 2017?",
              "Berapa jumlah transaksi untuk tiap hari dalam seminggu, Senin sampai Minggu?",
              "Lima produk mana yang penjualannya tertinggi sepanjang 2014 sampai 2017?",
            ],
          },
        ],
      },
      {
        id: "data-wrangling",
        judul: "Data Wrangling",
        blok: [
          {
            kind: "paragraf",
            teks: "Seluruh pembersihan dikerjakan di Google Sheets dan dicatat langkah demi langkah, supaya orang lain bisa menelusuri ulang keputusannya. Data asli tidak ditimpa; hasil pembersihan ditaruh di kolom turunan tersendiri.",
          },
          {
            kind: "daftar",
            item: [
              "Duplikat: 417 baris duplikat dibuang, dari 10.493 baris menjadi 10.076 baris. Duplikat ditentukan dengan membandingkan seluruh kolom, dengan kolom kota dibandingkan tanpa memedulikan huruf besar kecil, karena data yang sama muncul sebagai “Jakarta”, “JAKARTA”, dan “jakarta”.",
              "Tanggal: tanggal_pemesanan dan tanggal_pengiriman sudah bertipe tanggal di berkas asli. Diverifikasi lebih dulu, jadi tidak perlu dikonversi.",
              "Tanggal pengiriman kosong: diisi dengan tanggal pemesanan ditambah rata-rata lama pengiriman per metode, dihitung dari baris yang datanya lengkap lalu dibulatkan ke hari terdekat. Same Day sekitar 0 hari, First Class 2 hari, Second Class 3 hari, Standard Class 5 hari.",
              "Kota: karena kolom provinsi selalu terisi dan tiap provinsi hanya berelasi dengan satu kota, kolom kota bersih diturunkan lewat lookup provinsi ke kota untuk seluruh baris, sehingga hasilnya terisi penuh dan konsisten.",
              "Kode pos: diturunkan dengan cara yang sama, lewat lookup provinsi ke kode pos.",
              "Nilai penjualan: divalidasi dengan COUNTIF dan tidak ditemukan satu pun nilai nol setelah duplikat dibuang.",
            ],
          },
          {
            kind: "catatan",
            teks: "Spreadsheet-nya memuat blok verifikasi otomatis yang mengecek ulang empat hal setiap kali data berubah: jumlah baris setelah dedup harus 10.076, dan jumlah nilai kosong pada kolom kota bersih, kode pos bersih, serta tanggal pengiriman bersih harus nol.",
          },
        ],
      },
      {
        id: "eksplorasi-data",
        judul: "Eksplorasi Data",
        blok: [
          {
            kind: "paragraf",
            teks: "Tiap pertanyaan dijawab dengan formula query di atas data yang sudah bersih, dan jawabannya disimpan di sheet terpisah agar bisa diperiksa satu per satu.",
          },
          {
            kind: "daftar",
            item: [
              "Total penjualan sepanjang 2016 sebesar Rp9.246.372.270, dengan 9.936 unit produk terjual.",
              "Metode pengiriman First Class dipakai pada 1.548 pesanan sepanjang 2014 sampai 2017.",
              "Jumlah pelanggan paling banyak tercatat di Makassar (1.103) dan Surabaya (1.101), paling sedikit di Palembang (932).",
              "Rata-rata nilai penjualan per transaksi tertinggi ada di Balikpapan (Rp4.085.451) dan terendah di Bandung (Rp2.937.980).",
              "Senin adalah hari paling ramai dengan 1.887 transaksi, sedangkan Rabu paling sepi dengan 374 transaksi.",
              "Lima produk dengan penjualan tertinggi: Mesin Fotokopi 5577 (Rp923.997.360), Ordner Arsip A4 9062 (Rp411.800.760), Mesin Laminating 5722 (Rp339.577.200), Kursi Kantor 8559 (Rp328.058.640), dan Binder Kancing A4 9759 (Rp297.352.185).",
            ],
          },
        ],
      },
      {
        id: "visualisasi",
        judul: "Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Angka-angka di atas dituangkan ke dashboard Looker Studio supaya bisa dipantau rutin, lalu diekspor menjadi laporan siap presentasi. Tiap grafik diberi insight dan saran tindak lanjutnya langsung di dashboard.",
          },
        ],
      },
      {
        id: "analisis-lanjutan",
        judul: "Analisis Lanjutan",
        blok: [
          {
            kind: "paragraf",
            teks: "Analisis prediktif regresi terhadap keuntungan dikerjakan di Orange Data Mining, dengan alur kerja yang didokumentasikan agar bisa direproduksi. Dua model dibandingkan dengan kolom keuntungan sebagai target, yaitu Linear Regression dan Random Forest.",
          },
          {
            kind: "daftar",
            item: [
              "Pada widget Test and Score, Random Forest unggul di seluruh metrik: R\u00b2 0,505 berbanding 0,268, RMSE 2.456.515 berbanding 2.988.549, MAE 346.158 berbanding 875.248, dan sMAPE 39,36 berbanding 117,07.",
              "Pada widget Predictions, jaraknya makin lebar: Random Forest mencatat R\u00b2 0,904 dengan RMSE 1.083.216 dan MAE 155.800, sedangkan Linear Regression R\u00b2 0,390 dengan RMSE 2.727.401 dan MAE 844.527.",
              "Uji perbandingan model berdasarkan mean square error memberi Random Forest peluang 0,994 untuk lebih baik daripada Linear Regression.",
              "MAPE keluar tak hingga pada kedua model, sehingga perbandingan galat relatif memakai sMAPE.",
            ],
          },
          {
            kind: "paragraf",
            teks: "Selisih sebesar itu menunjukkan hubungan antara fitur dan keuntungan tidak cukup dijelaskan model linier, jadi model berbasis pohon lebih cocok untuk data ini. Keuntungan juga memuat nilai negatif, yang membuat metrik berbasis persentase seperti MAPE tidak bisa dipakai.",
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Setelah dibersihkan, data menjawab ketujuh pertanyaan di atas dan memunculkan lima hal yang bisa langsung ditindaklanjuti.",
          },
          {
            kind: "daftar",
            item: [
              "Penjualan tumbuh sepanjang 2014 sampai 2017 dengan lonjakan tertinggi menjelang akhir 2017. Stok dan kapasitas operasional sebaiknya disiapkan lebih awal menjelang kuartal keempat tiap tahun.",
              "November adalah bulan penjualan tertinggi, diikuti Desember, sejalan dengan musim belanja akhir tahun. Tambahan stok dan tenaga kerja paling tepat disiapkan pada Oktober sampai November.",
              "Wilayah Central menyumbang 38,4 persen pesanan, lebih dari dua kali lipat West yang paling sedikit (19,2 persen). Strategi pemasaran di West dan East perlu dievaluasi.",
              "Ketiga kategori produk berkontribusi cukup merata, Technology 36,3 persen, Furniture 32,3 persen, dan Office Supplies 31,4 persen, sehingga alokasi stok tidak perlu digeser besar-besaran antar kategori.",
              "Standard Class dipilih pada sekitar 6.000 pesanan, jauh melampaui tiga metode lain yang masing-masing di bawah 2.000. Potongan ongkos kirim bisa dipakai untuk mendorong pelanggan mencoba opsi yang lebih cepat.",
            ],
          },
        ],
      },
    ],
    gambar: [
      {
        src: "/gambar/synthetic-store-indonesia/tren-penjualan-2014-2017.png",
        alt: "Grafik garis penjualan bulanan dari Januari 2014 sampai Desember 2017, bergerak naik turun dengan puncak tertinggi mendekati 2 juta pada akhir 2017.",
        caption:
          "Tren penjualan bulanan 2014–2017. Naik turun tiap bulan, tetapi puncaknya makin tinggi dari tahun ke tahun.",
        rasio: "1590 / 460",
      },
      {
        src: "/gambar/synthetic-store-indonesia/proporsi-pesanan-per-wilayah.png",
        alt: "Diagram lingkaran proporsi jumlah pesanan per wilayah: Central 38,4 persen, South 21,6 persen, East 20,8 persen, West 19,2 persen.",
        caption:
          "Proporsi jumlah pesanan per wilayah. Central sendirian menyumbang 38,4 persen, hampir dua kali lipat West.",
        rasio: "745 / 425",
      },
      {
        src: "/gambar/synthetic-store-indonesia/proporsi-penjualan-per-kategori.png",
        alt: "Diagram lingkaran proporsi penjualan per kategori produk: Technology 36,3 persen, Furniture 32,3 persen, Office Supplies 31,4 persen.",
        caption:
          "Proporsi penjualan per kategori produk. Ketiganya berimbang, tidak ada yang mendominasi.",
        rasio: "755 / 425",
      },
      {
        src: "/gambar/synthetic-store-indonesia/kota-dengan-penjualan-tertinggi.png",
        alt: "Diagram batang total penjualan sepuluh kota, dari Balikpapan sekitar 4,1 juta sampai Bandung sekitar 2,8 juta.",
        caption:
          "Total penjualan per kota. Balikpapan teratas, Bandung terbawah, dengan selisih yang cukup besar.",
        rasio: "1250 / 485",
      },
      {
        src: "/gambar/synthetic-store-indonesia/metode-pengiriman-paling-sering.png",
        alt: "Diagram batang jumlah pesanan per metode pengiriman: Standard Class sekitar 6.000, Second Class dan First Class di bawah 2.000, Same Day paling sedikit.",
        caption:
          "Metode pengiriman yang paling sering dipakai. Standard Class jauh meninggalkan tiga opsi lainnya.",
        rasio: "785 / 475",
      },
      {
        src: "/gambar/synthetic-store-indonesia/bulan-dengan-penjualan-tertinggi.png",
        alt: "Diagram batang penjualan per bulan sepanjang 2014 sampai 2017, diurutkan dari November yang tertinggi sampai Februari yang terendah.",
        caption:
          "Penjualan per bulan sepanjang 2014–2017. November dan Desember memimpin, sejalan dengan musim belanja akhir tahun.",
        rasio: "805 / 475",
      },
    ],
  },

  {
    slug: "prediksi-dropout-jaya-jaya-institut",
    judul: "Prediksi Dropout Mahasiswa, Jaya Jaya Institut",
    masalahSingkat:
      "Institusi pendidikan dengan angka dropout tinggi selalu terlambat menyadari mahasiswa mana yang akan berhenti, sehingga tidak sempat melakukan intervensi.",
    jenis: "studi-kasus",
    tahun: "2025",
    sorotan: true,
    ringkasan: {
      masalah:
        "Angka dropout di Jaya Jaya Institut tinggi, dan manajemen baru menyadarinya setelah mahasiswa benar-benar berhenti, ketika tidak ada lagi yang bisa dilakukan.",
      pendekatan:
        "Eksplorasi 4.424 catatan mahasiswa dengan Python dan pandas untuk mencari faktor yang paling berkaitan dengan dropout, lalu melatih model klasifikasi Random Forest sebagai alat deteksi dini.",
      hasil:
        "Model mencapai akurasi 0,90 pada 726 data uji, dengan recall 0,82 untuk kelas dropout. Dua penanda terkuat sama-sama muncul sejak tahun pertama: jumlah SKS yang lulus dan status pelunasan biaya kuliah. Temuannya dituangkan ke dashboard Metabase dan prototipe prediksi Streamlit supaya bisa dipakai berulang.",
    },
    tools: [
      "Python",
      "pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Metabase",
      "Streamlit",
    ],
    berkas: [
      {
        label: "Notebook analisis dan pemodelan",
        path: "/notebook/prediksi-dropout-jaya-jaya-institut.ipynb",
        keterangan:
          "IPYNB. Berisi seluruh kode, output, dan catatan dari pemahaman bisnis sampai evaluasi model.",
      },
    ],
    tautan: [
      {
        label: "Repositori GitHub",
        href: "https://github.com/rinesro/jaya-jaya-dropout-prediction",
      },
      { label: "Prototipe prediksi (Streamlit)", href: null },
    ],
    bagian: [
      {
        id: "latar-belakang",
        judul: "Latar Belakang",
        blok: [
          {
            kind: "paragraf",
            teks: "Jaya Jaya Institut adalah institusi pendidikan tinggi yang berdiri sejak tahun 2000. Reputasinya baik dan lulusannya banyak, tetapi angka mahasiswa yang berhenti di tengah jalan cukup tinggi.",
          },
          {
            kind: "paragraf",
            teks: "Dari total populasi historis, 32,1 persen mahasiswa berakhir dropout. Angka itu merugikan institusi secara finansial maupun reputasi, dan merugikan masa depan mahasiswanya sendiri. Masalah utamanya soal waktu: manajemen sering baru sadar seorang mahasiswa akan berhenti setelah semuanya terlambat, sehingga tidak ada tindakan pencegahan yang sempat dilakukan.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "daftar-nomor",
            item: [
              "Faktor apa yang paling berkaitan dengan dropout, dilihat dari data akademik, demografi, dan status ekonomi mahasiswa?",
              "Bisakah dibangun model klasifikasi yang menandai mahasiswa berisiko dropout sedini mungkin, supaya institusi masih sempat memberi bimbingan atau intervensi terarah?",
              "Bagaimana manajemen bisa memantau status dan performa mahasiswa secara berkelanjutan, bukan hanya sekali saat analisis dibuat?",
            ],
          },
          {
            kind: "catatan",
            teks: "Ketiga pertanyaan ini adalah tujuan proyek yang tertulis di notebook, ditulis ulang dalam bentuk pertanyaan.",
          },
        ],
      },
      {
        id: "data-wrangling",
        judul: "Data Wrangling",
        blok: [
          {
            kind: "paragraf",
            teks: "Datanya berisi 4.424 catatan mahasiswa dengan 37 kolom, mencakup demografi, latar belakang ekonomi, dan performa akademik per semester. Berkasnya CSV dengan pemisah titik koma, jadi pemisahnya perlu ditentukan secara eksplisit saat dimuat.",
          },
          {
            kind: "daftar",
            item: [
              "Kelengkapan data diperiksa lebih dulu: seluruh 37 kolom terisi penuh pada 4.424 baris, jadi tidak ada nilai kosong yang perlu ditangani.",
              "Kolom target Status punya tiga kategori: Dropout, Graduate, dan Enrolled. Kategori Enrolled dikeluarkan karena statusnya belum final, sehingga tidak setara untuk dibandingkan dengan dua kategori lainnya.",
              "Target disederhanakan menjadi klasifikasi biner sesuai fokus proyek: Dropout bernilai 1 dan Graduate bernilai 0.",
              "Skala antar kolom disamakan dengan standardisasi, supaya tidak ada fitur yang mendominasi semata-mata karena satuannya berbeda.",
            ],
          },
        ],
      },
      {
        id: "eksplorasi-data",
        judul: "Eksplorasi Data",
        blok: [
          {
            kind: "paragraf",
            teks: "Eksplorasi difokuskan pada dua dimensi yang paling dekat dengan tujuan bisnisnya, yaitu kondisi finansial dan performa akademik tahun pertama. Keduanya langsung menunjukkan pemisahan yang tajam.",
          },
          {
            kind: "daftar",
            item: [
              "Faktor finansial: 94 persen mahasiswa yang menunggak biaya kuliah berakhir dropout, dibandingkan 30,7 persen pada mahasiswa yang biayanya lunas.",
              "Performa semester 1: mahasiswa yang akhirnya dropout rata-rata hanya meluluskan 2,6 SKS, sementara yang lulus rata-rata 6,2 SKS.",
              "Performa semester 2: jaraknya makin lebar, 1,9 SKS pada kelompok dropout dibanding 6,2 SKS pada kelompok yang lulus.",
            ],
          },
          {
            kind: "paragraf",
            teks: "Dilihat dari komposisinya, 4.424 mahasiswa terbagi menjadi 49,9 persen lulus, 32,1 persen dropout, dan 17,9 persen masih berstatus terdaftar. Dropout paling menumpuk pada rentang usia masuk 18 sampai 21 tahun.",
          },
          {
            kind: "paragraf",
            teks: "Artinya mahasiswa yang berisiko sudah memberi sinyal sejak tahun pertama, jauh sebelum keputusan berhenti benar-benar diambil. Di situlah ruang untuk intervensi berada.",
          },
        ],
      },
      {
        id: "pemodelan",
        judul: "Pemodelan dan Evaluasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Data dibagi 80 banding 20 untuk data latih dan data uji, lalu dilatih dengan Random Forest Classifier berisi 100 pohon. Algoritma ini dipilih karena performanya baik pada data tabular dengan banyak kolom berbeda jenis, dan karena ia bisa menunjukkan fitur mana yang paling menentukan keputusannya.",
          },
          {
            kind: "paragraf",
            teks: "Akurasi saja tidak cukup untuk kasus ini, sehingga yang diprioritaskan adalah recall pada kelas dropout. Alasannya soal biaya kesalahan: menandai mahasiswa aman sebagai berisiko hanya berarti bimbingan yang berlebih, sedangkan melewatkan mahasiswa yang benar-benar akan dropout berarti kehilangan kesempatan intervensi sama sekali.",
          },
          {
            kind: "daftar",
            item: [
              "Akurasi keseluruhan 0,90 pada 726 data uji.",
              "Kelas dropout: presisi 0,92, recall 0,82, F1 0,87, dengan 277 data uji.",
              "Kelas graduate: presisi 0,90, recall 0,95, F1 0,92, dengan 449 data uji.",
              "Dari matriks konfusi, model menandai benar 228 dari 277 mahasiswa yang memang dropout, dan melewatkan 49 di antaranya.",
            ],
          },
          {
            kind: "paragraf",
            teks: "Lima fitur dengan pengaruh terbesar terhadap prediksi adalah jumlah SKS lulus semester 2 (0,2026), nilai rata-rata semester 2 (0,1560), jumlah SKS lulus semester 1 (0,1165), lalu nilai rata-rata semester 1 dan status pelunasan biaya kuliah yang sama-sama 0,0596. Urutan ini sejalan dengan temuan eksplorasi: performa akademik tahun pertama dan kondisi finansial adalah penanda paling kuat.",
          },
        ],
      },
      {
        id: "visualisasi",
        judul: "Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Empat grafik berikut diambil langsung dari notebook, mulai dari sebaran status mahasiswa sampai fitur yang paling menentukan prediksi.",
          },
        ],
      },
      {
        id: "dashboard-dan-prototipe",
        judul: "Dashboard dan Prototipe",
        blok: [
          {
            kind: "paragraf",
            teks: "Analisis sekali jalan tidak menjawab kebutuhan pemantauan, jadi temuannya diteruskan ke dua alat yang bisa dipakai berulang oleh institusi.",
          },
          {
            kind: "daftar",
            item: [
              "Dashboard Metabase untuk memantau profil mahasiswa: komposisi status, sebaran usia masuk, sebaran SKS lulus semester 1 dan 2, serta status pelunasan biaya kuliah per status akhir.",
              "Prototipe prediksi berbasis Streamlit, tempat staf kemahasiswaan bisa memasukkan data seorang mahasiswa dan langsung melihat perkiraan risikonya, tanpa perlu membuka notebook.",
            ],
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Dropout di Jaya Jaya Institut bukan kejadian mendadak. Dua penanda muncul jauh sebelumnya dan keduanya bisa dipantau institusi sendiri: tunggakan biaya kuliah, yang berkaitan dengan 94 persen kasus dropout, dan jumlah SKS yang lulus di tahun pertama, yang pada kelompok dropout hanya sepertiga dari kelompok yang lulus.",
          },
          {
            kind: "paragraf",
            teks: "Model Random Forest yang dilatih mampu menandai 82 persen mahasiswa yang benar-benar akan dropout pada data uji, jadi cukup layak dipakai sebagai penyaring awal sebelum ditindaklanjuti secara manual.",
          },
          {
            kind: "paragraf",
            teks: "Tiga tindakan berikut direkomendasikan untuk manajemen institusi.",
          },
          {
            kind: "daftar",
            item: [
              "Sistem peringatan dini finansial: staf keuangan diberi notifikasi ketika ada mahasiswa yang belum melunasi tagihan di pertengahan semester, supaya kampus bisa lebih dulu menawarkan restrukturisasi cicilan atau beasiswa bantuan sebelum mahasiswanya memilih berhenti.",
              "Intervensi akademik tahun pertama: dosen pembimbing akademik memanggil khusus mahasiswa yang gagal meluluskan lebih dari 2 SKS di semester 1, untuk memberi bimbingan belajar intensif sebelum masuk semester 2.",
              "Pemanfaatan prototipe: prototipe Streamlit diintegrasikan ke portal registrasi, sehingga staf kemahasiswaan bisa mengecek skor risiko tiap mahasiswa secara mandiri di awal semester baru.",
            ],
          },
        ],
      },
    ],
    gambar: [
      {
        src: "/gambar/prediksi-dropout/distribusi-status-mahasiswa.png",
        alt: "Diagram batang jumlah mahasiswa per status akhir: Dropout, Graduate, dan Enrolled, dengan Graduate paling banyak.",
        caption:
          "Sebaran status akhir mahasiswa. Kategori Enrolled kemudian dikeluarkan dari analisis karena statusnya belum final.",
        rasio: "560 / 402",
      },
      {
        src: "/gambar/prediksi-dropout/faktor-finansial-dan-akademik.png",
        alt: "Tiga diagram batang berdampingan: persentase dropout menurut status pembayaran kuliah, rata-rata SKS lulus semester 1, dan rata-rata SKS lulus semester 2 menurut status akhir.",
        caption:
          "Dua faktor pembeda paling tajam. Menunggak biaya kuliah berkaitan dengan 94 persen dropout, dan kelompok dropout hanya meluluskan 2,6 lalu 1,9 SKS di dua semester pertama.",
        rasio: "1584 / 584",
      },
      {
        src: "/gambar/prediksi-dropout/confusion-matrix.png",
        alt: "Matriks konfusi dengan 428 graduate diprediksi benar, 21 salah ditandai berisiko, 49 dropout terlewat, dan 228 dropout tertangkap.",
        caption:
          "Matriks konfusi pada data uji. Dari 277 mahasiswa yang memang dropout, 228 tertangkap dan 49 terlewat.",
        rasio: "530 / 417",
      },
      {
        src: "/gambar/prediksi-dropout/dashboard-metabase.png",
        alt: "Dashboard Metabase berlatar gelap berisi donat komposisi status mahasiswa, kartu jumlah 4.424 mahasiswa, histogram usia masuk, sebaran SKS lulus semester 1 dan 2, serta batang status pelunasan biaya kuliah.",
        caption:
          "Dashboard Metabase untuk memantau profil mahasiswa: komposisi status, sebaran usia masuk, SKS lulus dua semester pertama, dan status pelunasan biaya kuliah.",
        rasio: "2186 / 2340",
        bagian: "dashboard-dan-prototipe",
      },
      {
        src: "/gambar/prediksi-dropout/sepuluh-fitur-paling-berpengaruh.png",
        alt: "Diagram batang horizontal sepuluh fitur paling berpengaruh, dipimpin jumlah SKS lulus semester 2 dengan nilai 0,2026.",
        caption:
          "Sepuluh fitur paling berpengaruh terhadap prediksi. Performa akademik tahun pertama menempati urutan teratas, disusul status pelunasan biaya kuliah.",
        rasio: "991 / 584",
      },
    ],
  },

  {
    slug: "capital-bikeshare",
    judul: "Analisis Penggunaan Layanan Capital Bikeshare",
    masalahSingkat:
      "Pola permintaan layanan sepeda berbagi belum terbaca dari dua tahun data perjalanan mentah, padahal operasional harian bergantung padanya.",
    jenis: "studi-kasus",
    tahun: "2025",
    sorotan: false,
    ringkasan: {
      masalah:
        "Dua tahun data perjalanan sepeda berbagi belum memberi gambaran soal kapan permintaan naik dan turun, sehingga penyiapan armada dan promosi masih menebak.",
      pendekatan:
        "Exploratory data analysis atas 731 catatan harian dan 17.379 catatan per jam, dengan visualisasi pola permintaan menurut cuaca, musim, suhu, dan jam penggunaan.",
      hasil:
        "Cuaca cerah menghasilkan rata-rata 4.876,79 penyewaan per hari, hampir tiga kali lipat hari bersalju atau hujan ringan. Total penyewaan naik dari 1.243.103 pada 2011 menjadi 2.049.576 pada 2012, dan pola per jam memperlihatkan dua segmen pengguna yang berbeda.",
    },
    tools: ["Python", "pandas", "NumPy", "Matplotlib", "Seaborn", "Streamlit"],
    berkas: [
      {
        label: "Notebook analisis",
        path: "/notebook/capital-bikeshare.ipynb",
        keterangan:
          "IPYNB. Berisi seluruh kode, output, dan catatan dari pengumpulan data sampai kesimpulan.",
      },
    ],
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
            teks: "Sistem sepeda berbagi jadi tulang punggung mobilitas kota, tetapi ketersediaan armada dan jumlah penyewaan naik turun mengikuti faktor lingkungan. Data perjalanan Capital Bikeshare di Washington D.C. sepanjang 2011 sampai 2012 dianalisis untuk memahami pola permintaannya: kapan orang menyewa, dalam kondisi apa, dan apakah bisnisnya bertumbuh.",
          },
          {
            kind: "catatan",
            teks: "Analisis ini bagian dari validasi sertifikasi Data Scientist Expert Level IDCamp dan Dicoding Indonesia. Dataset aslinya disediakan Hadi Fanaee-T, University of Porto.",
          },
        ],
      },
      {
        id: "pertanyaan-smart",
        judul: "Pertanyaan SMART",
        blok: [
          {
            kind: "daftar-nomor",
            item: [
              "Bagaimana pengaruh kondisi cuaca terhadap jumlah total penyewaan sepeda harian?",
              "Bagaimana tren pertumbuhan penyewaan sepeda pada tahun 2011 dibandingkan tahun 2012?",
            ],
          },
        ],
      },
      {
        id: "data-wrangling",
        judul: "Data Wrangling",
        blok: [
          {
            kind: "paragraf",
            teks: "Dua berkas dipakai bersamaan: rangkuman harian berisi 731 baris, dan rincian per jam berisi 17.379 baris. Keduanya punya kolom yang hampir sama, bedanya berkas per jam menyimpan kolom jam.",
          },
          {
            kind: "daftar",
            item: [
              "Pemeriksaan kualitas data tidak menemukan nilai kosong maupun baris duplikat pada kedua berkas.",
              "Kolom tanggal masih bertipe teks, jadi dikonversi menjadi tipe tanggal supaya bisa dipakai untuk analisis waktu.",
              "Kolom musim dan kondisi cuaca masih berupa angka. Keduanya diganti label teks, misalnya 1 menjadi Clear/Partly Cloudy dan 3 menjadi Light Snow/Rain, supaya grafiknya bisa dibaca tanpa penjelasan tambahan.",
              "Kolom tahun dan bulan ditambahkan dari kolom tanggal untuk mempermudah analisis tren tahunan.",
              "Data bersih disimpan ke berkas tersendiri, supaya dashboard yang dibangun terpisah memakai sumber data yang sama persis dengan notebook ini.",
            ],
          },
        ],
      },
      {
        id: "eksplorasi-data",
        judul: "Eksplorasi Data",
        blok: [
          {
            kind: "daftar",
            item: [
              "Rata-rata penyewaan harian saat cuaca cerah atau berawan sebagian mencapai 4.876,79, turun ke 4.035,86 saat berkabut atau mendung, dan anjlok ke 1.803,29 saat hujan ringan atau bersalju.",
              "Total penyewaan sepanjang 2011 sebanyak 1.243.103, lalu naik menjadi 2.049.576 pada 2012.",
              "Dilihat per bulan, penyewaan 2012 konsisten lebih tinggi daripada 2011 di seluruh bulan, dengan puncak pada Juni sampai September.",
            ],
          },
        ],
      },
      {
        id: "visualisasi",
        judul: "Visualisasi",
        blok: [
          {
            kind: "paragraf",
            teks: "Empat grafik berikut diambil langsung dari notebook: pengaruh cuaca, tren dua tahun, pengelompokan suhu, dan pola penyewaan per jam.",
          },
        ],
      },
      {
        id: "dashboard",
        judul: "Dashboard Interaktif",
        blok: [
          {
            kind: "paragraf",
            teks: "Selain notebook, dibangun dashboard Streamlit yang membaca langsung data bersih hasil notebook. Dashboard ini punya filter rentang tanggal di sisi kiri, tiga kartu ringkasan berisi total penyewaan, rata-rata harian, dan penyewaan maksimum, lalu grafik yang ikut menyesuaikan rentang yang dipilih.",
          },
          {
            kind: "paragraf",
            teks: "Tujuannya supaya pertanyaan susulan, misalnya bagaimana pola di satu musim tertentu, bisa dijawab tanpa membuka kode sama sekali. Cara menjalankannya ada di repositori.",
          },
        ],
      },
      {
        id: "analisis-lanjutan",
        judul: "Analisis Lanjutan",
        blok: [
          {
            kind: "paragraf",
            teks: "Dua analisis tambahan dikerjakan untuk menggali lebih jauh dari dua pertanyaan awal.",
          },
          {
            kind: "daftar",
            item: [
              "Pengelompokan manual suhu menjadi tiga kategori, Cold, Moderate, dan Hot, menunjukkan bahwa kelompok Moderate dan Hot punya rata-rata penyewaan jauh lebih tinggi daripada kelompok Cold. Cuaca dingin adalah hambatan utama pengguna.",
              "Pola per jam pada hari kerja memperlihatkan dua puncak tajam, sekitar pukul 08.00 dan pukul 17.00 sampai 18.00, khas perjalanan berangkat dan pulang kerja. Pada akhir pekan dan hari libur, polanya landai dengan satu puncak lebar sekitar pukul 12.00 sampai 16.00, khas penggunaan rekreasi.",
            ],
          },
        ],
      },
      {
        id: "kesimpulan",
        judul: "Kesimpulan dan Rekomendasi",
        blok: [
          {
            kind: "daftar",
            item: [
              "Kondisi cuaca berpengaruh besar terhadap jumlah penyewaan. Cuaca cerah adalah pendukung utama bisnis, sedangkan hujan ringan atau salju menurunkan minat secara drastis, sehingga operasional dan pemasaran perlu menyesuaikan diri saat musim cuaca buruk tiba.",
              "Bisnisnya bertumbuh positif. Penyewaan 2012 melampaui 2011 di semua bulan, dengan permintaan memuncak pada kuartal ketiga, Juni sampai September.",
              "Suhu yang nyaman, Moderate sampai Hot, adalah target pasar paling potensial, sementara suhu dingin ekstrem membuat jumlah pelanggan turun signifikan.",
              "Layanan ini sebenarnya melayani dua segmen berbeda, yaitu pekerja komuter pada hari kerja dan pengguna rekreasi pada akhir pekan. Keduanya idealnya didekati dengan strategi armada dan promosi yang berbeda pula.",
            ],
          },
        ],
      },
    ],
    gambar: [
      {
        src: "/gambar/capital-bikeshare/rata-rata-penyewaan-per-kondisi-cuaca.png",
        alt: "Diagram batang rata-rata penyewaan sepeda menurut kondisi cuaca, tertinggi pada cuaca cerah dan terendah pada hujan ringan atau salju.",
        caption:
          "Rata-rata penyewaan harian menurut kondisi cuaca. Hujan ringan atau salju memangkas permintaan sampai kurang dari separuh hari cerah.",
        rasio: "859 / 548",
      },
      {
        src: "/gambar/capital-bikeshare/tren-penyewaan-2011-vs-2012.png",
        alt: "Grafik garis total penyewaan per bulan untuk tahun 2011 dan 2012, dengan garis 2012 selalu berada di atas garis 2011.",
        caption:
          "Tren penyewaan bulanan 2011 dibanding 2012. Garis 2012 berada di atas 2011 sepanjang tahun, dengan puncak pada pertengahan tahun.",
        rasio: "1031 / 549",
      },
      {
        src: "/gambar/capital-bikeshare/rata-rata-penyewaan-per-cluster-suhu.png",
        alt: "Diagram batang rata-rata penyewaan untuk tiga kelompok suhu: Cold, Moderate, dan Hot, dengan Cold paling rendah.",
        caption:
          "Rata-rata penyewaan per kelompok suhu hasil pengelompokan manual. Suhu dingin menekan permintaan paling dalam.",
        rasio: "704 / 471",
      },
      {
        src: "/gambar/capital-bikeshare/pola-penyewaan-per-jam.png",
        alt: "Grafik garis rata-rata penyewaan per jam, membandingkan hari kerja yang berpuncak dua kali dengan akhir pekan yang berpuncak sekali di siang hari.",
        caption:
          "Pola penyewaan per jam. Hari kerja berpuncak dua kali di jam berangkat dan pulang kerja, akhir pekan sekali saja di siang hari.",
        rasio: "1005 / 548",
      },
    ],
  },
];

export function ambilEntri(slug: string): Entri | undefined {
  return entri.find((e) => e.slug === slug);
}

/** Sorotan lebih dulu, lalu tahun terbaru. */
export const entriTerurut: Entri[] = [...entri].sort((a, b) => {
  if (a.sorotan !== b.sorotan) return a.sorotan ? -1 : 1;
  return Number(b.tahun) - Number(a.tahun);
});
