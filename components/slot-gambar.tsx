import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Gambar } from "@/content/types";

/**
 * Kotak gambar dengan rasio tetap dan caption.
 * Selama `src` masih null, yang tampil adalah placeholder dengan ukuran
 * yang sama, jadi tata letak tidak bergeser saat screenshot dipasang.
 */
export function SlotGambar({ gambar }: { gambar: Gambar }) {
  const rasio = gambar.rasio ?? "16 / 9";

  return (
    <figure className="my-8">
      <div
        style={{ aspectRatio: rasio }}
        className="relative w-full overflow-hidden rounded-lg border border-garis bg-permukaan"
      >
        {gambar.src ? (
          <Image
            src={gambar.src}
            alt={gambar.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <ImageIcon className="size-5 text-lembut" aria-hidden="true" />
            <p className="text-xs text-lembut">
              Slot gambar. Taruh file di <code>/public</code>, lalu isi{" "}
              <code>src</code> dan <code>alt</code> di file konten.
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-lembut">
        {gambar.caption}
      </figcaption>
    </figure>
  );
}
