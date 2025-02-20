import type { SupabaseInstance } from "../types";

export async function getCandidates(
  supabase: SupabaseInstance,
  organizationId: string,
  filters?: {
    department?: string[];
    job?: string[];
    email?: string;
  },
) {
  const query = supabase
    .from("candidates")
    .select("*, applications(*, job_posts(id, title))")
    .eq("organization_id", organizationId);

  if (filters?.department?.length) {
    query.in("applications.department_id", filters.department);
  }

  if (filters?.job?.length) {
    query.in("applications.job_id", filters.job);
  }

  if (filters?.email) {
    query.ilike("email", `%${filters.email}%`);
  }

  return await query;
}
