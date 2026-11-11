import type { Role } from "./roles";

/**
 * Titik integrasi autentikasi.
 * Tahap 1: belum ada backend, sehingga setiap fungsi menolak dengan pesan jujur.
 * Tahap berikutnya: ganti isi fungsi dengan pemanggilan Lovable Cloud (auth + tabel peran).
 */

export interface SignInCredentials {
  identifier: string; // email atau username
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export class AuthNotConfiguredError extends Error {
  constructor() {
    super(
      "Sistem login belum diaktifkan. Portal ini masih dalam tahap pembangunan tampilan; akun akan tersedia setelah sistem terhubung.",
    );
    this.name = "AuthNotConfiguredError";
  }
}

export async function signIn(_credentials: SignInCredentials): Promise<AuthUser> {
  throw new AuthNotConfiguredError();
}

export async function requestPasswordReset(_email: string): Promise<void> {
  throw new AuthNotConfiguredError();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return null;
}
