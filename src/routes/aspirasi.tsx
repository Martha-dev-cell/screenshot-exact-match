import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Send, ShieldCheck } from "lucide-react";

import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/aspirasi")({
  head: () => pageHead("Aspirasi dan Saran", "Sampaikan aspirasi, ide, dan saran untuk kemajuan KKG Gugus 01 Kecamatan Bluto."),
  component: AspirasiPage,
});

const categories = ["Program & Kegiatan", "Pengembangan Kompetensi", "Administrasi", "Keuangan", "Portal Digital", "Lainnya"];

function AspirasiPage() {
  return (
    <PublicLayout>
      <PageHeader path="/aspirasi" description="Suara Anda penting. Sampaikan ide dan masukan untuk KKG yang lebih baik." />
      <section className="py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form
            className="space-y-5 rounded-2xl border bg-card p-6 shadow-card md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="asp-nama">Nama</Label>
                <Input id="asp-nama" placeholder="Nama lengkap" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asp-kategori">Kategori</Label>
                <Select>
                  <SelectTrigger id="asp-kategori" className="h-11">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="asp-isi">Aspirasi atau saran</Label>
              <Textarea id="asp-isi" rows={6} placeholder="Tuliskan aspirasi atau saran Anda…" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="asp-anon" />
              <Label htmlFor="asp-anon" className="font-normal text-muted-foreground">
                Kirim tanpa menampilkan nama
              </Label>
            </div>
            <IntegrationNotice>
              Pengiriman aspirasi belum aktif. Formulir ini akan dapat dikirim setelah sistem penyimpanan terhubung.
            </IntegrationNotice>
            <Button type="submit" size="lg" disabled>
              <Send /> Kirim Aspirasi
            </Button>
          </form>
          <aside className="space-y-4">
            <div className="rounded-2xl bg-navy-gradient p-7 text-navy-foreground shadow-elegant">
              <Lightbulb className="mb-4 size-8 text-gold" />
              <h3 className="font-display text-2xl">Setiap ide berarti</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-muted">
                Aspirasi akan ditinjau oleh pengurus dan ditindaklanjuti dalam rapat KKG.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border bg-card p-5 text-sm">
              <ShieldCheck className="size-5 shrink-0 text-gold" />
              <p className="text-muted-foreground">
                Identitas pengirim anonim hanya dapat dilihat oleh Super Admin untuk keperluan verifikasi.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
