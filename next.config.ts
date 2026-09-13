import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs ini murni statis: tidak ada API route, tidak ada server runtime.
  // `next build` menghasilkan folder `out/` yang bisa di-host di mana saja,
  // termasuk Vercel tanpa konfigurasi tambahan.
  output: "export",
  images: {
    // Wajib untuk static export: tidak ada server pengoptimal gambar.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
