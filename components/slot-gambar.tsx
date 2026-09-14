import Image from "next/image";
import { ImageIcon, Maximize2 } from "lucide-react";
import type { Gambar } from "@/content/types";

/**
 * Kotak gambar dengan rasio tetap dan caption.
 *
 * Latarnya sengaja putih di kedua mode, karena isinya grafik hasil ekspor
 * yang memang berlatar putih. Grafik yang lebar sulit dibaca di layar ponsel,
 * jadi gambarnya bisa diketuk untuk dibuka pada ukuran aslinya.
 *
 * Selama `src` masih null, yang tampil adalah placeholder berukuran sama,
 * jadi tata letak tidak bergeser saat gambar aslinya dipasang.
 */
export function SlotGambar({ gambar }: { gambar: Gambar }) {
  const rasio = gambar.rasio ?? "16 / 9";

  if (!gambar.src) {
    return (
      <figure className="my-8">
        <div
          style={{ aspectRatio: rasio }}
          className="relative w-full overflow-hidden rounded-lg border border-garis bg-permukaan"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <ImageIcon className="size-5 text-lembut" aria-hidden="true" />
            <p className="text-xs text-lembut">
              Slot gambar. Taruh file di <code>/public/gambar</code>, lalu isi{" "}
              <code>src</code> dan <code>alt</code> di file konten.
            </p>
          </div>
        </div>
        <figcaption className="mt-3 max-w-baca text-sm leading-relaxed text-lembut">
          {gambar.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <a
        href={gambar.src}
        target="_blank"
        rel="noopener noreferrer"
        style={{ aspectRatio: rasio }}
        className="group relative block w-full overflow-hidden rounded-lg border border-garis bg-white transition-colors hover:border-aksen"
      >
        <Image
          src={gambar.src}
          alt={gambar.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 720px"
          className="object-contain"
        />
      </a>
      <figcaption className="mt-3 max-w-baca text-sm leading-relaxed text-lembut">
        {gambar.caption}{" "}
        <a
          href={gambar.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1 whitespace-nowrap text-aksen underline decoration-garis underline-offset-4 transition-colors hover:decoration-aksen"
        >
          <Maximize2
            className="size-3 shrink-0 translate-y-0.5"
            aria-hidden="true"
          />
          Buka ukuran penuh
          <span className="sr-only">(membuka di tab baru)</span>
        </a>
      </figcaption>
    </figure>
  );
}
