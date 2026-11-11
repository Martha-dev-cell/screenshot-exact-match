import { Link } from "@tanstack/react-router";
import { LogIn, MapPin, Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav, site } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      {/* Bilah identitas */}
      <div className="hidden bg-navy-deep text-navy-muted md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 text-gold" />
            {site.district}, {site.regency}, {site.province}
          </span>
          <span className="italic text-navy-foreground/80">“{site.slogan}”</span>
        </div>
      </div>

      <div className="border-b">
        <div className="container-page flex h-16 items-center justify-between gap-4 xl:h-[4.5rem]">
          <Link to="/" aria-label="Beranda KKG Gugus 01">
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/masuk">
                <LogIn /> Masuk Portal
              </Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="xl:hidden" aria-label="Buka menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                <SheetHeader className="border-b p-5 text-left">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-1 p-3" aria-label="Menu utama">
                  {mainNav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: item.to === "/" }}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                    >
                      <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary group-data-[status=active]:bg-navy-foreground/15 group-data-[status=active]:text-gold">
                        <item.icon className="size-[1.1rem]" />
                      </span>
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="border-t p-4">
                  <Button asChild className="w-full">
                    <Link to="/masuk" onClick={() => setOpen(false)}>
                      <LogIn /> Masuk Portal
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigasi desktop: ikon + label agar mudah dikenali */}
      <nav aria-label="Menu utama" className="hidden border-b bg-background xl:block">
        <ul className="container-page flex items-stretch justify-between">
          {mainNav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group relative flex h-full flex-col items-center gap-1 px-2.5 py-2.5 text-[0.78rem] font-semibold text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
              >
                <item.icon className="size-[1.15rem] transition-colors group-hover:text-primary group-data-[status=active]:text-gold" />
                <span className="whitespace-nowrap">{item.short}</span>
                <span className="absolute inset-x-2 bottom-0 h-[3px] scale-x-0 rounded-t-full bg-gold transition-transform group-data-[status=active]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
