import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("space-y-3", align === "center" && "flex flex-col items-center")}>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-foreground/70">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl text-primary md:text-[2.25rem]">{title}</h2>
        <div className="gold-rule" />
        {description ? (
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
