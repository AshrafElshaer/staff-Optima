import type { SupabaseInstance } from "../types";

export async function getDepartmentsByOrganizationId(
  supabase: SupabaseInstance,
  organizationId: string,
) {
  return await supabase
    .from("departments")
    .select("*")
    .eq("organization_id", organizationId);
}

export async function getDepartmentsWithJobsAndApplications(
  supabase: SupabaseInstance,
  organizationId: string,
  filters: {
    name?: string;
  },
) {
  const query = supabase
    .from("departments")
    .select("*, job_listings(*), applications:job_listings(*, applications(*))")
    .eq("organization_id", organizationId);

  if (filters.name) {
    query.ilike("name", `%${filters.name}%`);
  }
  return await query;
}
