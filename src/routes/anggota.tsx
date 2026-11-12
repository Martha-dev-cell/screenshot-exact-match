import { createFileRoute } from "@tanstack/react-router";
import { Search, Users } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { IntegrationNotice } from "@/components/common/IntegrationNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/anggota")({
  head: () =>
    pageHead("Data Anggota", "Daftar guru dan sekolah anggota KKG Gugus 01 Kecamatan Bluto."),
  component: AnggotaPage,
});

function AnggotaPage() {
  return (
    <PublicLayout>
      <PageHeader
        path="/anggota"
        description="Direktori guru anggota KKG Gugus 01 beserta sekolah dan tugas mengajarnya."
      />
      <section className="py-14">
        <div className="container-page space-y-6">
          <IntegrationNotice />
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-card md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama guru atau NIP…"
                className="h-11 pl-9"
                aria-label="Cari anggota"
              />
            </div>
            <Select>
              <SelectTrigger className="h-11 md:w-56" aria-label="Filter sekolah">
                <SelectValue placeholder="Semua sekolah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua sekolah</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-11 md:w-44" aria-label="Filter kelas">
                <SelectValue placeholder="Semua kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua kelas</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <SelectItem key={k} value={String(k)}>
                    Kelas {k}
                  </SelectItem>
                ))}
                <SelectItem value="mapel">Guru Mapel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card shadow-card">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Nama Guru</TableHead>
                  <TableHead className="hidden md:table-cell">NIP</TableHead>
                  <TableHead>Sekolah</TableHead>
                  <TableHead className="hidden sm:table-cell">Tugas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="p-4">
                    <EmptyState
                      compact
                      className="border-0"
                      icon={Users}
                      title="Belum ada data anggota"
                      description="Data anggota akan dikelola oleh admin dan pengurus melalui dashboard."
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
