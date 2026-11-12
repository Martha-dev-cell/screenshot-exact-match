import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

import { parseRole, type Role } from "./roles";

/** Layanan autentikasi portal (Supabase Auth + tabel profiles). */

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function friendlyAuthMessage(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email atau password salah.";
  if (m.includes("email not confirmed"))
    return "Email belum dikonfirmasi. Periksa kotak masuk email Anda.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.";
  if (m.includes("should be at least") || m.includes("password should"))
    return "Password minimal 6 karakter.";
  if (m.includes("same") && m.includes("password"))
    return "Password baru harus berbeda dari password lama.";
  return "Terjadi kendala. Silakan coba lagi.";
}

/** Ambil profil pengguna yang sedang masuk. Mengembalikan null bila belum masuk atau akun nonaktif. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw new AuthError("Gagal memuat profil akun. Silakan muat ulang halaman.");
  if (!profile || !profile.is_active) {
    await supabase.auth.signOut();
    return null;
  }

  return {
    id: profile.id,
    name: profile.full_name,
    email: profile.email ?? user.email ?? "",
    phone: profile.phone,
    role: parseRole(profile.role),
  };
}

export const currentUserQuery = queryOptions({
  queryKey: ["auth", "current-user"],
  queryFn: getCurrentUser,
  staleTime: 60_000,
});

export async function signIn({ email, password }: SignInCredentials): Promise<AuthUser> {
  if (!isValidEmail(email)) throw new AuthError("Masukkan alamat email yang valid.");
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new AuthError(friendlyAuthMessage(error.message));

  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError("Akun Anda belum aktif atau telah dinonaktifkan. Hubungi pengurus KKG.");
  }
  return user;
}

export async function requestPasswordReset(email: string): Promise<void> {
  if (!isValidEmail(email)) throw new AuthError("Masukkan alamat email yang valid.");
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw new AuthError(friendlyAuthMessage(error.message));
}

export async function updatePassword(password: string): Promise<void> {
  if (password.length < 8) throw new AuthError("Password minimal 8 karakter.");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new AuthError(friendlyAuthMessage(error.message));
}
