import type { KelompokKeahlian } from "@/content/types";
import { Muncul } from "./muncul";

export function DaftarKeahlian({
  kelompok,
}: {
  kelompok: KelompokKeahlian[];
}) {
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {kelompok.map((k, i) => (
        <Muncul as="li" key={k.id} jeda={i * 60}>
          <h3 className="border-b border-garis pb-2 text-sm font-semibold tracking-wide text-teks uppercase">
            {k.judul}
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-lembut">
            {k.item.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </Muncul>
      ))}
    </ul>
  );
}
