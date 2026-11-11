import { createFileRoute } from "@tanstack/react-router";
import { Eye, Flag, School, Target, UserRound } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { site } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/profil")({
  head: () =>
    pageHead("Profil KKG", "Mengenal KKG Gugus 01 Kecamatan Bluto: tentang kami, visi, misi, dan struktur pengurus."),
  component: ProfilPage,
});

// Draf visi & misi — sesuaikan dengan dokumen resmi KKG.
const missions = [
  "Menjadi wadah komunikasi dan kolaborasi guru sekolah dasar di lingkungan gugus.",
  "Meningkatkan kompetensi pedagogik dan profesional guru secara berkelanjutan.",
  "Mendorong berbagi praktik baik dan perangkat ajar antaranggota.",
  "Mengembangkan inovasi pembelajaran yang berpihak pada murid.",
  "Menyelenggarakan administrasi organisasi yang tertib dan transparan.",
];

const board = [
  "Pembina",
  "Ketua",
  "Wakil Ketua",
  "Sekretaris",
  "Bendahara",
  "Koord. Bidang Kurikulum",
  "Koord. Bidang Pengembangan SDM",
  "Koord. Bidang Humas & TI",
];

function ProfilPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/profil"
        description="Kelompok Kerja Guru (KKG) Gugus 01 adalah wadah profesional guru sekolah dasar di Kecamatan Bluto, Kabupaten Sumenep."
      />

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Tentang Kami" title="Wadah Belajar Bersama Guru SD" />
            <div className="space-y-4 leading-relaxed text-foreground/85">
              <p>
                {site.name} merupakan forum kegiatan profesional bagi guru-guru sekolah dasar yang berada dalam
                satu gugus. KKG menjadi tempat untuk merencanakan, melaksanakan, dan merefleksikan pembelajaran
                secara bersama-sama.
              </p>
              <p>
                Melalui portal ini, seluruh informasi, dokumen, dan kegiatan KKG dapat diakses dengan mudah oleh
                anggota kapan pun dan di mana pun.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-navy-gradient p-7 text-navy-foreground shadow-elegant">
              <div className="mb-3 flex items-center gap-3 text-gold">
                <Eye className="size-5" />
                <span className="text-sm font-bold uppercase tracking-[0.16em]">Visi</span>
              </div>
              <p className="font-display text-2xl leading-snug">
                Terwujudnya guru yang bersatu, gemar berbagi, dan inovatif demi pendidikan dasar yang berkualitas.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-7 shadow-card">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <Target className="size-5 text-gold" />
                <span className="text-sm font-bold uppercase tracking-[0.16em]">Misi</span>
              </div>
              <ol className="space-y-3">
                {missions.map((m, i) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-soft text-xs font-bold text-gold-foreground">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-surface py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Organisasi"
            title="Struktur Pengurus"
            description="Susunan pengurus akan dilengkapi sesuai SK kepengurusan yang berlaku."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {board.map((role) => (
              <div key={role} className="rounded-xl border bg-card p-5 text-center shadow-card">
                <span className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-secondary text-primary/40">
                  <UserRound className="size-8" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-gold-foreground/70">{role}</p>
                <p className="mt-1 text-sm text-muted-foreground">Nama belum diisi</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Wilayah" title="Sekolah Anggota Gugus" />
          <EmptyState
            icon={School}
            title="Daftar sekolah belum tersedia"
            description="Sekolah-sekolah dasar yang tergabung dalam Gugus 01 akan ditampilkan di sini."
          />
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Flag className="size-4 text-gold" /> {site.district}, {site.regency}, {site.province}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
