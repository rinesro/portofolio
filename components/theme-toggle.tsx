"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Tema = "terang" | "gelap";

const EVENT_TEMA = "tema-berubah";

function berlangganan(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT_TEMA, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT_TEMA, onChange);
  };
}

/** Pilihan tersimpan menang; kalau belum pernah memilih, ikut preferensi sistem. */
function bacaTema(): Tema {
  try {
    const tersimpan = localStorage.getItem("tema");
    if (tersimpan === "gelap" || tersimpan === "terang") return tersimpan;
  } catch {
    // localStorage bisa diblokir, jatuh ke preferensi sistem.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "gelap"
    : "terang";
}

function temaSaatRender(): Tema {
  return "terang";
}

export function ThemeToggle() {
  const tema = useSyncExternalStore(berlangganan, bacaTema, temaSaatRender);

  // Menjaga atribut pada <html> tetap sama dengan tema yang sedang aktif.
  useEffect(() => {
    document.documentElement.dataset.theme =
      tema === "gelap" ? "dark" : "light";
  }, [tema]);

  const ganti = useCallback(() => {
    const baru: Tema = tema === "gelap" ? "terang" : "gelap";
    try {
      localStorage.setItem("tema", baru);
    } catch {
      // Kalau penyimpanan diblokir, tema tetap berganti untuk sesi ini.
    }
    document.documentElement.dataset.theme = baru === "gelap" ? "dark" : "light";
    window.dispatchEvent(new Event(EVENT_TEMA));
  }, [tema]);

  const label =
    tema === "gelap" ? "Ganti ke mode terang" : "Ganti ke mode gelap";

  return (
    <button
      type="button"
      onClick={ganti}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-garis text-lembut transition-colors hover:border-aksen hover:text-aksen"
    >
      {tema === "gelap" ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
