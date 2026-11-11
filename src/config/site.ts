import {
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  Home,
  Images,
  Landmark,
  Lightbulb,
  MessagesSquare,
  Newspaper,
  Phone,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/** Identitas organisasi. Ubah di sini agar seluruh situs ikut berubah. */
export const site = {
  shortName: "KKG Gugus 01",
  name: "KKG Gugus 01 Kecamatan Bluto",
  portalName: "Portal Digital KKG Gugus 01",
  district: "Kecamatan Bluto",
  regency: "Kabupaten Sumenep",
  province: "Jawa Timur",
  slogan: "Bersatu, Berbagi, Berinovasi untuk Pendidikan Berkualitas",
  description:
    "Pusat informasi, komunikasi, kolaborasi, administrasi, dan pengembangan kompetensi guru KKG Gugus 01 Kecamatan Bluto, Kabupaten Sumenep.",
  // Kontak resmi belum tersedia — isi saat data diterima dari pengurus.
  contact: {
    address: "Kecamatan Bluto, Kabupaten Sumenep, Jawa Timur",
    email: null as string | null,
    phone: null as string | null,
  },
} as const;

export type SitePath =
  | "/"
  | "/profil"
  | "/anggota"
  | "/forum"
  | "/perangkat-ajar"
  | "/kegiatan"
  | "/berita"
  | "/administrasi"
  | "/keuangan"
  | "/aspirasi"
  | "/galeri"
  | "/kontak";

export interface NavItem {
  title: string;
  short: string;
  to: SitePath;
  icon: LucideIcon;
  description: string;
}

export const mainNav: NavItem[] = [
  { title: "Beranda", short: "Beranda", to: "/", icon: Home, description: "Halaman utama portal" },
  {
    title: "Profil KKG",
    short: "Profil",
    to: "/profil",
    icon: Landmark,
    description: "Sejarah, visi misi, dan struktur pengurus",
  },
  {
    title: "Data Anggota",
    short: "Anggota",
    to: "/anggota",
    icon: Users,
    description: "Daftar guru dan sekolah anggota",
  },
  {
    title: "Forum Guru",
    short: "Forum",
    to: "/forum",
    icon: MessagesSquare,
    description: "Ruang diskusi dan berbagi praktik baik",
  },
  {
    title: "Bank Perangkat Ajar",
    short: "Perangkat Ajar",
    to: "/perangkat-ajar",
    icon: BookOpenCheck,
    description: "Modul ajar, ATP, asesmen, dan media",
  },
  {
    title: "Program dan Kegiatan",
    short: "Kegiatan",
    to: "/kegiatan",
    icon: CalendarDays,
    description: "Program kerja dan agenda kegiatan",
  },
  {
    title: "Berita dan Pengumuman",
    short: "Berita",
    to: "/berita",
    icon: Newspaper,
    description: "Kabar terbaru dan informasi resmi",
  },
  {
    title: "Administrasi KKG",
    short: "Administrasi",
    to: "/administrasi",
    icon: ClipboardList,
    description: "Surat, notulen, dan dokumen organisasi",
  },
  {
    title: "Laporan Keuangan",
    short: "Keuangan",
    to: "/keuangan",
    icon: Wallet,
    description: "Transparansi kas dan iuran",
  },
  {
    title: "Aspirasi dan Saran",
    short: "Aspirasi",
    to: "/aspirasi",
    icon: Lightbulb,
    description: "Sampaikan ide dan masukan",
  },
  {
    title: "Galeri Kegiatan",
    short: "Galeri",
    to: "/galeri",
    icon: Images,
    description: "Dokumentasi foto dan video",
  },
  {
    title: "Kontak",
    short: "Kontak",
    to: "/kontak",
    icon: Phone,
    description: "Alamat dan saluran komunikasi",
  },
];

export function getNavItem(to: SitePath): NavItem {
  const item = mainNav.find((n) => n.to === to);
  if (!item) throw new Error(`Menu ${to} tidak ditemukan`);
  return item;
}
