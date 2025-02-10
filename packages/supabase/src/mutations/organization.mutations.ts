import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type OrganizationInsert = TablesInsert<"organizations">;
type OrganizationUpdate = TablesUpdate<"organizations">;
type DomainVerificationInsert = TablesInsert<"domain_verification">;
type DomainVerificationUpdate = TablesUpdate<"domain_verification">;
export async function createOrganization(
  supabase: SupabaseInstance,
  data: OrganizationInsert,
) {
  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .insert(data)
    .select()
    .single();

  if (organizationError) {
    return {
      data: null,
      error: organizationError,
    };
  }

  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: organization.id,
      user_id: organization.admin_id,
    });

  if (memberError) {
    return {
      data: null,
      error: memberError,
    };
  }

  await supabase.auth.updateUser({
    data: {
      organization_id: organization.id,
      access_role: "admin",
    },
  });

  return {
    data: organization,
    error: null,
  };
}

export async function updateOrganization(
  supabase: SupabaseInstance,
  data: OrganizationUpdate,
) {
  if (!data.id) {
    return {
      data: null,
      error: new Error("Organization id is required"),
    };
  }

  return await supabase
    .from("organizations")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}

export async function deleteOrganization(
  supabase: SupabaseInstance,
  organizationId: string,
) {
  return supabase
    .from("organizations")
    .delete()
    .eq("id", organizationId)
    .select()
    .single();
}

export async function createDomainVerification(
  supabase: SupabaseInstance,
  data: DomainVerificationInsert,
) {
  return supabase.from("domain_verification").insert(data).select().single();
}

export async function updateDomainVerification(
  supabase: SupabaseInstance,
  data: DomainVerificationUpdate,
) {
  if (!data.id) {
    throw new Error("Domain verification id is required");
  }
  return supabase
    .from("domain_verification")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}
