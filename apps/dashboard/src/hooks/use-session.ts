import { createBrowserClient } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
export function useSession() {
  const supabase = createBrowserClient();
  return useQuery({
    queryKey: ["session"],
    queryFn: () => supabase.auth.getSession(),
  });
}
