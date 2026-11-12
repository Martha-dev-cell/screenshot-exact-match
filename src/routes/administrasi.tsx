import { createFileRoute } from "@tanstack/react-router";
import {
  FileCheck2,
  FileSignature,
  FileText,
  Inbox,
  ListChecks,
  Lock,
  ScrollText,
  Send,
} from "lucide-react";

import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/administrasi")({
  head: () =>
    pageHead(
      "Administrasi KKG",
      "Arsip surat, notulen, SK, dan dokumen administrasi KKG Gugus 01 Bluto.",
    ),
  component: AdministrasiPage,
});

const groups = [
  {
    icon: FileSignature,
    title: "SK Pengurus",
    desc: "Surat keputusan kepengurusan KKG.",
    access: "Publik",
  },
  {
    icon: ScrollText,
    title: "Program Kerja",
    desc: "Rencana program tahunan dan semesteran.",
    access: "Publik",
  },
  {
    icon: FileText,
    title: "Notulen Rapat",
    desc: "Catatan hasil rapat dan pertemuan rutin.",
    access: "Anggota",
  },
  {
    icon: ListChecks,
    title: "Daftar Hadir",
    desc: "Rekap presensi kegiatan anggota.",
    access: "Pengurus",
  },
  { icon: Inbox, title: "Surat Masuk", desc: "Arsip surat yang diterima KKG.", access: "Pengurus" },
  {
    icon: Send,
    title: "Surat Keluar",
    desc: "Arsip surat yang diterbitkan KKG.",
    access: "Pengurus",
  },
  {
    icon: FileCheck2,
    title: "Laporan Pertanggungjawaban",
    desc: "LPJ kegiatan dan kepengurusan.",
    access: "Anggota",
  },
];

function AdministrasiPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/administrasi"
        description="Pusat arsip dokumen organisasi yang tertib, rapi, dan mudah ditelusuri."
      />
      <section className="py-14">
        <div className="container-page space-y-6">
          <IntegrationNotice>
            Hak akses dokumen mengikuti peran pengguna. Dokumen akan tersedia setelah sistem
            penyimpanan dan login terhubung.
          </IntegrationNotice>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <article
                key={g.title}
                className="flex gap-4 rounded-xl border bg-card p-5 shadow-card"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <g.icon className="size-6" />
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-primary">{g.title}</h3>
                    <Badge
                      variant={g.access === "Publik" ? "soft" : "gold"}
                      className="shrink-0 gap-1"
                    >
                      {g.access !== "Publik" ? <Lock className="size-3" /> : null}
                      {g.access}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                  <p className="mt-3 text-xs text-muted-foreground">Belum ada dokumen</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
