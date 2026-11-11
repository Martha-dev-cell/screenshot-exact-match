import { Link, createFileRoute } from "@tanstack/react-router";
import { FileStack, Search, Upload } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/perangkat-ajar")({
  head: () =>
    pageHead("Bank Perangkat Ajar", "Kumpulan modul ajar, ATP, CP, asesmen, dan media pembelajaran guru KKG Gugus 01 Bluto."),
  component: PerangkatAjarPage,
});

const kinds = [
  { value: "semua", label: "Semua" },
  { value: "modul_ajar", label: "Modul Ajar" },
  { value: "atp", label: "ATP" },
  { value: "cp", label: "CP" },
  { value: "asesmen", label: "Asesmen" },
  { value: "media", label: "Media Ajar" },
];

function PerangkatAjarPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/perangkat-ajar"
        description="Perpustakaan digital perangkat ajar karya guru-guru Gugus 01 — siap diunduh dan dikembangkan."
        actions={
          <Button asChild variant="gold" size="lg">
            <Link to="/masuk">
              <Upload /> Unggah Perangkat
            </Link>
          </Button>
        }
      />
      <section className="py-14">
        <div className="container-page space-y-6">
          <IntegrationNotice>
            Unggah dan unduh dokumen akan aktif setelah penyimpanan dokumen terhubung. Hanya anggota yang masuk yang
            dapat mengunggah.
          </IntegrationNotice>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari judul atau mata pelajaran…" className="h-11 pl-9" aria-label="Cari perangkat ajar" />
            </div>
            <Select>
              <SelectTrigger className="h-11 md:w-44" aria-label="Pilih kelas">
                <SelectValue placeholder="Semua kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua kelas</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <SelectItem key={k} value={String(k)}>
                    Kelas {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="semua">
            <TabsList className="h-auto flex-wrap justify-start">
              {kinds.map((k) => (
                <TabsTrigger key={k.value} value={k.value} className="px-4 py-1.5">
                  {k.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {kinds.map((k) => (
              <TabsContent key={k.value} value={k.value} className="mt-6">
                <EmptyState
                  icon={FileStack}
                  title={k.value === "semua" ? "Belum ada perangkat ajar" : `Belum ada ${k.label}`}
                  description="Perangkat ajar yang dibagikan anggota akan tampil di sini lengkap dengan kelas, mapel, dan penyusunnya."
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
}
