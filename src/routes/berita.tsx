import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Newspaper } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/berita")({
  head: () => pageHead("Berita dan Pengumuman", "Berita kegiatan dan pengumuman resmi KKG Gugus 01 Kecamatan Bluto."),
  component: BeritaPage,
});

function BeritaPage() {
  return (
    <PublicLayout>
      <PageHeader path="/berita" description="Informasi resmi, kabar kegiatan, dan pengumuman penting untuk seluruh anggota." />
      <section className="py-14">
        <div className="container-page">
          <Tabs defaultValue="pengumuman">
            <TabsList className="h-11">
              <TabsTrigger value="pengumuman" className="px-5">
                <Megaphone className="mr-2 size-4" /> Pengumuman
              </TabsTrigger>
              <TabsTrigger value="berita" className="px-5">
                <Newspaper className="mr-2 size-4" /> Berita
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pengumuman" className="mt-8">
              <EmptyState
                icon={Megaphone}
                title="Belum ada pengumuman"
                description="Pengumuman yang diterbitkan pengurus akan tampil di sini, diurutkan dari yang terbaru."
              />
            </TabsContent>
            <TabsContent value="berita" className="mt-8">
              <EmptyState
                icon={Newspaper}
                title="Belum ada berita"
                description="Liputan kegiatan dan kabar dari sekolah anggota akan tampil di sini."
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
}
