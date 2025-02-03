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
) {
  return await supabase
    .from("job_posts")
    .select("*, department:department_id (*), applications(count)")
    .eq("organization_id", organization_id);
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
