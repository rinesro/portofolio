import { statSync } from "node:fs";
import path from "node:path";

/**
 * Ukuran berkas di /public, dibaca saat build.
 * Dipakai untuk menampilkan besar file di tombol unduh.
 * Mengembalikan null kalau berkasnya belum ada, supaya build tidak gagal.
 */
export function ukuranBerkas(publicPath: string): string | null {
  try {
    const { size } = statSync(
      path.join(process.cwd(), "public", publicPath.replace(/^\//, "")),
    );
    if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  } catch {
    return null;
  }
}
