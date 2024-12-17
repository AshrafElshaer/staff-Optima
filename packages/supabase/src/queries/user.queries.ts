import type { SupabaseInstance, User } from "../types";

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

export async function getTeamMembers(
  supabase: SupabaseInstance,
  organizationId: string,
  filters: {
    name?: string;
  },
) {
  const query = supabase
    .from("organization_members")
    .select("user:users(*)")
    .eq("organization_id", organizationId);

  if (filters.name) {
    query.or(
      `last_name.ilike.%${filters.name}%,first_name.ilike.%${filters.name}%`,
      {
        referencedTable: "user",
      },
    );
  }

  const { data, error } = await query;

  if (error) {
    return {
      data: null,
      error: error,
    };
  }

  return {
    data:
      data.length === 0
        ? []
        : (data.map((member) => member.user).filter(Boolean) as User[]),
    error: null,
  };
}
