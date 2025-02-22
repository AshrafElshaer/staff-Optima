"use server";

import { authActionClient } from "@/lib/safe-action";
import {
  createJobCampaign,
  createJobPost,
  updateJobCampaign,
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
import { z } from "zod";

export const createJobPostAction = authActionClient
  .metadata({
    name: "createJobPost",
    track: {
      event: "createJobPost",
      channel: "jobPosts",
    },
  })
  .schema(
    jobPostInsertSchema.extend({
      status: z.nativeEnum(jobPostCampaignStatusEnum),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { status, ...rest } = parsedInput;
    const payload = {
      ...rest,
      organization_id: ctx.user.user_metadata.organization_id,
      created_by: ctx.user.id,
    };
    const { data, error } = await createJobPost(supabase, payload);

    if (error) throw new Error(error.message);

    const { error: campaignError } = await createJobCampaign(supabase, {
      organization_id: ctx.user.user_metadata.organization_id,
      job_id: data.id,
      status,
      start_date: new Date().toISOString(),
    });

    if (campaignError) throw new Error(campaignError.message);

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
        `status.eq.${jobPostCampaignStatusEnum.active},status.eq.${jobPostCampaignStatusEnum.pending},status.eq.${jobPostCampaignStatusEnum.draft}`,
      );
    if (runningCampaign?.length) {
      const campaign = runningCampaign[0];
      if (campaign?.status === "active" || campaign?.status === "pending") {
        throw new Error("Job post already has an active or pending campaign");
      }
      if (campaign?.status === "draft") {
        const { error: updateError } = await updateJobCampaign(supabase, {
          ...parsedInput,
          updated_at: new Date().toISOString(),
        });

        if (updateError) throw new Error(updateError.message);
        revalidatePath("/job-posts");
        return {
          success: true,
        };
      }
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

export const publishJobCampaignAction = authActionClient
  .metadata({
    name: "publishJobCampaign",
    track: {
      event: "publishJobCampaign",
      channel: "jobCampaigns",
    },
  })
  .schema(
    z.object({
      job_id: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { error } = await updateJobCampaign(supabase, {
      job_id: parsedInput.job_id,
      status: jobPostCampaignStatusEnum.active,
    });

    if (error) throw new Error(error.message);

    revalidatePath("/job-posts");
    redirect("/job-posts");
  });
