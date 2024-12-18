import { createBrowserClient } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
export function useSession() {
  const supabase = createBrowserClient();
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return data.session;
    },
  });
}
