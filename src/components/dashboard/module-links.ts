import type { ModuleId } from "@/lib/auth/roles";

/** Modul yang sudah memiliki halaman. Modul lain ditandai "Segera hadir". */
export type ModulePath =
  | "/dashboard/profil"
  | "/dashboard/pengguna"
  | "/forum"
  | "/perangkat-ajar"
  | "/kegiatan"
  | "/aspirasi"
  | "/keuangan";

export const MODULE_LINKS: Partial<Record<ModuleId, ModulePath>> = {
  my_profile: "/dashboard/profil",
  manage_users: "/dashboard/pengguna",
  forum: "/forum",
  teaching_materials: "/perangkat-ajar",
  activity_info: "/kegiatan",
  aspiration_submit: "/aspirasi",
  published_finance: "/keuangan",
};
