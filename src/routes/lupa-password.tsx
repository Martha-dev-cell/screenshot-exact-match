import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthNotConfiguredError, requestPasswordReset } from "@/lib/auth/auth-service";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lupa-password")({
  head: () => pageHead("Lupa Password", "Atur ulang password akun Portal Digital KKG Gugus 01 Kecamatan Bluto."),
  component: LupaPasswordPage,
});

function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Email wajib diisi.");
      return;
    }
    try {
      await requestPasswordReset(email.trim());
    } catch (err) {
      setMessage(err instanceof AuthNotConfiguredError ? err.message : "Permintaan gagal. Silakan coba lagi.");
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
        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="h-11" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {message ? <IntegrationNotice>{message}</IntegrationNotice> : null}
          <Button type="submit" size="lg" className="w-full">
            <Mail /> Kirim tautan
          </Button>
        </form>
      </div>
      <Link to="/masuk" className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Kembali ke halaman masuk
      </Link>
    </AuthShell>
  );
}
