import Link from "next/link";
import { jalur } from "@/content/jalur";
import { entriPerJalur } from "@/content/entri";
import { ambilKeahlian, keahlianBeranda } from "@/content/keahlian";
import { profil } from "@/content/profil";
import { KartuJalur } from "@/components/kartu-jalur";
import { DaftarKeahlian } from "@/components/daftar-keahlian";
import { Muncul } from "@/components/muncul";

const [analis, engineer] = jalur;

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

      <section aria-labelledby="jalur" className="py-16 sm:py-20">
        <h2 id="jalur" className="font-display text-2xl sm:text-3xl">
          Dua jalur pekerjaan
        </h2>
        <p className="mt-3 max-w-baca text-lembut">
          Tiap jalur hanya memuat pekerjaan yang relevan dengan peran itu, jadi
          Anda tidak perlu menyaringnya sendiri.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <Muncul className="lg:col-span-3">
            <KartuJalur
              jalur={analis}
              jumlah={entriPerJalur(analis.slug).length}
              utama
            />
          </Muncul>
          <Muncul className="lg:col-span-2" jeda={100}>
            <KartuJalur
              jalur={engineer}
              jumlah={entriPerJalur(engineer.slug).length}
            />
          </Muncul>
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
            Selengkapnya di Tentang Saya
          </Link>
        </div>
        <div className="mt-10">
          <DaftarKeahlian kelompok={ambilKeahlian(keahlianBeranda)} />
        </div>
      </section>
    </div>
  );
}
