import type { SupabaseInstance } from "../types";

export async function getJobPosts(
  supabase: SupabaseInstance,
  organization_id: string,
) {
  return await supabase
    .from("job_posts")
    .select(`
      *,
      department:department_id (*),
    `)
    .eq("organization_id", organization_id);
}

export async function getJobPostsWithApplicationsCount(
  supabase: SupabaseInstance,
  organization_id: string,
  filters?: {
    status?: string[];
    type?: string[];
    location?: string[];
    experience?: string[];
    department?: string[];
    title?: string;
  },
) {
  const query = supabase
    .from("job_posts")
    .select("*, department:department_id (*), applications(count)")
    .eq("organization_id", organization_id);

  if (filters?.status?.length) {
    query.in("status", filters.status);
  }

  if (filters?.type?.length) {
    query.in("employment_type", filters.type);
  }

  if (filters?.location?.length) {
    query.in("location", filters.location);
  }

  if (filters?.experience?.length) {
    query.in("experience_level", filters.experience);
  }

  if (filters?.department?.length) {
    query.in("department_id", filters.department);
  }

  if (filters?.title?.length) {
    query.ilike("title", `%${filters.title}%`);
  }

  return await query;
}

export async function getJobPostById(
  supabase: SupabaseInstance,
  job_id: string,
) {
  return await supabase
    .from("job_posts")
    .select("*, department:department_id(*)")
    .eq("id", job_id)
    .single();
}
