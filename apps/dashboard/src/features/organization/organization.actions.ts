"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateOrganization } from "@optima/supabase/mutations";
import {
  organizationSchema,
  organizationUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const updateOrganizationAction = authActionClient
  .metadata({
    name: "updateOrganization",
    track: {
      event: "update-organization",
      channel: "organization",
    },
  })
  .schema(organizationUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    const payload = {
      ...parsedInput,
      profile: parsedInput.profile ? JSON.stringify(parsedInput.profile) : null,
    };
    const { data, error } = await updateOrganization(supabase, payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization");

    return data;
  });
