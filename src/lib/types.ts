/**
 * Tipe data domain portal. Struktur ini menjadi acuan saat membuat tabel
 * di database (Lovable Cloud) pada tahap integrasi.
 */

export interface School {
  id: string;
  name: string;
  npsn: string;
  address: string;
}

export interface Member {
  id: string;
  fullName: string;
  nip: string | null;
  schoolId: string;
  position: string; // mis. Guru Kelas 3
  photoUrl: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  kind: "berita" | "pengumuman";
  coverUrl: string | null;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  location: string;
  program: string;
}

export interface TeachingDocument {
  id: string;
  title: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  subject: string;
  kind: "modul_ajar" | "atp" | "cp" | "asesmen" | "media" | "lainnya";
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  authorId: string;
  createdAt: string;
  replyCount: number;
}

export interface FinanceEntry {
  id: string;
  date: string;
  description: string;
  type: "pemasukan" | "pengeluaran";
  amount: number;
  receiptUrl: string | null;
}

export interface Aspiration {
  id: string;
  category: string;
  message: string;
  isAnonymous: boolean;
  createdAt: string;
  status: "baru" | "ditinjau" | "ditindaklanjuti";
}
