import { Info } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Penanda jujur bahwa fitur belum terhubung ke sistem penyimpanan data. */
export function IntegrationNotice({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-gold-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" />
      <p className="leading-relaxed">
        {children ??
          "Portal masih dalam tahap pembangunan tampilan. Data akan muncul di sini setelah sistem penyimpanan terhubung."}
      </p>
    </div>
  );
}
