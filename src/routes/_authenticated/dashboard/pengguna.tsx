import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { currentUserQuery } from "@/lib/auth/auth-service";
import { ROLES, ROLE_META, canManageAccounts, parseRole, type Role } from "@/lib/auth/roles";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/dashboard/pengguna")({
  head: () =>
    pageHead(
      "Akun Pengguna",
      "Kelola peran dan status akun pengguna Portal Digital KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: PenggunaPage,
});

const profilesKey = ["profiles", "all"] as const;

function PenggunaPage() {
  const { data: me } = useSuspenseQuery(currentUserQuery);
  if (!me) return null;
  if (!canManageAccounts(me.role)) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Akses ditolak"
        description="Halaman ini hanya dapat dibuka oleh Super Admin."
      />
    );
  }
  return <AccountsTable myId={me.id} />;
}

function AccountsTable({ myId }: { myId: string }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: profilesKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, is_active, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const update = useMutation({
    mutationFn: async (input: { id: string; role?: Role; is_active?: boolean }) => {
      const { id, ...patch } = input;
      const { data, error } = await supabase
        .from("profiles")
        .update(patch)
        .eq("id", id)
        .select("id");
      if (error) throw error;
      if (!data?.length) throw new Error("Perubahan ditolak oleh sistem.");
    },
    onSuccess: () => {
      toast.success("Akun diperbarui.");
      void queryClient.invalidateQueries({ queryKey: profilesKey });
    },
    onError: () => toast.error("Gagal memperbarui akun. Pastikan Anda masih memiliki akses."),
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (error)
    return (
      <EmptyState
        icon={Users}
        title="Gagal memuat daftar akun"
        description="Muat ulang halaman untuk mencoba lagi."
      />
    );
  if (!data?.length) return <EmptyState icon={Users} title="Belum ada akun" />;

  return (
    <div>
      <h2 className="text-xl font-bold text-primary">Akun Pengguna</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Atur peran dan status aktif setiap akun. Akun baru dibuat melalui pengelola sistem, lalu
        perannya diatur di sini.
      </p>
      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-48">Peran</TableHead>
              <TableHead className="w-28 text-center">Aktif</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => {
              const isMe = p.id === myId;
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.full_name}{" "}
                    {isMe ? (
                      <Badge variant="secondary" className="ml-1">
                        Anda
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.email ?? "—"}</TableCell>
                  <TableCell>
                    <Select
                      value={parseRole(p.role)}
                      disabled={isMe || update.isPending}
                      onValueChange={(v) => update.mutate({ id: p.id, role: parseRole(v) })}
                    >
                      <SelectTrigger aria-label={`Peran ${p.full_name}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {ROLE_META[r].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={p.is_active}
                      disabled={isMe || update.isPending}
                      aria-label={`Status aktif ${p.full_name}`}
                      onCheckedChange={(v) => update.mutate({ id: p.id, is_active: v })}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Peran dan status akun Anda sendiri tidak dapat diubah dari sini agar Anda tidak terkunci.
      </p>
    </div>
  );
}
