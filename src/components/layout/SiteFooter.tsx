import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { mainNav, site } from "@/config/site";

export function SiteFooter() {
  const first = mainNav.slice(0, 6);
  const second = mainNav.slice(6);

  return (
    <footer className="bg-navy-deep text-navy-muted">
      <div className="h-1 bg-[image:var(--gradient-gold-line)]" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo tone="onNavy" />
          <p className="max-w-sm text-sm leading-relaxed">{site.description}</p>
          <p className="font-display text-lg text-gold">“{site.slogan}”</p>
        </div>

        <FooterColumn title="Menu Utama" items={first} />
        <FooterColumn title="Layanan" items={second} />

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
            Sekretariat
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.contact.address}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.contact.email ?? "Email resmi segera diumumkan"}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.contact.phone ?? "Nomor kontak segera diumumkan"}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}, {site.regency}.
          </span>
          <span>Kelompok Kerja Guru Sekolah Dasar</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: typeof mainNav }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="transition-colors hover:text-gold">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
