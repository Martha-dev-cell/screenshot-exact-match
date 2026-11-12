import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Logo, LogoMark } from "@/components/brand/Logo";
import { site } from "@/config/site";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-navy-gradient text-navy-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pattern-grid absolute inset-0" aria-hidden />
        <Link to="/" className="relative">
          <Logo tone="onNavy" />
        </Link>
        <div className="relative max-w-md">
          <LogoMark className="mb-8 h-24" />
          <h1 className="font-display text-4xl leading-tight">{site.portalName}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-navy-muted">
            {site.district} · {site.regency}
          </p>
          <p className="mt-6 border-l-2 border-gold pl-4 text-lg text-navy-foreground/90">
            “{site.slogan}”
          </p>
        </div>
        <p className="relative text-xs text-navy-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </aside>
      <main className="flex items-center justify-center bg-surface px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
