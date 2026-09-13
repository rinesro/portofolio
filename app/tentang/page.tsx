import { profil } from "@/content/profil";
import { kelompokKeahlian } from "@/content/keahlian";
import { buatMetadata } from "@/lib/metadata";
import { DaftarKeahlian } from "@/components/daftar-keahlian";
import { Muncul } from "@/components/muncul";

export const metadata = buatMetadata({
  judul: "Tentang Saya",
  deskripsi:
    "Riwayat pendidikan, sertifikasi, dan cara kerja Sandhika Hamzah dalam mengerjakan analisis data, dari data mentah sampai rekomendasi.",
  path: "/tentang/",
});

export default function HalamanTentang() {
  const { pendidikan } = profil;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="border-b border-garis py-16 sm:py-20">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
          Tentang Saya
        </h1>
        <p className="mt-8 max-w-baca leading-[1.75] text-lembut">
          {profil.perkenalan}
        </p>
        <p className="mt-4 max-w-baca leading-[1.75] text-lembut">
          Panggil saja {profil.panggilan}. Saya berbasis di {profil.lokasi}.
        </p>
      </section>

      {/* Bagian ini yang paling sering ditanyakan saat wawancara data analyst. */}
      <section aria-labelledby="cara-kerja" className="py-16 sm:py-20">
        <h2 id="cara-kerja" className="font-display text-2xl sm:text-3xl">
          Cara Saya Mengerjakan Analisis
        </h2>
        <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {profil.caraKerja.map((langkah, i) => (
            <Muncul as="li" key={langkah} jeda={i * 60}>
              <p
                aria-hidden="true"
                className="font-display text-3xl leading-none text-aksen"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 border-t border-garis pt-3 leading-relaxed text-teks/90">
                {langkah}
              </p>
            </Muncul>
          ))}
        </ol>
        <p className="mt-10 max-w-baca border-l-2 border-aksen/50 pl-4 text-lembut">
          {profil.caraKerjaCatatan}
        </p>
      </section>

      <section
        aria-labelledby="pendidikan"
        className="border-t border-garis py-16 sm:py-20"
      >
        <h2 id="pendidikan" className="font-display text-2xl sm:text-3xl">
          Pendidikan
        </h2>
        <div className="mt-8 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-8">
          <p className="text-sm text-lembut">{pendidikan.periode}</p>
          <div className="mt-2 sm:mt-0">
            <h3 className="font-display text-xl">{pendidikan.institusi}</h3>
            <p className="mt-1 text-lembut">{pendidikan.program}</p>
            <p className="mt-1 text-lembut">IPK {pendidikan.ipk}</p>
            <p className="mt-1 text-sm text-lembut">{pendidikan.catatan}</p>

            <h4 className="mt-6 text-xs tracking-wide text-lembut uppercase">
              Mata kuliah relevan
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pendidikan.mataKuliah.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-garis px-3 py-1 text-sm text-lembut"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sertifikasi"
        className="border-t border-garis py-16 sm:py-20"
      >
        <h2 id="sertifikasi" className="font-display text-2xl sm:text-3xl">
          Sertifikasi
        </h2>
        <ul className="mt-8 max-w-baca">
          {profil.sertifikasi.map((s) => (
            <li key={s.nama} className="border-b border-garis py-5">
              <h3 className="text-base font-medium">{s.nama}</h3>
              {s.keterangan && (
                <p className="mt-1 text-sm text-lembut">{s.keterangan}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="keahlian-lengkap"
        className="border-t border-garis py-16 sm:py-20"
      >
        <h2 id="keahlian-lengkap" className="font-display text-2xl sm:text-3xl">
          Keahlian lengkap
        </h2>
        <div className="mt-10">
          <DaftarKeahlian kelompok={kelompokKeahlian} />
        </div>
      </section>
    </div>
  );
}
