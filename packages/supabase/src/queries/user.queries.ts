import type { SupabaseInstance } from "../types";

export async function getCurrentUser(supabase: SupabaseInstance) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: null,
    };
  }

  return supabase.from("users").select("*").eq("id", user.id).single();
}
