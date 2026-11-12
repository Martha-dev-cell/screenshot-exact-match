import { cn } from "@/lib/utils";

/**
 * Logo sementara KKG Gugus 01. Ganti komponen ini (atau isi <svg>) dengan logo resmi.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      role="img"
      aria-label="Logo KKG Gugus 01"
      className={cn("h-11 w-auto shrink-0", className)}
    >
      <path
        d="M32 2 60 12v22c0 17.5-11.6 30.5-28 36C15.6 64.5 4 51.5 4 34V12L32 2Z"
        className="fill-navy stroke-gold"
        strokeWidth="3"
      />
      <path
        d="m32 13 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L32 13Z"
        className="fill-gold"
      />
      <path
        d="M14 36c6-2.5 12-2.2 18 1.5 6-3.7 12-4 18-1.5v16c-6-2.5-12-2.2-18 1.5-6-3.7-12-4-18-1.5V36Z"
        className="fill-navy-foreground"
      />
      <path d="M32 37.5v16" className="stroke-navy" strokeWidth="1.6" />
      <text
        x="32"
        y="65"
        textAnchor="middle"
        className="fill-gold"
        style={{ fontSize: 7, fontWeight: 800, fontFamily: "var(--font-sans)" }}
      >
        01
      </text>
    </svg>
  );
}

export function Logo({
  tone = "default",
  className,
}: {
  tone?: "default" | "onNavy";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <div className="leading-tight">
        <div
          className={cn(
            "text-[0.95rem] font-extrabold tracking-wide",
            tone === "onNavy" ? "text-navy-foreground" : "text-primary",
          )}
        >
          KKG GUGUS 01
        </div>
        <div
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.14em]",
            tone === "onNavy" ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          Kecamatan Bluto · Sumenep
        </div>
      </div>
    </div>
  );
}
