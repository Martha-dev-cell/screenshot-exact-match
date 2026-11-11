import { ClientOnly } from "@tanstack/react-router";
import { id as localeId } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";

/** Kalender kegiatan. Agenda diambil dari tabel kegiatan setelah sistem terhubung. */
export function ActivityCalendar() {
  return (
    <div className="grid gap-6 rounded-2xl border bg-card p-4 shadow-card md:grid-cols-[auto_1fr] md:p-6">
      <ClientOnly fallback={<Skeleton className="h-[19rem] w-full md:w-[18rem]" />}>
        <CalendarInner />
      </ClientOnly>
      <div className="flex flex-col">
        <h3 className="mb-1 text-lg font-bold text-primary">Agenda Terjadwal</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Pilih tanggal untuk melihat kegiatan pada hari tersebut.
        </p>
        <EmptyState
          compact
          className="flex-1"
          icon={CalendarDays}
          title="Belum ada agenda terjadwal"
          description="Jadwal kegiatan KKG akan ditampilkan di sini setelah diumumkan oleh pengurus."
        />
      </div>
    </div>
  );
}

function CalendarInner() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      locale={localeId}
      selected={selected}
      onSelect={setSelected}
      className="mx-auto rounded-xl border [--cell-size:2.4rem]"
    />
  );
}
