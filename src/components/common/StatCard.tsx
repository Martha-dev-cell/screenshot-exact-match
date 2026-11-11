import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Kartu statistik. `value` null berarti data belum tersedia. */
export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number | null;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" />
        </span>
      </div>
      <div className="mt-3 font-display text-4xl text-primary">{value ?? "—"}</div>
      <p className="mt-1 text-xs text-muted-foreground">{hint ?? (value === null ? "Belum ada data" : "")}</p>
    </div>
  );
}
