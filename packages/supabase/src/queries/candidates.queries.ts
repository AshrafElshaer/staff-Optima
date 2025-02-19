import type { SupabaseInstance } from "../types";

export async function getCandidates(
  supabase: SupabaseInstance,
  organizationId: string,
) {
  return await supabase
    .from("candidates")
    .select("*, applications(*, job_posts(id, title))")
    .eq("organization_id", organizationId);
}
