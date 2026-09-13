import { PencilLine } from "lucide-react";

/**
 * Penanda bagian yang belum diisi pemilik situs.
 * Sengaja dibuat mencolok supaya tidak ikut terbit tanpa disadari.
 */
export function Placeholder({ petunjuk }: { petunjuk: string }) {
  return (
    <div className="my-4 rounded-lg border border-dashed border-aksen/50 bg-aksen-lembut/60 px-4 py-3">
      <p className="flex items-start gap-2 text-sm text-lembut">
        <PencilLine
          className="mt-0.5 size-4 shrink-0 text-aksen"
          aria-hidden="true"
        />
        <span>
          <strong className="font-semibold text-aksen">Belum diisi.</strong>{" "}
          {petunjuk}
        </span>
      </p>
    </div>
  );
}
