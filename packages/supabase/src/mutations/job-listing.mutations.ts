import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export async function createJobListing(
  supabase: SupabaseInstance,
  data: TablesInsert<"job_listings">,
) {
  return await supabase.from("job_listings").insert(data).select().single();
}

export async function updateJobListing(
  supabase: SupabaseInstance,
  id: string,
  data: TablesUpdate<"job_listings">,
) {
  if (!data.id) throw new Error("Job listing id is required");

  return await supabase
    .from("job_listings")
    .update(data)
    .eq("id", id)
    .select()
    .single();
}
