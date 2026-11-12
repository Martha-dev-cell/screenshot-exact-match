import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownCircle, ArrowUpCircle, FileBarChart, Landmark, ShieldCheck } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatCard } from "@/components/common/StatCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/keuangan")({
  head: () =>
    pageHead(
      "Laporan Keuangan",
      "Laporan keuangan KKG Gugus 01 Kecamatan Bluto yang dipublikasikan secara transparan.",
    ),
  component: KeuanganPage,
});

function KeuanganPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/keuangan"
        description="Wujud transparansi pengelolaan kas dan iuran anggota KKG Gugus 01."
      />
      <section className="py-14">
        <div className="container-page space-y-10">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              icon={Landmark}
              label="Saldo Kas"
              value={null}
              hint="Belum ada laporan dipublikasikan"
            />
            <StatCard
              icon={ArrowDownCircle}
              label="Total Pemasukan"
              value={null}
              hint="Periode berjalan"
            />
            <StatCard
              icon={ArrowUpCircle}
              label="Total Pengeluaran"
              value={null}
              hint="Periode berjalan"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Arsip" title="Laporan Dipublikasikan" />
            <EmptyState
              icon={FileBarChart}
              title="Belum ada laporan keuangan"
              description="Laporan disusun oleh Bendahara dan hanya tampil di sini setelah dipublikasikan."
            />
          </div>
          <div className="flex items-start gap-4 rounded-2xl bg-navy-gradient p-6 text-navy-foreground md:p-8">
            <ShieldCheck className="size-8 shrink-0 text-gold" />
            <div>
              <h3 className="text-lg font-bold">Prinsip Transparansi</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-muted">
                Setiap pemasukan dan pengeluaran dicatat oleh Bendahara beserta bukti transaksi,
                lalu dipublikasikan secara berkala kepada seluruh anggota.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
