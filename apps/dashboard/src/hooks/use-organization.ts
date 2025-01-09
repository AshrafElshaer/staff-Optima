import { getOrganizationById } from "@optima/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";

export function useOrganization() {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await getOrganizationById(
        supabase,
        user?.user_metadata.organization_id,
      );
      if (error) {
        throw error;
      }

      return data;
    },
  });
}
