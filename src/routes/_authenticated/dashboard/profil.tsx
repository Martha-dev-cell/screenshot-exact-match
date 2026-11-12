import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthError, currentUserQuery, updatePassword } from "@/lib/auth/auth-service";
import { ROLE_META } from "@/lib/auth/roles";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/dashboard/profil")({
  head: () =>
    pageHead(
      "Profil Saya",
      "Data akun dan pengaturan password di Portal Digital KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: ProfilSayaPage,
});

function ProfilSayaPage() {
  const { data: user } = useSuspenseQuery(currentUserQuery);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  if (!user) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      setPassword("");
      setConfirm("");
      toast.success("Password berhasil diperbarui.");
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Gagal memperbarui password.");
    } finally {
      setLoading(false);
    }
  }

  const rows: [string, string][] = [
    ["Nama lengkap", user.name],
    ["Email", user.email || "—"],
    ["Nomor HP", user.phone || "—"],
    ["Peran", ROLE_META[user.role].label],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold text-primary">Data akun</h2>
        <dl className="mt-4 divide-y">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-3 text-sm">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Untuk mengubah data di atas, hubungi pengurus KKG.
        </p>
      </section>
      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold text-primary">Ganti password</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password baru (minimal 8 karakter)</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Ulangi password baru</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={loading || !password}>
            <KeyRound /> {loading ? "Menyimpan…" : "Simpan password"}
          </Button>
        </form>
      </section>
    </div>
  );
}
