import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthNotConfiguredError, signIn } from "@/lib/auth/auth-service";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/masuk")({
  head: () => pageHead("Masuk Portal", "Masuk ke Portal Digital KKG Gugus 01 Kecamatan Bluto untuk anggota dan pengurus."),
  component: MasukPage,
});

function MasukPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!identifier.trim() || !password) {
      setError("Email/username dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await signIn({ identifier: identifier.trim(), password });
    } catch (err) {
      setError(err instanceof AuthNotConfiguredError ? err.message : "Gagal masuk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border bg-card p-7 shadow-elegant md:p-9">
        <h2 className="font-display text-3xl text-primary">Selamat datang</h2>
        <p className="mt-1 text-sm text-muted-foreground">Masuk untuk mengakses layanan anggota KKG.</p>
        <div className="gold-rule mt-4" />
        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="identifier">Email atau username</Label>
            <Input
              id="identifier"
              autoComplete="username"
              className="h-11"
              placeholder="nama@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/lupa-password" className="text-xs font-semibold text-primary hover:underline">
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                className="h-11 pr-11"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-primary"
                aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {error ? <IntegrationNotice>{error}</IntegrationNotice> : null}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            <LogIn /> {loading ? "Memproses…" : "Masuk"}
          </Button>
        </form>
      </div>
      <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Kembali ke beranda
      </Link>
    </AuthShell>
  );
}
