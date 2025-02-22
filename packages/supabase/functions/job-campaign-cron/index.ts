import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { jobPostCampaignStatusEnum } from "../_shared/enums.ts";
import { supabase } from "../_shared/supabase-client.ts";

Deno.serve(async () => {
  const { data: jobCampaigns, error } = await supabase
    .from("job_posts_campaigns")
    .select("*")
    .or("status.eq.pending,status.eq.active");

  if (!jobCampaigns || error) {
    console.error("Error fetching job campaigns:", error);
    return new Response(JSON.stringify({ error: error?.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const now = new Date();
  const updates = [];

  // Loop through each campaign and check if status needs to be updated
  for (const campaign of jobCampaigns) {
    const startDate = new Date(campaign.start_date);
    const endDate = campaign.end_date ? new Date(campaign.end_date) : null;

    // Check if campaign should be activated (starts today)
    if (
      campaign.status === "pending" &&
      startDate.toDateString() === now.toDateString()
    ) {
      updates.push({
        id: campaign.id,
        job_id: campaign.job_id,
        organization_id: campaign.organization_id,
        start_date: campaign.start_date,
        status: jobPostCampaignStatusEnum.active,
        updated_at: now.toISOString(),
      });
    }

    // Check if campaign should be completed (ends today)
    if (
      campaign.status === "active" &&
      endDate &&
      endDate.toDateString() === now.toDateString()
    ) {
      updates.push({
        id: campaign.id,
        job_id: campaign.job_id,
        organization_id: campaign.organization_id,
        start_date: campaign.start_date,
        status: jobPostCampaignStatusEnum.completed,
        updated_at: now.toISOString(),
      });
    }
  }

  if (updates.length > 0) {
    const { error: updateError } = await supabase
      .from("job_posts_campaigns")
      .upsert(updates);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError?.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  }

  return new Response("ok", {
    headers: { "Content-Type": "application/json" },
  });
});
