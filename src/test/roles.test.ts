import { describe, expect, it } from "vitest";

import { canAccess, canManageAccounts, modulesFor, parseRole } from "@/lib/auth/roles";

describe("Hak akses per peran", () => {
  it("hanya Super Admin yang boleh mengelola akun pengguna", () => {
    expect(canManageAccounts("super_admin")).toBe(true);
    expect(canManageAccounts("pengurus")).toBe(false);
    expect(canManageAccounts("bendahara")).toBe(false);
    expect(canManageAccounts("anggota")).toBe(false);
  });

  it("Bendahara mencatat pemasukan, Pengurus dan Anggota tidak", () => {
    expect(canAccess("bendahara", "income")).toBe(true);
    expect(canAccess("pengurus", "income")).toBe(false);
    expect(canAccess("anggota", "income")).toBe(false);
  });

  it("Pengurus mengelola presensi, Anggota hanya mengisi presensi", () => {
    expect(canAccess("pengurus", "attendance_manage")).toBe(true);
    expect(canAccess("anggota", "attendance_manage")).toBe(false);
    expect(canAccess("anggota", "attendance")).toBe(true);
  });

  it("Anggota tidak melihat menu pengelolaan apa pun", () => {
    const ids = modulesFor("anggota").map((m) => m.id);
    expect(ids.some((id) => id.startsWith("manage_"))).toBe(false);
  });

  it("peran tak dikenal dari database diperlakukan sebagai anggota", () => {
    expect(parseRole("super_admin")).toBe("super_admin");
    expect(parseRole("admin")).toBe("anggota");
    expect(parseRole(null)).toBe("anggota");
  });
});
