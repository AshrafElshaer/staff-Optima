"use server";

import { authActionClient } from "@/lib/safe-action";
import { createJobPost } from "@optima/supabase/mutations";
import { jobPostInsertSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createJobPostAction = authActionClient
  .metadata({
    name: "createJobPost",
    track: {
      event: "createJobPost",
      channel: "jobPosts",
    },
  })
  .schema(jobPostInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const payload = {
      ...parsedInput,
      organization_id: ctx.user.user_metadata.organization_id,
      created_by: ctx.user.id,
    };
    const { data, error } = await createJobPost(supabase, payload);

    if (error) throw new Error(error.message);

    revalidatePath("/job-listings");
    redirect("/job-listings");

    return data;
  });
