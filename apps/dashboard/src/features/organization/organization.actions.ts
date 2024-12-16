"use server";
import { authActionClient } from "@/lib/safe-action";
import {
  createDepartment,
  updateDepartment,
  updateOrganization,
} from "@optima/supabase/mutations";
import {
  departmentInsertSchema,
  departmentUpdateSchema,
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

export const createDepartmentAction = authActionClient
  .metadata({
    name: "createDepartment",
    track: {
      event: "create-department",
      channel: "organization",
    },
  })
  .schema(departmentInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    const payload = {
      ...parsedInput,
      organization_id: user.user_metadata.organization_id,
    };

    const { data, error } = await createDepartment(supabase, payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization/departments");

    return data;
  });

export const updateDepartmentAction = authActionClient
  .metadata({
    name: "updateDepartment",
    track: {
      event: "update-department",
      channel: "organization",
    },
  })
  .schema(departmentUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;

    const { data, error } = await updateDepartment(supabase, parsedInput);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization/departments");

    return data;
  });
