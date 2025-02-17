"use server";

import { actionClientWithMeta } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import {
  createApplication,
  createAttachment,
  createCandidate,
} from "@optima/supabase/mutations";
import {
  applicationInsertSchema,
  attachmentInsertSchema,
  candidateInsertSchema,
} from "@optima/supabase/validations";
import { z } from "zod";
const schema = candidateInsertSchema.merge(applicationInsertSchema);

export const createApplicationAction = actionClientWithMeta
  .metadata({
    name: "create-Application",
    track: {
      event: "create-Application",
      channel: "applications",
    },
  })
  .schema(schema)
  .action(async ({ parsedInput, ctx }) => {
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data: candidate, error: candidateError } = await createCandidate(
      supabase,
      {
        email: parsedInput.email,
        first_name: parsedInput.first_name,
        last_name: parsedInput.last_name,
        phone_number: parsedInput.phone_number,
        avatar_url: parsedInput.avatar_url,
        organization_id: parsedInput.organization_id,
        city: parsedInput.city,
        country: parsedInput.country,
        date_of_birth: parsedInput.date_of_birth,
        gender: parsedInput.gender,
        educations: parsedInput.educations,
        experiences: parsedInput.experiences,
        social_links: parsedInput.social_links,
        timezone: parsedInput.timezone,
      },
    );

    if (candidateError) {
      throw new Error(candidateError.message);
    }
    const { data: firstStage } = await supabase
      .from("application_stages")
      .select("*")
      .eq("organization_id", parsedInput.organization_id ?? "")
      .eq("stage_order", 1)
      .single();

    const { data: application, error: applicationError } =
      await createApplication(supabase, {
        candidate_id: candidate?.id ?? "",
        organization_id: parsedInput.organization_id ?? "",
        job_id: parsedInput.job_id,
        source: parsedInput.source,
        candidate_match: parsedInput.candidate_match,
        department_id: parsedInput.department_id,
        screening_question_answers:
          parsedInput.screening_question_answers ?? [],
        stage_id: firstStage?.id,
      });

    console.log(
      "application",
      application,
      "applicationError",
      applicationError,
    );
    if (applicationError) {
      throw new Error(applicationError.message);
    }
    if (!application) {
      throw new Error("Failed to create application");
    }

    return application ;
  });

export const createAttachmentAction = actionClientWithMeta
  .metadata({
    name: "create-Attachment",
    track: {
      event: "create-Attachment",
      channel: "attachments",
    },
  })
  .schema(
    z.array(
      attachmentInsertSchema.extend({
        organization_id: z.string(),
      }),
    ),
  )
  .action(async ({ parsedInput, ctx }) => {
    // const supabase = await createServerClient();

    // const { data: attachment, error: attachmentError } = await createAttachment(
    //   supabase,
    //   parsedInput.map((input) => ({
    //     ...input,
    //     organization_id: input.organization_id,
    //   })),
    // );

    return parsedInput;
  });
