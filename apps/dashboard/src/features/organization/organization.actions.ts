"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateOrganization } from "@optima/supabase/mutations";
import {
  organizationUpdateSchema,
  organizationSchema,
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
  .schema(organizationSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    const { data, error } = await updateOrganization(supabase, {
      ...parsedInput,
    });

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization");

    return data;
  });
