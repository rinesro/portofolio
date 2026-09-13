import { HalamanJalur } from "@/components/halaman-jalur";
import { buatMetadata } from "@/lib/metadata";
import { ambilJalur } from "@/content/jalur";

const track = ambilJalur("data-engineer")!;

export const metadata = buatMetadata({
  judul: "Data Engineer",
  deskripsi: track.pembuka,
  path: "/data-engineer/",
});

export default function HalamanDataEngineer() {
  return <HalamanJalur slug="data-engineer" />;
}
