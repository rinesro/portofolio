import { BarisKontak } from "./baris-kontak";
import { profil } from "@/content/profil";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-garis">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <h2 className="font-display text-lg">Hubungi saya</h2>
        <p className="mt-2 max-w-baca text-sm text-lembut">
          Terbuka untuk kesempatan magang maupun posisi entry level di bidang
          data. Berbasis di {profil.lokasi}.
        </p>
        <BarisKontak className="mt-6" />
        <p className="mt-10 text-xs text-lembut">
          © {new Date().getFullYear()} {profil.nama}.
        </p>
      </div>
    </footer>
  );
}
