import { getCurrentUser } from "@optima/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";

export function useCurrentUser() {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data, error } = await getCurrentUser(supabase);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
