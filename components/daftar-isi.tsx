"use client";

import { useEffect, useState } from "react";

type Item = { id: string; judul: string };

/**
 * Daftar isi yang menempel di sisi halaman pada layar lebar dan
 * menandai bagian yang sedang dibaca.
 */
export function DaftarIsi({ item }: { item: Item[] }) {
  const [aktif, setAktif] = useState<string>(item[0]?.id ?? "");

  useEffect(() => {
    const heading = item
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (heading.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const terlihat = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (terlihat[0]) {
          setAktif(terlihat[0].target.id);
          return;
        }
        // Tidak ada judul di viewport: pakai judul terakhir yang sudah terlewat.
        const terlewat = heading.filter(
          (el) => el.getBoundingClientRect().top < 120,
        );
        const terakhir = terlewat[terlewat.length - 1];
        if (terakhir) setAktif(terakhir.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );

    heading.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [item]);

  return (
    <nav aria-label="Daftar isi" className="sticky top-24">
      <p className="text-xs tracking-wide text-lembut uppercase">Daftar isi</p>
      <ul className="mt-4 space-y-1 border-l border-garis">
        {item.map((i) => {
          const sedangDibaca = aktif === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={sedangDibaca ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                  sedangDibaca
                    ? "border-aksen text-aksen"
                    : "border-transparent text-lembut hover:border-garis hover:text-teks"
                }`}
              >
                {i.judul}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
