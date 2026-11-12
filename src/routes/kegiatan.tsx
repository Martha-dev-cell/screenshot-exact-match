import { createFileRoute } from "@tanstack/react-router";
import { Award, CalendarDays, GraduationCap, Presentation, RefreshCcw, Users } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ActivityCalendar } from "@/components/home/ActivityCalendar";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kegiatan")({
  head: () =>
    pageHead(
      "Program dan Kegiatan",
      "Program kerja dan agenda kegiatan KKG Gugus 01 Kecamatan Bluto.",
    ),
  component: KegiatanPage,
});

// Bidang program — sesuaikan dengan program kerja resmi KKG.
const programs = [
  {
    icon: RefreshCcw,
    title: "Pertemuan Rutin",
    desc: "Pertemuan berkala anggota untuk berbagi dan merefleksikan pembelajaran.",
  },
  {
    icon: GraduationCap,
    title: "Pengembangan Kompetensi",
    desc: "Lokakarya, pelatihan, dan bimbingan teknis bagi guru.",
  },
  {
    icon: Presentation,
    title: "Praktik Baik & Lesson Study",
    desc: "Kegiatan observasi dan berbagi praktik pembelajaran.",
  },
  {
    icon: Award,
    title: "Lomba & Apresiasi",
    desc: "Ajang prestasi guru dan murid di tingkat gugus.",
  },
  {
    icon: Users,
    title: "Kolaborasi Sekolah",
    desc: "Kerja sama antarsekolah dan mitra pendidikan.",
  },
];

function KegiatanPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/kegiatan"
        description="Rencana program kerja dan jadwal kegiatan KKG Gugus 01 sepanjang tahun ajaran."
      />
      <section className="py-14">
        <div className="container-page">
          <SectionHeading eyebrow="Program Kerja" title="Bidang Program" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {programs.map((p) => (
              <div key={p.title} className="rounded-xl border bg-card p-5 shadow-card">
                <p.icon className="mb-3 size-7 text-gold" />
                <h3 className="font-bold text-primary">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y bg-surface py-14">
        <div className="container-page">
          <SectionHeading eyebrow="Jadwal" title="Kalender Kegiatan" />
          <ActivityCalendar />
        </div>
      </section>
      <section className="py-14">
        <div className="container-page">
          <SectionHeading eyebrow="Arsip" title="Kegiatan Terlaksana" />
          <EmptyState
            icon={CalendarDays}
            title="Belum ada kegiatan tercatat"
            description="Laporan singkat dan dokumentasi kegiatan yang telah terlaksana akan tampil di sini."
          />
        </div>
      </section>
    </PublicLayout>
  );
}
