import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/galeri")({
  head: () =>
    pageHead(
      "Galeri Kegiatan",
      "Dokumentasi foto dan video kegiatan KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: GaleriPage,
});

const albums = ["Semua", "Pertemuan Rutin", "Lokakarya", "Lomba", "Kunjungan"];

function GaleriPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/galeri"
        description="Jejak kebersamaan dan semangat belajar guru-guru Gugus 01 dalam gambar."
      />
      <section className="py-14">
        <div className="container-page">
          <Tabs defaultValue="Semua">
            <TabsList className="h-auto flex-wrap justify-start">
              {albums.map((a) => (
                <TabsTrigger key={a} value={a} className="px-4 py-1.5">
                  {a}
                </TabsTrigger>
              ))}
            </TabsList>
            {albums.map((a) => (
              <TabsContent key={a} value={a} className="mt-8">
                <EmptyState
                  icon={ImageIcon}
                  title="Belum ada dokumentasi"
                  description="Foto dan video kegiatan yang diunggah pengurus akan tampil dalam album ini."
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
}
