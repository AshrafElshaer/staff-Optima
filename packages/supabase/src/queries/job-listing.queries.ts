import type { SupabaseInstance } from "../types";

export async function getJobListings(
  supabase: SupabaseInstance,
  organization_id: string,
) {
  return await supabase
    .from("job_listings")
    .select(`
      *,
      department:department_id (*)
    `)
    .eq("organization_id", organization_id);
}
