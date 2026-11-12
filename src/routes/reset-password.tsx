import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { AuthError, updatePassword } from "@/lib/auth/auth-service";
import { pageHead } from "@/lib/seo";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () =>
    pageHead(
      "Atur Ulang Password",
      "Buat password baru untuk akun Portal Digital KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setStatus("ready");
    });
    const timer = setTimeout(async () => {
      const { data: s } = await supabase.auth.getSession();
      setStatus((cur) => (cur === "ready" || s.session ? "ready" : "invalid"));
    }, 1200);
    return () => {
      clearTimeout(timer);
      data.subscription.unsubscribe();
    };
  }, []);

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
      toast.success("Password berhasil diperbarui.");
      void navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Gagal memperbarui password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border bg-card p-7 shadow-elegant md:p-9">
        <h2 className="font-display text-3xl text-primary">Password baru</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Buat password baru untuk akun Anda (minimal 8 karakter).
        </p>
        <div className="gold-rule mt-4" />
        {status === "checking" ? (
          <Skeleton className="mt-7 h-40 w-full" />
        ) : status === "invalid" ? (
          <div className="mt-7 space-y-4 text-sm">
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive"
            >
              Tautan atur ulang tidak valid atau sudah kedaluwarsa. Silakan minta tautan baru.
            </p>
            <Button asChild className="w-full">
              <Link to="/lupa-password">Minta tautan baru</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="password">Password baru</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Ulangi password baru</Label>
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                className="h-11"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              <KeyRound /> {loading ? "Menyimpan…" : "Simpan password"}
            </Button>
          </form>
        )}
      </div>
      <Link
        to="/masuk"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Kembali ke halaman masuk
      </Link>
    </AuthShell>
  );
}
