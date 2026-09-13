import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Track } from "@/content/types";

export function KartuJalur({
  jalur,
  jumlah,
  utama = false,
}: {
  jalur: Track;
  jumlah: number;
  utama?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col rounded-xl border p-6 transition-colors sm:p-8 ${
        utama
          ? "border-aksen/40 bg-aksen-lembut/50 hover:border-aksen"
          : "border-garis bg-permukaan/50 hover:border-lembut"
      }`}
    >
      {utama && (
        <p className="mb-3 text-xs tracking-wide text-aksen uppercase">
          Jalur utama
        </p>
      )}
      <h3
        className={`font-display leading-tight text-balance ${
          utama ? "text-3xl sm:text-[2.25rem]" : "text-2xl sm:text-3xl"
        }`}
      >
        <Link
          href={`/${jalur.slug}/`}
          className="transition-colors group-hover:text-aksen after:absolute after:inset-0 after:content-['']"
        >
          {jalur.nama}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-lembut">{jalur.fokus}</p>
      <p className="mt-6 flex items-center gap-2 text-sm text-lembut">
        <span className="font-display text-2xl text-aksen">{jumlah}</span>
        <span>pekerjaan di jalur ini</span>
        <ArrowRight
          className="ml-auto size-4 text-aksen transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </p>
    </article>
  );
}
