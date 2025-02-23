import type { Database } from "@optima/supabase/types";
import { createClient } from "@supabase/supabase-js";
import { envvars, logger, task, wait } from "@trigger.dev/sdk/v3";

type CompleteJobCampaignPayload = {
  jobPostId: string;
};

export const completeJobCampaign = task({
  id: "complete-job-campaign",
  run: async (payload: CompleteJobCampaignPayload, { ctx }) => {
    logger.log("Completing job campaign", { payload, ctx });

    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase
      .from("job_posts_campaigns")
      .update({
        status: "completed",
      })
      .eq("job_id", payload.jobPostId)
      .eq("status", "active")
      .select()
      .single();
    if (error) {
      logger.error("Error completing job campaign", { error });
      throw new Error(error.message);
    }

    if (!data) {
      logger.error("Job campaign not found");
      throw new Error("Job campaign not found");
    }

    // TODO: Check if the integrated apps are enabled and if so, launch the job campaign on the integrated apps
    return {
      message: "Job campaign completed",
    };
  },
});
