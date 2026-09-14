import Link from "next/link";
import { entriTerurut } from "@/content/entri";
import { ambilKeahlian, keahlianBeranda } from "@/content/keahlian";
import { profil } from "@/content/profil";
import { KartuEntri } from "@/components/kartu-entri";
import { DaftarKeahlian } from "@/components/daftar-keahlian";
import { Muncul } from "@/components/muncul";
import { buatMetadata } from "@/lib/metadata";
import { situs } from "@/content/situs";

export const metadata = buatMetadata({
  judul: situs.nama,
  deskripsi: situs.deskripsi,
  path: "/",
});

export default function Beranda() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="border-b border-garis py-16 sm:py-24">
        <p className="text-sm tracking-wide text-lembut uppercase">
          {profil.lokasi}
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
          {profil.nama}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-snug text-aksen text-balance sm:text-xl">
          {profil.posisi}
        </p>
        <p className="mt-8 max-w-baca leading-[1.75] text-lembut">
          {profil.perkenalan}
        </p>
      </section>

      <section
        id="studi-kasus"
        aria-labelledby="studi-kasus-judul"
        className="scroll-mt-24 py-16 sm:py-20"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="studi-kasus-judul"
            className="font-display text-2xl sm:text-3xl"
          >
            Studi Kasus
          </h2>
          <p className="text-sm text-lembut">{entriTerurut.length} entri</p>
        </div>
        <p className="mt-3 max-w-baca text-lembut">
          Tiap halaman menceritakan urutan yang sama: masalahnya apa, datanya
          dibersihkan bagaimana, apa yang ditemukan, dan apa yang sebaiknya
          dilakukan. Berkas kerja aslinya bisa diunduh di tiap halaman.
        </p>

        <div className="mt-8">
          {entriTerurut.map((e, i) => (
            <Muncul key={e.slug} jeda={i * 60}>
              <KartuEntri entri={e} />
            </Muncul>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="keahlian"
        className="border-t border-garis py-16 sm:py-20"
      >
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-4">
          <h2 id="keahlian" className="font-display text-2xl sm:text-3xl">
            Keahlian
          </h2>
          <Link
            href="/tentang/"
            className="text-sm text-aksen underline decoration-garis underline-offset-4 transition-colors hover:decoration-aksen"
          >
            Daftar lengkapnya di Tentang Saya
          </Link>
        </div>
        <div className="mt-10">
          <DaftarKeahlian kelompok={ambilKeahlian(keahlianBeranda)} />
        </div>
      </section>
    </div>
  );
}
