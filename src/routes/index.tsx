import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  FileText,
  LogIn,
  Megaphone,
  Quote,
  School,
  UserRound,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-guru.jpg";
import { LogoMark } from "@/components/brand/Logo";
import { EmptyState } from "@/components/common/EmptyState";
import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatCard } from "@/components/common/StatCard";
import { ActivityCalendar } from "@/components/home/ActivityCalendar";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mainNav, site } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      site.portalName,
      "Portal resmi KKG Gugus 01 Kecamatan Bluto, Sumenep: pengumuman, kegiatan, bank perangkat ajar, dan forum guru SD.",
    ),
  component: HomePage,
});

function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Stats />
      <Welcome />
      <LatestInfo />
      <QuickAccess />
      <section className="bg-surface py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Agenda"
            title="Kalender Kegiatan"
            description="Pantau jadwal KKG, lokakarya, dan pertemuan rutin gugus."
            action={
              <Button asChild variant="outline">
                <Link to="/kegiatan">
                  Program dan Kegiatan <ArrowRight />
                </Link>
              </Button>
            }
          />
          <ActivityCalendar />
        </div>
      </section>
    </PublicLayout>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-navy-foreground">
      <img
        src={heroImage}
        alt="Guru-guru KKG berdiskusi menyusun perangkat ajar"
        width={1600}
        height={1008}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden />
      <div className="container-page grid min-h-[34rem] items-center py-16 md:min-h-[38rem]">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-6 flex items-center gap-4">
            <LogoMark className="h-16" />
            <Badge variant="onNavy" className="px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em]">
              Portal Digital Resmi
            </Badge>
          </div>
          <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            KKG Gugus 01 <span className="block text-gold">Kecamatan Bluto</span>
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-navy-muted">
            {site.regency} · {site.province}
          </p>
          <p className="mt-6 max-w-xl border-l-2 border-gold pl-4 text-lg leading-relaxed text-navy-foreground/90 md:text-xl">
            “{site.slogan}”
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold">
              <Link to="/profil">
                Kenali KKG Kami <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="heroOutline">
              <Link to="/masuk">
                <LogIn /> Masuk Portal
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { icon: Users, label: "Anggota Guru" },
    { icon: School, label: "Sekolah" },
    { icon: CalendarDays, label: "Kegiatan" },
    { icon: FileText, label: "Dokumen" },
  ];
  return (
    <section className="relative z-10 -mt-12">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={null} hint="Menunggu data terhubung" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold/50" aria-hidden />
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-3xl bg-navy-gradient text-navy-muted shadow-elegant">
            <UserRound className="size-24 text-navy-foreground/30" strokeWidth={1.2} />
            <span className="text-xs uppercase tracking-[0.16em]">Foto Ketua KKG</span>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Sambutan" title="Sambutan Ketua KKG Gugus 01" className="mb-6" />
          <Quote className="mb-4 size-10 text-gold" />
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-foreground/85">
            <p>
              Assalamu’alaikum warahmatullahi wabarakatuh. Selamat datang di Portal Digital KKG Gugus 01
              Kecamatan Bluto. Portal ini kami hadirkan sebagai rumah bersama bagi seluruh guru untuk
              berbagi informasi, berdiskusi, dan saling menguatkan dalam mengembangkan pembelajaran.
            </p>
            <p>
              Melalui semangat bersatu, berbagi, dan berinovasi, mari kita jadikan KKG sebagai ruang
              tumbuh yang nyata — tempat praktik baik dari satu kelas dapat menginspirasi kelas-kelas lain
              di seluruh gugus.
            </p>
          </div>
          <div className="mt-6 border-t pt-5">
            <p className="font-bold text-primary">Ketua KKG Gugus 01</p>
            <p className="text-sm text-muted-foreground">Kecamatan Bluto, Kabupaten Sumenep</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestInfo() {
  return (
    <section className="border-y bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Informasi Terkini"
          title="Pengumuman, Kegiatan & Dokumen"
          description="Kabar terbaru dari pengurus dan anggota KKG Gugus 01."
        />
        <IntegrationNotice className="mb-8" />
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoColumn
            title="Pengumuman Terbaru"
            to="/berita"
            emptyIcon={Megaphone}
            emptyTitle="Belum ada pengumuman"
            emptyText="Pengumuman resmi dari pengurus akan tampil di sini."
          />
          <InfoColumn
            title="Kegiatan Terbaru"
            to="/kegiatan"
            emptyIcon={CalendarDays}
            emptyTitle="Belum ada kegiatan"
            emptyText="Laporan dan dokumentasi kegiatan terbaru akan tampil di sini."
          />
          <InfoColumn
            title="Dokumen Pembelajaran"
            to="/perangkat-ajar"
            emptyIcon={BookOpenCheck}
            emptyTitle="Belum ada dokumen"
            emptyText="Modul ajar, ATP, dan asesmen yang dibagikan anggota akan tampil di sini."
          />
        </div>
      </div>
    </section>
  );
}

function InfoColumn({
  title,
  to,
  emptyIcon,
  emptyTitle,
  emptyText,
}: {
  title: string;
  to: "/berita" | "/kegiatan" | "/perangkat-ajar";
  emptyIcon: typeof Megaphone;
  emptyTitle: string;
  emptyText: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <Link to={to} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Lihat semua <ArrowRight className="size-4" />
        </Link>
      </div>
      <EmptyState compact className="flex-1" icon={emptyIcon} title={emptyTitle} description={emptyText} />
    </div>
  );
}

function QuickAccess() {
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Layanan Portal"
          title="Akses Cepat untuk Guru"
          description="Semua layanan KKG dalam satu tempat. Pilih menu yang Anda butuhkan."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {mainNav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-gold">
                <item.icon className="size-6" />
              </span>
              <span>
                <span className="block font-bold text-foreground">{item.title}</span>
                <span className="mt-1 block text-sm leading-snug text-muted-foreground">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
