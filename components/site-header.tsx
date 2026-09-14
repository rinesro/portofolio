"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { situs } from "@/content/situs";
import { profil } from "@/content/profil";

const menu = [
  { href: "/", label: "Beranda", cocok: (p: string) => p === "/" },
  {
    href: "/#studi-kasus",
    label: "Studi Kasus",
    cocok: (p: string) => p.startsWith("/studi-kasus"),
  },
  { href: "/tentang/", label: "Tentang Saya", cocok: (p: string) => p.startsWith("/tentang") },
];

export function SiteHeader() {
  const path = usePathname();
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-garis bg-latar/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="font-display text-base tracking-tight transition-colors hover:text-aksen"
        >
          {profil.nama}
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Navigasi utama" className="hidden md:block">
            <ul className="flex items-center gap-1 text-sm">
              {menu.map((m) => {
                const aktif = m.cocok(path);
                return (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      aria-current={aktif ? "page" : undefined}
                      className={`rounded-md px-3 py-2 transition-colors hover:text-aksen ${
                        aktif ? "text-aksen" : "text-lembut"
                      }`}
                    >
                      {m.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <TombolCV className="hidden sm:inline-flex" />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-expanded={terbuka}
            aria-controls="menu-ponsel"
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-garis text-lembut transition-colors hover:border-aksen hover:text-aksen md:hidden"
          >
            {terbuka ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {terbuka && (
        <nav
          id="menu-ponsel"
          aria-label="Navigasi ponsel"
          className="border-t border-garis bg-latar md:hidden"
        >
          <ul className="mx-auto max-w-5xl px-5 py-2 sm:px-8">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  onClick={() => setTerbuka(false)}
                  className="block border-b border-garis/60 py-3 text-sm text-lembut transition-colors hover:text-aksen"
                >
                  {m.label}
                </Link>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <TombolCV />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function TombolCV({ className = "" }: { className?: string }) {
  if (!situs.cv.tersedia) {
    return (
      <span
        title="File CV belum diunggah ke folder /public"
        className={`items-center gap-1.5 rounded-full border border-dashed border-garis px-3 py-1.5 text-xs text-lembut ${className || "inline-flex"}`}
      >
        <Download className="size-3.5" aria-hidden="true" />
        CV (belum diunggah)
      </span>
    );
  }

  return (
    <a
      href={situs.cv.path}
      download
      className={`items-center gap-1.5 rounded-full border border-aksen px-3 py-1.5 text-xs text-aksen transition-colors hover:bg-aksen hover:text-latar ${className || "inline-flex"}`}
    >
      <Download className="size-3.5" aria-hidden="true" />
      Unduh CV
    </a>
  );
}
