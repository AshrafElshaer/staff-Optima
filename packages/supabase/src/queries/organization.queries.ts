import type { SupabaseInstance } from "../types";

export async function getOrganizationById(
  supabase: SupabaseInstance,
  id: string,
) {
  return supabase.from("organizations").select("*").eq("id", id).single();
}
