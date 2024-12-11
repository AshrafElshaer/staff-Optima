"use server";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
// import { uploadOrganizationLogo } from "@/lib/supabase/storage/uploads";
import {
  createOrganization,
  createUser,
  createUserAdmin,
} from "@optima/supabase/mutations";
import {
  organizationInsertSchema,
  userInsertSchema,
} from "@optima/supabase/validations";
import { z } from "zod";
// import { zfd } from "zod-form-data";

export const onboardUserAction = authActionClient
  .metadata({
    name: "onboard-user",
  })
  .schema(userInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data, error } = await createUserAdmin(supabase, {
      ...parsedInput,
      id: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

export const onboardOrganizationAction = authActionClient
  .metadata({
    name: "onboard-organization",
  })
  .schema(organizationInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data: organization, error } = await createOrganization(supabase, {
      ...parsedInput,
      admin_id: user.id,

      profile: null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return organization;
  });
