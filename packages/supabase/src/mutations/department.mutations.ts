import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export const createDepartment = async (
  supabase: SupabaseInstance,
  department: TablesInsert<"departments">,
) => {
  return await supabase.from("departments").insert(department);
};

export const updateDepartment = async (
  supabase: SupabaseInstance,
  department: TablesUpdate<"departments">,
) => {
  if (!department.id) {
    throw new Error("Department ID is required");
  }

  return await supabase
    .from("departments")
    .update(department)
    .eq("id", department.id);
};
