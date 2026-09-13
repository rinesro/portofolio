import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ambilEntri, entri } from "@/content/entri";
import { ambilJalur } from "@/content/jalur";
import { buatMetadata } from "@/lib/metadata";
import { BlokKonten } from "@/components/blok-konten";
import { SlotGambar } from "@/components/slot-gambar";
import { DaftarIsi } from "@/components/daftar-isi";
import { Placeholder } from "@/components/placeholder";
import { TautanEksternal } from "@/components/tautan-eksternal";
import { Muncul } from "@/components/muncul";
import type { Entri } from "@/content/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return entri.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = ambilEntri(slug);
  if (!e) return {};
  return buatMetadata({
    judul: e.judul,
    deskripsi: e.ringkasan.masalah,
    path: `/studi-kasus/${e.slug}/`,
  });
}

const labelJenis: Record<Entri["jenis"], string> = {
  "studi-kasus": "Studi kasus",
  proyek: "Proyek",
};

export default async function HalamanDetail({ params }: Props) {
  const { slug } = await params;
  const e = ambilEntri(slug);
  if (!e) notFound();

  const daftarIsi = [
    { id: "ringkasan", judul: "Ringkasan" },
    ...e.bagian.map((b) => ({ id: b.id, judul: b.judul })),
    { id: "tools-dan-tautan", judul: "Tools dan tautan" },
  ];
  const idGambar = e.gambarDiBagian ?? "visualisasi";
  const adaBagianGambar = e.bagian.some((b) => b.id === idGambar);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <article>
        <header className="border-b border-garis py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {e.jalur.map((j) => {
              const track = ambilJalur(j);
              if (!track) return null;
              return (
                <Link
                  key={j}
                  href={`/${j}/`}
                  className="rounded-full border border-aksen/40 bg-aksen-lembut px-3 py-1 text-aksen transition-colors hover:border-aksen"
                >
                  Jalur {track.nama}
                </Link>
              );
            })}
            <span className="text-lembut">
              {labelJenis[e.jenis]} · {e.tahun}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {e.judul}
          </h1>
        </header>

        <div className="lg:grid lg:grid-cols-[1fr_13rem] lg:gap-12">
          <div className="min-w-0 py-12">
            {/* Blok ringkasan: cukup dibaca 30 detik. */}
            <section
              id="ringkasan"
              aria-labelledby="ringkasan-judul"
              className="scroll-mt-28 rounded-xl border border-garis bg-permukaan/60 p-6 sm:p-8"
            >
              <h2
                id="ringkasan-judul"
                className="text-xs tracking-wide text-lembut uppercase"
              >
                Ringkasan
              </h2>
              <dl className="mt-5 space-y-5">
                <Ringkas judul="Masalah" isi={e.ringkasan.masalah} />
                <Ringkas judul="Pendekatan" isi={e.ringkasan.pendekatan} />
                <Ringkas
                  judul="Hasil"
                  isi={e.ringkasan.hasil}
                  petunjuk="Tulis hasil atau temuan utamanya dalam satu sampai dua kalimat."
                />
              </dl>
            </section>

            {e.bagian.map((b, i) => (
              <Muncul key={b.id} jeda={i * 40}>
                <section
                  id={b.id}
                  aria-labelledby={`${b.id}-judul`}
                  className="mt-14 scroll-mt-28"
                >
                  <h2
                    id={`${b.id}-judul`}
                    className="font-display text-2xl sm:text-3xl"
                  >
                    {b.judul}
                  </h2>
                  <div className="max-w-baca">
                    <BlokKonten blok={b.blok} />
                  </div>
                  {b.id === idGambar &&
                    e.gambar.map((g) => (
                      <SlotGambar key={g.caption} gambar={g} />
                    ))}
                </section>
              </Muncul>
            ))}

            {/* Kalau bagian tujuan gambar tidak ada, gambar tetap ditampilkan di akhir. */}
            {!adaBagianGambar && e.gambar.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl sm:text-3xl">Tampilan</h2>
                {e.gambar.map((g) => (
                  <SlotGambar key={g.caption} gambar={g} />
                ))}
              </section>
            )}

            <section
              id="tools-dan-tautan"
              aria-labelledby="tools-judul"
              className="mt-14 scroll-mt-28 border-t border-garis pt-10"
            >
              <h2 id="tools-judul" className="font-display text-2xl sm:text-3xl">
                Tools dan tautan
              </h2>

              <h3 className="mt-6 text-xs tracking-wide text-lembut uppercase">
                Tools yang dipakai
              </h3>
              {e.tools.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {e.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-garis px-3 py-1 text-sm text-lembut"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              {e.toolsPlaceholder && (
                <Placeholder petunjuk={e.toolsPlaceholder} />
              )}

              <h3 className="mt-8 text-xs tracking-wide text-lembut uppercase">
                Tautan
              </h3>
              {e.tautan.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {e.tautan.map((t) =>
                    t.href ? (
                      <li key={t.label}>
                        <TautanEksternal href={t.href}>{t.label}</TautanEksternal>
                      </li>
                    ) : (
                      <li key={t.label}>
                        <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-aksen/50 px-3 py-1 text-sm text-lembut">
                          {t.label}
                          <span className="text-aksen">belum diisi</span>
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-lembut">
                  Tidak ada tautan publik untuk pekerjaan ini.
                </p>
              )}
            </section>

            <nav className="mt-16 border-t border-garis pt-8">
              {e.jalur.map((j) => {
                const track = ambilJalur(j);
                if (!track) return null;
                return (
                  <Link
                    key={j}
                    href={`/${j}/`}
                    className="group inline-flex items-center gap-2 text-sm text-lembut transition-colors hover:text-aksen"
                  >
                    <ArrowLeft
                      className="size-4 transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                    Kembali ke jalur {track.nama}
                  </Link>
                );
              })}
            </nav>
          </div>

          <aside className="hidden py-12 lg:block">
            <DaftarIsi item={daftarIsi} />
          </aside>
        </div>
      </article>
    </div>
  );
}

function Ringkas({
  judul,
  isi,
  petunjuk,
}: {
  judul: string;
  isi: string | null;
  petunjuk?: string;
}) {
  return (
    <div className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="font-display text-lg text-aksen">{judul}</dt>
      <dd className="mt-1 max-w-baca leading-relaxed text-teks/90 sm:mt-0">
        {isi ?? <Placeholder petunjuk={petunjuk ?? "Belum diisi."} />}
      </dd>
    </div>
  );
}
