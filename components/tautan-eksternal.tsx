import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Semua tautan keluar membuka tab baru dan diberi penanda visual. */
export function TautanEksternal({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-baseline gap-1 underline decoration-garis underline-offset-4 transition-colors hover:decoration-aksen hover:text-aksen ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="size-3.5 shrink-0 translate-y-0.5 transition-transform group-hover:-translate-y-0 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="sr-only">(membuka di tab baru)</span>
    </a>
  );
}
