import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BookMarked,
  ClipboardCheck,
  Cpu,
  MessageCircle,
  PenSquare,
  Sprout,
  Users2,
  Baby,
} from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/forum")({
  head: () =>
    pageHead(
      "Forum Guru",
      "Ruang diskusi guru KKG Gugus 01 Bluto untuk berbagi praktik baik dan solusi pembelajaran.",
    ),
  component: ForumPage,
});

const categories = [
  {
    icon: BookMarked,
    title: "Kurikulum Merdeka",
    desc: "CP, ATP, modul ajar, dan implementasi kurikulum.",
  },
  {
    icon: Baby,
    title: "Pembelajaran Kelas Rendah",
    desc: "Strategi mengajar kelas 1–3, calistung, dan literasi awal.",
  },
  {
    icon: Sprout,
    title: "Pembelajaran Kelas Tinggi",
    desc: "Pembelajaran kelas 4–6, proyek, dan numerasi.",
  },
  {
    icon: ClipboardCheck,
    title: "Asesmen & Penilaian",
    desc: "Asesmen diagnostik, formatif, sumatif, dan rapor.",
  },
  {
    icon: Cpu,
    title: "Teknologi Pendidikan",
    desc: "Media digital, platform belajar, dan aplikasi kelas.",
  },
  { icon: Users2, title: "Diskusi Umum", desc: "Obrolan seputar profesi guru dan kegiatan gugus." },
];

function ForumPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/forum"
        description="Tempat guru bertanya, berbagi pengalaman, dan saling menguatkan dalam mengajar."
        actions={
          <Button asChild variant="gold" size="lg">
            <Link to="/masuk">
              <PenSquare /> Buat Topik Baru
            </Link>
          </Button>
        }
      />
      <section className="py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Kategori"
            title="Ruang Diskusi"
            description="Anggota perlu masuk ke portal untuk membuat topik dan membalas diskusi."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <article
                key={c.title}
                className="flex flex-col rounded-xl border bg-card p-6 shadow-card"
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <c.icon className="size-6" />
                </span>
                <h3 className="text-lg font-bold text-primary">{c.title}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                  <MessageCircle className="size-4" /> Belum ada topik diskusi
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
