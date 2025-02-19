"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateApplication } from "@optima/supabase/mutations";
import { applicationUpdateSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const nextStageApplicationAction = authActionClient
  .metadata({
    name: "nextStageApplication",
    track: {
      event: "update Application Stage",
      channel: "application",
    },
  })
  .schema(
    z.object({
      applicationId: z.string(),
      stageId: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { data, error } = await updateApplication(supabase, {
      id: parsedInput.applicationId,
      stage_id: parsedInput.stageId,
    });
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/candidates");
    return data;
  });
