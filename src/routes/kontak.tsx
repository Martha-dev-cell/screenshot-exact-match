import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kontak")({
  head: () =>
    pageHead(
      "Kontak",
      "Alamat sekretariat dan saluran komunikasi KKG Gugus 01 Kecamatan Bluto, Sumenep.",
    ),
  component: KontakPage,
});

function KontakPage() {
  const items = [
    { icon: MapPin, label: "Alamat", value: site.contact.address },
    { icon: Mail, label: "Email", value: site.contact.email ?? "Segera diumumkan" },
    { icon: Phone, label: "Telepon / WhatsApp", value: site.contact.phone ?? "Segera diumumkan" },
  ];
  return (
    <PublicLayout>
      <PageHeader
        path="/kontak"
        description="Hubungi sekretariat KKG Gugus 01 untuk informasi dan koordinasi."
      />
      <section className="py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.label} className="flex gap-4 rounded-xl border bg-card p-5 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-gold">
                  <i.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {i.label}
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">{i.value}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-xl border shadow-card">
              <iframe
                title="Peta Kecamatan Bluto, Sumenep"
                src="https://maps.google.com/maps?q=Bluto%2C%20Sumenep%2C%20Jawa%20Timur&z=13&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
          <form
            className="space-y-5 rounded-2xl border bg-card p-6 shadow-card md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="font-display text-2xl text-primary">Kirim Pesan</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="k-nama">Nama</Label>
                <Input id="k-nama" className="h-11" placeholder="Nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-email">Email</Label>
                <Input id="k-email" type="email" className="h-11" placeholder="nama@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="k-subjek">Perihal</Label>
              <Input id="k-subjek" className="h-11" placeholder="Perihal pesan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k-pesan">Pesan</Label>
              <Textarea id="k-pesan" rows={6} placeholder="Tuliskan pesan Anda…" />
            </div>
            <IntegrationNotice>
              Pengiriman pesan belum aktif dan akan tersedia setelah sistem terhubung.
            </IntegrationNotice>
            <Button type="submit" size="lg" disabled>
              <Send /> Kirim Pesan
            </Button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
