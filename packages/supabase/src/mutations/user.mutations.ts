import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type UserInsert = TablesInsert<"users">;
type UserUpdate = TablesUpdate<"users">;

export async function createUserAdmin(
  supabase: SupabaseInstance,
  data: UserInsert,
) {
  return await supabase.from("users").insert(data).select().single();
}
export async function createUser(
  supabase: SupabaseInstance,
  data: UserInsert,
  organizationId: string,
) {
  const { data: auth, error: authError } = await supabase.auth.admin.createUser(
    {
      email: data.email,
      user_metadata: {
        organization_id: organizationId,
        access_role: data.access_role,
      },
    },
  );

  if (!auth.user || authError) {
    return {
      data: null,
      error: authError || "Failed to create user",
    };
  }

  const { data: user, error: userError } = await supabase.from("users").insert({
    ...data,
    id: auth.user.id,
  });

  if (userError) {
    return {
      data: null,
      error: userError,
    };
  }

  await supabase.from("organization_members").insert({
    user_id: auth.user.id,
    organization_id: organizationId,
  });

  return {
    data: user,
    error: null,
  };
}

export async function updateUser(supabase: SupabaseInstance, data: UserUpdate) {
  if (!data.id) {
    return {
      data: null,
      error: new Error("User id is required"),
    };
  }

  return await supabase
    .from("users")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}

export async function deleteUser(supabase: SupabaseInstance, userId: string) {
  return await supabase.auth.admin.deleteUser(userId);
}
