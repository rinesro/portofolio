import { Info } from "lucide-react";
import type { Blok } from "@/content/types";
import { Placeholder } from "./placeholder";

export function BlokKonten({ blok }: { blok: Blok[] }) {
  return (
    <>
      {blok.map((b, i) => {
        switch (b.kind) {
          case "paragraf":
            return (
              <p key={i} className="mt-4 leading-[1.75] text-teks/90">
                {b.teks}
              </p>
            );
          case "daftar":
            return (
              <ul key={i} className="mt-4 space-y-2">
                {b.item.map((it) => (
                  <li key={it} className="flex gap-3 leading-[1.75] text-teks/90">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-aksen"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "daftar-nomor":
            return (
              <ol key={i} className="mt-6 space-y-4">
                {b.item.map((it, n) => (
                  <li key={it} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl leading-none text-aksen"
                    >
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-[1.7] text-teks/90">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "catatan":
            return (
              <p
                key={i}
                className="mt-5 flex gap-3 border-l-2 border-aksen/50 bg-permukaan/60 px-4 py-3 text-sm leading-relaxed text-lembut"
              >
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{b.teks}</span>
              </p>
            );
          case "placeholder":
            return <Placeholder key={i} petunjuk={b.petunjuk} />;
        }
      })}
    </>
  );
}
