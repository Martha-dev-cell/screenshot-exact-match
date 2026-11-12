import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { MODULE_LINKS, type ModulePath } from "@/components/dashboard/module-links";
import { Badge } from "@/components/ui/badge";
import { currentUserQuery } from "@/lib/auth/auth-service";
import { modulesFor, type DashboardModule } from "@/lib/auth/roles";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () =>
    pageHead(
      "Dashboard",
      "Dashboard anggota dan pengurus Portal Digital KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: DashboardHome,
});

function DashboardHome() {
  const { data: user } = useSuspenseQuery(currentUserQuery);
  if (!user) return null;
  const modules = modulesFor(user.role);

  return (
    <div>
      <h2 className="text-xl font-bold text-primary">Menu Anda</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Fitur yang tersedia sesuai peran akun Anda.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} href={MODULE_LINKS[m.id]} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  module: m,
  href,
}: {
  module: DashboardModule;
  href?: ModulePath | undefined;
}) {
  const Icon = m.icon;
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" />
        </span>
        {href ? (
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            Segera hadir
          </Badge>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-foreground">{m.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
    </>
  );

  if (!href) {
    return <div className="rounded-xl border border-dashed bg-surface p-5 opacity-80">{body}</div>;
  }
  return (
    <Link
      to={href}
      className="group rounded-xl border bg-card p-5 shadow-card transition-shadow hover:shadow-elegant"
    >
      {body}
    </Link>
  );
}
