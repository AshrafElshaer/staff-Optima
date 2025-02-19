"use server";

import { actionClientWithMeta } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { uploadCandidateAttachment } from "@/lib/supabase/storage";
import {
  createApplication,
  createAttachment,
  createCandidate,
} from "@optima/supabase/mutations";
import { attachmentTypeEnum } from "@optima/supabase/types";
import {
  applicationInsertSchema,
  candidateInsertSchema,
} from "@optima/supabase/validations";
import { z } from "zod";
import { zfd } from "zod-form-data";
const schema = z.object({
  candidate: candidateInsertSchema,
  application: applicationInsertSchema,
  attachments: z.array(
    z.object({
      fileType: z.nativeEnum(attachmentTypeEnum),
      file: zfd.file(),
    }),
  ),
});

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
    const { candidate, application, attachments } = parsedInput;

    if (!candidate.organization_id) {
      throw new Error("Organization ID is required");
    }

    const { data: newCandidate, error: candidateError } = await createCandidate(
      supabase,
      candidate,
    );

    if (candidateError) {
      throw new Error(candidateError.message);
    }

    if (!newCandidate?.id) {
      throw new Error("Failed to create candidate");
    }

    const { data: firstStage, error: stageError } = await supabase
      .from("application_stages")
      .select("*")
      .eq("organization_id", candidate.organization_id)
      .eq("stage_order", 1)
      .single();

    if (stageError || !firstStage?.id) {
      throw new Error("Failed to find first application stage");
    }

    const { data: newApplication, error: applicationError } =
      await createApplication(supabase, {
        ...application,
        candidate_id: newCandidate.id,
        stage_id: firstStage.id,
      });

    if (applicationError) {
      throw new Error(applicationError.message);
    }

    if (attachments.length > 0) {
      const uploadPromises = attachments.map((attachment) =>
        uploadCandidateAttachment({
          supabase,
          candidateId: newCandidate.id,
          file: attachment,
        }),
      );
      const uploadedAttachments = await Promise.all(uploadPromises);

      const { error: insertError } = await createAttachment(
        supabase,
        uploadedAttachments.map((attachment) => ({
          application_id: newApplication?.id,
          organization_id: candidate.organization_id ?? "",
          file_name: attachment.fileName,
          file_path: attachment.path,
          file_url: attachment.publicUrl,
          attachment_type: attachment.fileType,
          candidate_id: newCandidate.id,
        })),
      );

      if (insertError) {
        throw new Error(insertError.message);
      }
    }
    return newApplication;
  });
