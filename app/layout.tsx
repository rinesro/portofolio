import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { situs } from "@/content/situs";
import { gambarPratinjau } from "@/lib/metadata";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(situs.url),
  title: {
    default: situs.nama,
    template: `%s — ${situs.judulSingkat}`,
  },
  description: situs.deskripsi,
  authors: [{ name: situs.judulSingkat }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: situs.nama,
    images: [gambarPratinjau],
  },
  twitter: {
    card: "summary_large_image",
    images: [gambarPratinjau.url],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#15120f" },
  ],
};

/**
 * Dijalankan sebelum halaman tampil supaya tidak ada kedipan tema.
 * Tidak ada tema tersimpan berarti ikut preferensi sistem.
 */
const skripTema = `(function(){document.documentElement.dataset.js="1";try{var t=localStorage.getItem("tema");if(t!=="terang"&&t!=="gelap"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"gelap":"terang";}document.documentElement.dataset.theme=t==="gelap"?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body className={`${fraunces.variable} ${plex.variable}`}>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-aksen focus:px-4 focus:py-2 focus:text-latar"
        >
          Lompat ke konten utama
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="konten" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
