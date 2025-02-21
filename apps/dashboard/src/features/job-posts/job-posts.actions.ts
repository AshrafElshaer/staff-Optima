"use server";

import { authActionClient } from "@/lib/safe-action";
import {
  createJobCampaign,
  createJobPost,
  updateJobPost,
} from "@optima/supabase/mutations";
import { jobPostCampaignStatusEnum } from "@optima/supabase/types";
import {
  jobPostCampaignInsertSchema,
  jobPostInsertSchema,
  jobPostUpdateSchema,
} from "@optima/supabase/validations";
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

    revalidatePath("/job-posts");
    return data;
  });

export const updateJobPostAction = authActionClient
  .metadata({
    name: "updateJobPost",
    track: {
      event: "updateJobPost",
      channel: "jobPosts",
    },
  })
  .schema(jobPostUpdateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const payload = {
      ...parsedInput,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await updateJobPost(supabase, payload);

    if (error) throw new Error(error.message);

    revalidatePath("/job-posts");

    return data;
  });

export const createJobCampaignAction = authActionClient
  .metadata({
    name: "createJobCampaign",
    track: {
      event: "createJobCampaign",
      channel: "jobCampaigns",
    },
  })
  .schema(jobPostCampaignInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;

    const { data: runningCampaign } = await supabase
      .from("job_posts_campaigns")
      .select("*")
      .eq("organization_id", ctx.user.user_metadata.organization_id)
      .eq("job_id", parsedInput.job_id)
      .or(
        `status.eq.${jobPostCampaignStatusEnum.active},status.eq.${jobPostCampaignStatusEnum.pending}`,
      );
    if (runningCampaign?.length) {
      throw new Error("Job post has already a running campaign");
    }

    const payload = {
      ...parsedInput,
      organization_id: ctx.user.user_metadata.organization_id,
    };
    const { error } = await createJobCampaign(supabase, payload);

    if (error) throw new Error(error.message);

    revalidatePath("/job-posts");
    redirect("/job-posts");
  });
