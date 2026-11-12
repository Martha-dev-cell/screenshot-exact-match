import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { getNavItem, type SitePath } from "@/config/site";

/** Pita judul halaman dengan ikon menu dan breadcrumb. */
export function PageHeader({
  path,
  description,
  actions,
}: {
  path: SitePath;
  description: string;
  actions?: ReactNode;
}) {
  const item = getNavItem(path);
  const Icon = item.icon;

  return (
    <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="pattern-grid absolute inset-0" aria-hidden />
      <div className="container-page relative flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="animate-fade-up">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-xs text-navy-muted"
          >
            <Link to="/" className="hover:text-gold">
              Beranda
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-navy-foreground">{item.title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-xl border border-gold/40 bg-navy-foreground/5 text-gold">
              <Icon className="size-7" />
            </span>
            <h1 className="font-display text-3xl md:text-[2.75rem] md:leading-tight">
              {item.title}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-navy-muted">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}
