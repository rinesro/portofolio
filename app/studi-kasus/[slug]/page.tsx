import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { ambilEntri, entri } from "@/content/entri";
import { buatMetadata } from "@/lib/metadata";
import { ukuranBerkas } from "@/lib/ukuran-berkas";
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
    { id: "berkas-dan-tautan", judul: "Berkas dan tautan" },
  ];
  const idGambarDefault = e.gambarDiBagian ?? "visualisasi";
  const gambarBagian = (id: string) =>
    e.gambar.filter((g) => (g.bagian ?? idGambarDefault) === id);
  const idBagian = new Set(e.bagian.map((b) => b.id));
  const gambarTanpaBagian = e.gambar.filter(
    (g) => !idBagian.has(g.bagian ?? idGambarDefault),
  );

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <article>
        <header className="border-b border-garis py-12 sm:py-16">
          <p className="text-xs tracking-wide text-lembut uppercase">
            {labelJenis[e.jenis]} · {e.tahun}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
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
                  {gambarBagian(b.id).map((g) => (
                    <SlotGambar key={g.caption} gambar={g} />
                  ))}
                </section>
              </Muncul>
            ))}

            {/* Gambar yang bagian tujuannya tidak ada tetap ditampilkan di akhir. */}
            {gambarTanpaBagian.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl sm:text-3xl">Tampilan</h2>
                {gambarTanpaBagian.map((g) => (
                  <SlotGambar key={g.caption} gambar={g} />
                ))}
              </section>
            )}

            <section
              id="berkas-dan-tautan"
              aria-labelledby="berkas-judul"
              className="mt-14 scroll-mt-28 border-t border-garis pt-10"
            >
              <h2
                id="berkas-judul"
                className="font-display text-2xl sm:text-3xl"
              >
                Berkas dan Tautan
              </h2>
              <p className="mt-3 max-w-baca text-lembut">
                Seluruh berkas kerja disimpan di satu tempat, supaya siapa pun
                yang ingin memeriksa kodenya tidak perlu mencari.
              </p>

              {e.berkas.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {e.berkas.map((b) => {
                    const ukuran = ukuranBerkas(b.path);
                    return (
                      <li key={b.path}>
                        <a
                          href={b.path}
                          download
                          className="group flex max-w-baca items-start gap-3 rounded-lg border border-garis p-4 transition-colors hover:border-aksen"
                        >
                          <Download
                            className="mt-0.5 size-4 shrink-0 text-aksen"
                            aria-hidden="true"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium transition-colors group-hover:text-aksen">
                              {b.label}
                              {ukuran && (
                                <span className="ml-2 font-normal text-lembut">
                                  {ukuran}
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-lembut">
                              {b.keterangan}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}

              <h3 className="mt-8 text-xs tracking-wide text-lembut uppercase">
                Tautan
              </h3>
              {e.tautan.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {e.tautan.map((t) =>
                    t.href ? (
                      <li key={t.label}>
                        <TautanEksternal href={t.href}>
                          {t.label}
                        </TautanEksternal>
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

              <h3 className="mt-8 text-xs tracking-wide text-lembut uppercase">
                Tools yang dipakai
              </h3>
              {e.tools.length > 0 && (
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
              )}
              {e.toolsPlaceholder && (
                <Placeholder petunjuk={e.toolsPlaceholder} />
              )}
            </section>

            <nav className="mt-16 border-t border-garis pt-8">
              <Link
                href="/#studi-kasus"
                className="group inline-flex items-center gap-2 text-sm text-lembut transition-colors hover:text-aksen"
              >
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Kembali ke daftar studi kasus
              </Link>
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
