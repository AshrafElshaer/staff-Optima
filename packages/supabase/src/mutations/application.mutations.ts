import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export const createApplication = async (
  supabase: SupabaseInstance,
  application: TablesInsert<"applications">,
) => {
  return await supabase
    .from("applications")
    .insert(application)
    .select()
    .single();
};

export const updateApplication = async (
  supabase: SupabaseInstance,
  application: TablesUpdate<"applications">,
) => {
  if (!application.id) {
    throw new Error("Application ID is required");
  }

  return await supabase
    .from("applications")
    .update(application)
    .eq("id", application.id)
    .select()
    .single();
};
