import Link from "next/link";

export const metadata = {
  title: "Halaman tidak ditemukan",
};

export default function TidakDitemukan() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-5 py-24 sm:px-8 sm:py-32">
      <p className="font-display text-6xl text-aksen sm:text-7xl">404</p>
      <h1 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
        Halaman ini tidak ada
      </h1>
      <p className="mt-4 max-w-baca text-lembut">
        Tautannya mungkin salah ketik, atau halamannya sudah dipindahkan.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link
          href="/"
          className="text-aksen underline decoration-garis underline-offset-4 transition-colors hover:decoration-aksen"
        >
          Kembali ke beranda
        </Link>
        <Link
          href="/data-analyst/"
          className="text-lembut underline decoration-garis underline-offset-4 transition-colors hover:text-aksen"
        >
          Lihat jalur Data Analyst
        </Link>
      </div>
    </div>
  );
}
