import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Entri, TrackSlug } from "@/content/types";

const labelJenis: Record<Entri["jenis"], string> = {
  "studi-kasus": "Studi kasus",
  proyek: "Proyek",
};

export function KartuEntri({
  entri,
  jalur,
}: {
  entri: Entri;
  jalur: TrackSlug;
}) {
  const sorotan = entri.sorotan.includes(jalur);

  return (
    <article className="group relative border-t border-garis py-8 transition-colors sm:py-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-wide text-lembut uppercase">
        <span>{labelJenis[entri.jenis]}</span>
        <span aria-hidden="true" className="text-lembut/60">
          /
        </span>
        <span>{entri.tahun}</span>
        {sorotan && (
          <span className="rounded-full bg-aksen-lembut px-2.5 py-0.5 text-aksen normal-case">
            Sorotan utama
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-2xl leading-snug text-balance sm:text-[1.75rem]">
        <Link
          href={`/studi-kasus/${entri.slug}/`}
          className="transition-colors group-hover:text-aksen after:absolute after:inset-0 after:content-['']"
        >
          {entri.judul}
        </Link>
      </h3>

      <p className="mt-3 max-w-baca leading-relaxed text-lembut">
        {entri.masalahSingkat}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {entri.tools.map((t) => (
          <li
            key={t}
            className="rounded-full border border-garis px-3 py-1 text-xs text-lembut"
          >
            {t}
          </li>
        ))}
        {entri.tools.length === 0 && (
          <li className="rounded-full border border-dashed border-aksen/50 px-3 py-1 text-xs text-aksen">
            Tools belum diisi
          </li>
        )}
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-aksen">
        Baca uraiannya
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </p>
    </article>
  );
}
