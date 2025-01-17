"use server";

import { resend } from "@/lib/resend";
import { authActionClient } from "@/lib/safe-action";
import {
  createEmailTemplate,
  updateEmailTemplate,
} from "@optima/supabase/mutations";
import {
  emailTemplateInsertSchema,
  emailTemplateUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const sendTestEmailAction = authActionClient
  .metadata({
    name: "sendTestEmail",
    track: {
      event: "sendTestEmail",
      channel: "email",
    },
  })
  .schema(
    z.object({
      sendTo: z.string().email(),
      subject: z.string(),
      emailContent: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { sendTo, subject, emailContent } = parsedInput;
    const { resend } = ctx;
    const { error } = await resend.emails.send({
      from: "testemail@staffoptima.co",
      to: sendTo,
      subject: subject,
      html: emailContent,
    });
    if (error) {
      throw new Error(error.message);
    }
  });

export const createEmailTemplateAction = authActionClient
  .metadata({
    name: "createEmailTemplate",
    track: {
      event: "createEmailTemplate",
      channel: "email",
    },
  })
  .schema(emailTemplateInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, user } = ctx;
    const { data, error } = await createEmailTemplate(supabase, {
      ...parsedInput,
      organization_id: user.user_metadata.organization_id,
    });
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization/email-templates");

    redirect("/organization/email-templates");
  });

export const updateEmailTemplateAction = authActionClient
  .metadata({
    name: "updateEmailTemplate",
    track: {
      event: "updateEmailTemplate",
      channel: "email",
    },
  })
  .schema(emailTemplateUpdateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, user } = ctx;
    const { data, error } = await updateEmailTemplate(supabase, {
      ...parsedInput,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/organization/email-templates");

    return data;
  });
