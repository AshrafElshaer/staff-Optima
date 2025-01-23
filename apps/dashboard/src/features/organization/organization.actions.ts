"use server";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { InvitationEmail } from "@optima/email";
import {
  createApplicationStage,
  createDepartment,
  createUser,
  deleteApplicationStage,
  deleteDepartment,
  deleteUser,
  reorderApplicationStages,
  updateApplicationStage,
  updateDepartment,
  updateOrganization,
  updateUser,
} from "@optima/supabase/mutations";
import { getOrganizationById } from "@optima/supabase/queries";
import {
  departmentInsertSchema,
  departmentUpdateSchema,
  organizationSchema,
  organizationUpdateSchema,
  pipelineStageInsertSchema,
  pipelineStageUpdateSchema,
  userInsertSchema,
  userUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
      profile: parsedInput.profile ?? null,
    };
    const { data, error } = await updateOrganization(supabase, payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization");

    return data;
  });



