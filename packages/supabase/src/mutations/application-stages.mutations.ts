import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type InsertApplicationStage = TablesInsert<"application_stages">;
type UpdateApplicationStage = TablesUpdate<"application_stages">;

export async function createApplicationStage(
  supabase: SupabaseInstance,
  applicationStage: InsertApplicationStage,
) {
  return await supabase
    .from("application_stages")
    .insert(applicationStage)
    .select()
    .single();
}

export async function updateApplicationStage(
  supabase: SupabaseInstance,
  applicationStage: UpdateApplicationStage,
) {
  if (!applicationStage.id) {
    throw new Error("Application stage ID is required");
  }

  const { id, ...updateData } = applicationStage;

  return await supabase
    .from("application_stages")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
}
