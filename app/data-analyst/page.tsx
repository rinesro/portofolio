import { HalamanJalur } from "@/components/halaman-jalur";
import { buatMetadata } from "@/lib/metadata";
import { ambilJalur } from "@/content/jalur";

const track = ambilJalur("data-analyst")!;

export const metadata = buatMetadata({
  judul: "Data Analyst",
  deskripsi: track.pembuka,
  path: "/data-analyst/",
});

export default function HalamanDataAnalyst() {
  return <HalamanJalur slug="data-analyst" />;
}
