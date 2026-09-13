import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ambilJalur, jalur as semuaJalur } from "@/content/jalur";
import { entriPerJalur } from "@/content/entri";
import { ambilKeahlian } from "@/content/keahlian";
import { KartuEntri } from "./kartu-entri";
import { DaftarKeahlian } from "./daftar-keahlian";
import { Muncul } from "./muncul";
import type { TrackSlug } from "@/content/types";

export function HalamanJalur({ slug }: { slug: TrackSlug }) {
  const track = ambilJalur(slug)!;
  const daftar = entriPerJalur(slug);
  const lain = semuaJalur.find((j) => j.slug !== slug)!;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="border-b border-garis py-16 sm:py-20">
        <p className="text-sm tracking-wide text-lembut uppercase">Jalur</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
          {track.nama}
        </h1>
        <p className="mt-6 max-w-baca leading-[1.75] text-lembut">
          {track.pembuka}
        </p>
      </section>

      <section aria-labelledby="pekerjaan" className="py-14 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="pekerjaan" className="font-display text-2xl sm:text-3xl">
            Pekerjaan di jalur ini
          </h2>
          <p className="text-sm text-lembut">{daftar.length} entri</p>
        </div>

        <div className="mt-8">
          {daftar.map((e, i) => (
            <Muncul key={e.slug} jeda={i * 60}>
              <KartuEntri entri={e} jalur={slug} />
            </Muncul>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="keahlian-jalur"
        className="border-t border-garis py-14 sm:py-16"
      >
        <h2 id="keahlian-jalur" className="font-display text-2xl sm:text-3xl">
          Keahlian yang dipakai di jalur ini
        </h2>
        <div className="mt-10">
          <DaftarKeahlian kelompok={ambilKeahlian(track.keahlian)} />
        </div>
      </section>

      <section className="border-t border-garis py-14 sm:py-16">
        <p className="text-sm text-lembut">Jalur lainnya</p>
        <Link
          href={`/${lain.slug}/`}
          className="group mt-3 inline-flex items-center gap-3 font-display text-2xl transition-colors hover:text-aksen sm:text-3xl"
        >
          {lain.nama}
          <ArrowRight
            className="size-5 text-aksen transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <p className="mt-3 max-w-baca text-lembut">{lain.fokus}</p>
      </section>
    </div>
  );
}
