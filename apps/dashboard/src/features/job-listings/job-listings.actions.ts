"use server";

import { authActionClient } from "@/lib/safe-action";
import { createJobListing } from "@optima/supabase/mutations";
import { jobListingInsertSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createJobListingAction = authActionClient
  .metadata({
    name: "createJobListing",
    track: {
      event: "createJobListing",
      channel: "jobListings",
    },
  })
  .schema(jobListingInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const payload = {
      ...parsedInput,
      organization_id: ctx.user.user_metadata.organization_id,
      created_by: ctx.user.id,
    };
    const { data, error } = await createJobListing(supabase, payload);

    if (error) throw new Error(error.message);

    revalidatePath("/job-listings");
    redirect("/job-listings");

    return data;
  });
