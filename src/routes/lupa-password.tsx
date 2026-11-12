import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MailCheck, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthError, requestPasswordReset } from "@/lib/auth/auth-service";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lupa-password")({
  head: () =>
    pageHead(
      "Lupa Password",
      "Atur ulang password akun Portal Digital KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: LupaPasswordPage,
});

function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Permintaan gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border bg-card p-7 shadow-elegant md:p-9">
        <h2 className="font-display text-3xl text-primary">Lupa password</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Masukkan email terdaftar. Tautan atur ulang password akan dikirim ke email Anda.
        </p>
        <div className="gold-rule mt-4" />
        {sent ? (
          <div
            role="status"
            className="mt-7 flex items-start gap-3 rounded-xl border bg-secondary px-4 py-4 text-sm"
          >
            <MailCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="leading-relaxed">
              Jika email <strong>{email.trim()}</strong> terdaftar, tautan atur ulang password sudah
              dikirim. Periksa kotak masuk atau folder spam.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="h-11"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Mail /> {loading ? "Mengirim…" : "Kirim tautan"}
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
