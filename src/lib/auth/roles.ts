import {
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  CalendarCheck2,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileBarChart,
  FolderCog,
  History,
  Landmark,
  Lightbulb,
  MessagesSquare,
  Newspaper,
  Receipt,
  Settings,
  ShieldCheck,
  UserCircle,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Peran pengguna portal. Nilai ini nantinya disimpan di tabel peran terpisah
 * (bukan di profil) dan diperiksa di sisi server untuk setiap aksi.
 */
export const ROLES = ["super_admin", "pengurus", "bendahara", "anggota"] as const;
export type Role = (typeof ROLES)[number];

export interface RoleMeta {
  role: Role;
  label: string;
  slug: string;
  summary: string;
  icon: LucideIcon;
}

export const ROLE_META: Record<Role, RoleMeta> = {
  super_admin: {
    role: "super_admin",
    label: "Super Admin",
    slug: "super-admin",
    summary: "Mengelola seluruh sistem, akun, konten, dan pengaturan portal.",
    icon: ShieldCheck,
  },
  pengurus: {
    role: "pengurus",
    label: "Pengurus KKG",
    slug: "pengurus",
    summary: "Mengelola kegiatan, informasi, dokumen, dan administrasi KKG.",
    icon: UserCog,
  },
  bendahara: {
    role: "bendahara",
    label: "Bendahara",
    slug: "bendahara",
    summary: "Mencatat kas, iuran, dan menyusun laporan keuangan.",
    icon: Wallet,
  },
  anggota: {
    role: "anggota",
    label: "Guru / Anggota",
    slug: "anggota",
    summary: "Berdiskusi, berbagi perangkat ajar, dan mengikuti kegiatan.",
    icon: UserCircle,
  },
};

export type ModuleId =
  | "site_stats"
  | "manage_users"
  | "manage_members"
  | "manage_board"
  | "manage_news"
  | "manage_forum"
  | "manage_documents"
  | "manage_activities"
  | "manage_finance"
  | "site_settings"
  | "attendance_manage"
  | "administration"
  | "aspiration_inbox"
  | "cash_summary"
  | "income"
  | "expenses"
  | "dues"
  | "finance_reports"
  | "my_profile"
  | "forum"
  | "teaching_materials"
  | "activity_info"
  | "attendance"
  | "aspiration_submit"
  | "activity_history"
  | "published_finance";

export interface DashboardModule {
  id: ModuleId;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const MODULES: Record<ModuleId, DashboardModule> = {
  site_stats: { id: "site_stats", title: "Statistik Website", description: "Ringkasan anggota, kunjungan, dokumen, dan aktivitas portal.", icon: BarChart3 },
  manage_users: { id: "manage_users", title: "Manajemen Akun Pengguna", description: "Buat, nonaktifkan, dan atur peran akun pengguna.", icon: UserCog },
  manage_members: { id: "manage_members", title: "Manajemen Anggota", description: "Kelola data guru dan sekolah anggota gugus.", icon: Users },
  manage_board: { id: "manage_board", title: "Manajemen Pengurus", description: "Atur susunan dan masa bakti pengurus KKG.", icon: Landmark },
  manage_news: { id: "manage_news", title: "Berita & Pengumuman", description: "Tulis, jadwalkan, dan terbitkan informasi resmi.", icon: Newspaper },
  manage_forum: { id: "manage_forum", title: "Manajemen Forum", description: "Moderasi topik, kategori, dan balasan diskusi.", icon: MessagesSquare },
  manage_documents: { id: "manage_documents", title: "Manajemen Dokumen", description: "Verifikasi dan kelola bank perangkat ajar.", icon: FolderCog },
  manage_activities: { id: "manage_activities", title: "Manajemen Kegiatan", description: "Susun program kerja dan agenda kegiatan.", icon: CalendarDays },
  manage_finance: { id: "manage_finance", title: "Manajemen Keuangan", description: "Pantau kas, iuran, dan laporan keuangan.", icon: Wallet },
  site_settings: { id: "site_settings", title: "Pengaturan Website", description: "Identitas, logo, menu, dan konfigurasi portal.", icon: Settings },
  attendance_manage: { id: "attendance_manage", title: "Kelola Presensi", description: "Buka sesi presensi dan rekap kehadiran kegiatan.", icon: ClipboardCheck },
  administration: { id: "administration", title: "Administrasi KKG", description: "Surat masuk/keluar, notulen, dan arsip organisasi.", icon: ClipboardList },
  aspiration_inbox: { id: "aspiration_inbox", title: "Kotak Aspirasi", description: "Tinjau dan tindak lanjuti aspirasi anggota.", icon: Lightbulb },
  cash_summary: { id: "cash_summary", title: "Ringkasan Kas", description: "Posisi saldo dan arus kas terkini.", icon: BarChart3 },
  income: { id: "income", title: "Pemasukan", description: "Catat iuran, bantuan, dan pemasukan lain.", icon: Receipt },
  expenses: { id: "expenses", title: "Pengeluaran", description: "Catat belanja kegiatan beserta bukti transaksi.", icon: Receipt },
  dues: { id: "dues", title: "Iuran Anggota", description: "Pantau status iuran setiap anggota.", icon: BadgeCheck },
  finance_reports: { id: "finance_reports", title: "Laporan & Publikasi", description: "Susun laporan periodik dan publikasikan ke anggota.", icon: FileBarChart },
  my_profile: { id: "my_profile", title: "Profil Pribadi", description: "Data diri, sekolah, dan kelas yang diampu.", icon: UserCircle },
  forum: { id: "forum", title: "Forum Diskusi", description: "Ikuti diskusi dan berbagi praktik baik.", icon: MessagesSquare },
  teaching_materials: { id: "teaching_materials", title: "Perangkat Ajar", description: "Unggah dan unduh modul ajar, ATP, dan asesmen.", icon: BookOpenCheck },
  activity_info: { id: "activity_info", title: "Informasi Kegiatan", description: "Agenda kegiatan KKG yang akan datang.", icon: CalendarDays },
  attendance: { id: "attendance", title: "Presensi Kegiatan", description: "Isi kehadiran pada kegiatan yang sedang berlangsung.", icon: CalendarCheck2 },
  aspiration_submit: { id: "aspiration_submit", title: "Aspirasi & Saran", description: "Sampaikan ide dan masukan untuk KKG.", icon: Lightbulb },
  activity_history: { id: "activity_history", title: "Riwayat Kegiatan", description: "Daftar kegiatan yang pernah Anda ikuti.", icon: History },
  published_finance: { id: "published_finance", title: "Laporan Keuangan", description: "Laporan keuangan yang telah dipublikasikan.", icon: Wallet },
};

/** Modul yang tampil di dashboard tiap peran. */
export const ROLE_MODULES: Record<Role, ModuleId[]> = {
  super_admin: [
    "site_stats",
    "manage_users",
    "manage_members",
    "manage_board",
    "manage_news",
    "manage_forum",
    "manage_documents",
    "manage_activities",
    "manage_finance",
    "site_settings",
  ],
  pengurus: [
    "manage_activities",
    "attendance_manage",
    "manage_news",
    "manage_documents",
    "manage_forum",
    "administration",
    "manage_members",
    "aspiration_inbox",
  ],
  bendahara: [
    "cash_summary",
    "income",
    "expenses",
    "dues",
    "finance_reports",
    "my_profile",
    "activity_info",
  ],
  anggota: [
    "my_profile",
    "forum",
    "teaching_materials",
    "activity_info",
    "attendance",
    "aspiration_submit",
    "activity_history",
    "published_finance",
  ],
};

export function canAccess(role: Role, moduleId: ModuleId): boolean {
  return ROLE_MODULES[role].includes(moduleId);
}

export function modulesFor(role: Role): DashboardModule[] {
  return ROLE_MODULES[role].map((id) => MODULES[id]);
}

export function roleFromSlug(slug: string): Role | null {
  const found = ROLES.find((r) => ROLE_META[r].slug === slug);
  return found ?? null;
}
