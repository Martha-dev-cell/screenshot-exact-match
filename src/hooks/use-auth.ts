import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

import { supabase } from "@/integrations/supabase/client";
import { currentUserQuery } from "@/lib/auth/auth-service";

/** Pengguna yang sedang masuk (null bila belum masuk). */
export function useCurrentUser() {
  return useQuery(currentUserQuery);
}

/** Dipasang sekali di root: segarkan data akun saat status login berubah. */
export function useAuthListener() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        // Jangan memanggil Supabase langsung di dalam callback ini.
        setTimeout(() => {
          void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
        }, 0);
      }
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient]);
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/masuk", replace: true });
  }, [queryClient, navigate]);
}
