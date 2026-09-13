// lucide-react versi 1 tidak lagi menyediakan ikon merek, jadi dipakai ikon netral.
import { Briefcase, GitBranch, Mail, Phone } from "lucide-react";
import { profil } from "@/content/profil";

const ikon = { Mail, Briefcase, GitBranch, Phone };

const kontak = [
  { label: profil.email, href: `mailto:${profil.email}`, ikon: "Mail" as const, luar: false },
  { label: "LinkedIn", href: profil.linkedin, ikon: "Briefcase" as const, luar: true },
  { label: "GitHub", href: profil.github, ikon: "GitBranch" as const, luar: true },
  { label: profil.telepon, href: `tel:${profil.telepon}`, ikon: "Phone" as const, luar: false },
];

export function BarisKontak({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-3 text-sm ${className}`}>
      {kontak.map((k) => {
        const Ikon = ikon[k.ikon];
        return (
          <li key={k.label}>
            <a
              href={k.href}
              {...(k.luar ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 text-lembut transition-colors hover:text-aksen"
            >
              <Ikon className="size-4 shrink-0" aria-hidden="true" />
              <span className="underline decoration-garis underline-offset-4">
                {k.label}
              </span>
              {k.luar && <span className="sr-only">(membuka di tab baru)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
