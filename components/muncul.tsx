"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Jeda kecil supaya elemen berurutan tidak muncul serentak. */
  jeda?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Fade-in ringan saat elemen masuk layar. Dinonaktifkan oleh prefers-reduced-motion (lihat globals.css). */
export function Muncul({ children, className = "", jeda = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [terlihat, setTerlihat] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` menangani gulir cepat: elemen sudah terlewat sebelum
        // callback sempat jalan, jadi tetap ditampilkan.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setTerlihat(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-terlihat={terlihat}
      style={jeda ? { transitionDelay: `${jeda}ms` } : undefined}
      className={`muncul ${className}`}
    >
      {children}
    </Tag>
  );
}
