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

export async function deleteApplicationStage(
  supabase: SupabaseInstance,
  applicationStageId: string,
) {
  const { data: deletedStage, error } = await supabase
    .from("application_stages")
    .delete()
    .eq("id", applicationStageId);

  if (error) {
    throw new Error(error.message);
  }

  const { data: remainingStages, error: remainingStagesError } = await supabase
    .from("application_stages")
    .select("*")
    .order("stage_order", { ascending: true });

  if (remainingStagesError) {
    throw new Error(remainingStagesError.message);
  }

  // Update stage orders sequentially
  const updates = remainingStages.map((stage, index) => ({
    ...stage,
    stage_order: index + 1,
  }));

  if (updates.length > 0) {
    const { error: updateError } = await supabase
      .from("application_stages")
      .upsert(updates);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  return remainingStages;
}
