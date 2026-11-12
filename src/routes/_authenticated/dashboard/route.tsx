import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, UserCircle, UserCog } from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-auth";
import { currentUserQuery } from "@/lib/auth/auth-service";
import { ROLE_META, canManageAccounts } from "@/lib/auth/roles";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

const tabClass =
  "flex items-center gap-2 border-b-[3px] border-transparent px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary data-[status=active]:border-gold data-[status=active]:text-primary";

function DashboardLayout() {
  const { data: user } = useSuspenseQuery(currentUserQuery);
  const signOut = useSignOut();
  if (!user) return <Navigate to="/masuk" replace />;
  const meta = ROLE_META[user.role];
  const RoleIcon = meta.icon;

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
        <div className="pattern-grid absolute inset-0" aria-hidden />
        <div className="container-page relative flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-xl border border-gold/40 bg-navy-foreground/5 text-gold">
              <RoleIcon className="size-7" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-navy-muted">
                Dashboard {meta.label}
              </p>
              <h1 className="font-display text-3xl md:text-4xl">Halo, {user.name}</h1>
              <p className="mt-1 text-sm text-navy-muted">{meta.summary}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => void signOut()}>
            <LogOut /> Keluar
          </Button>
        </div>
      </section>
      <nav aria-label="Menu dashboard" className="border-b bg-background">
        <div className="container-page flex gap-1 overflow-x-auto">
          <Link to="/dashboard" activeOptions={{ exact: true }} className={tabClass}>
            <LayoutDashboard className="size-4" /> Ringkasan
          </Link>
          <Link to="/dashboard/profil" className={tabClass}>
            <UserCircle className="size-4" /> Profil Saya
          </Link>
          {canManageAccounts(user.role) ? (
            <Link to="/dashboard/pengguna" className={tabClass}>
              <UserCog className="size-4" /> Akun Pengguna
            </Link>
          ) : null}
        </div>
      </nav>
      <div className="container-page py-10">
        <Outlet />
      </div>
    </PublicLayout>
  );
}
