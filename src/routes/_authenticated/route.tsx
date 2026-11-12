import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { currentUserQuery } from "@/lib/auth/auth-service";

/** Semua halaman di bawah layout ini hanya untuk pengguna yang sudah masuk. */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.fetchQuery(currentUserQuery);
    if (!user) throw redirect({ to: "/masuk", search: { redirect: location.href } });
    return { user };
  },
  component: () => <Outlet />,
});
