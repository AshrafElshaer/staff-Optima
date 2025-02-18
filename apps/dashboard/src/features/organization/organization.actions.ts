"use server";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";

import { resolveTxt } from "node:dns/promises";
import { DnsVerificationEmail } from "@optima/email";
import {
  updateDomainVerification,
  updateOrganization,
} from "@optima/supabase/mutations";
import {
  getDomainVerificationByOrganizationId,
  getOrganizationById,
} from "@optima/supabase/queries";
import {
  domainVerificationSchema,
  organizationUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateOrganizationAction = authActionClient
  .metadata({
    name: "updateOrganization",
    track: {
      event: "update-organization",
      channel: "organization",
    },
  })
  .schema(organizationUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    const payload = {
      ...parsedInput,
    };

    const { data, error } = await updateOrganization(supabase, payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization");

    return data;
  });

export const verifyDomainAction = authActionClient
  .metadata({
    name: "verifyDomain",
    track: {
      event: "verify-domain",
      channel: "organization",
    },
  })
  .schema(domainVerificationSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerClient({
      isAdmin: true,
    });

    let records: string[][] | null = null;
    try {
      records = await resolveTxt(
        `staffoptima_verification.${parsedInput.domain}`,
      );
    } catch (error) {
      await updateDomainVerification(supabase, {
        id: parsedInput.id,
        verification_status: "failed",
      });
      throw new Error(
        "Unable to verify domain. Please check your DNS settings and try again.",
      );
    }

    const isValid = records.flat().includes(parsedInput.verification_token);

    if (!isValid) {
      await updateDomainVerification(supabase, {
        id: parsedInput.id,
        verification_status: "failed",
      });
      await updateOrganization(supabase, {
        id: parsedInput.organization_id,
        is_domain_verified: false,
      });

      throw new Error("Invalid verification token");
    }

    const { data, error } = await updateDomainVerification(supabase, {
      id: parsedInput.id,
      verification_status: "verified",
      verification_date: new Date().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }
    const { error: organizationError } = await updateOrganization(supabase, {
      id: parsedInput.organization_id,
      is_domain_verified: true,
    });

    if (organizationError) {
      throw new Error(organizationError.message);
    }

    revalidatePath("/organization");

    return data;
  });

export const sendDomainVerificationEmailAction = authActionClient
  .metadata({
    name: "sendDomainVerificationEmail",
    track: {
      event: "send-domain-verification-email",
      channel: "organization",
    },
  })
  .schema(
    z.object({
      organizationId: z.string(),
      sendTo: z.string().email(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { user, supabase, resend } = ctx;

    const { data: organization, error: organizationError } =
      await getOrganizationById(supabase, parsedInput.organizationId);

    if (organizationError) {
      throw new Error(organizationError.message);
    }
    const { data: domainVerification, error: domainVerificationError } =
      await getDomainVerificationByOrganizationId(
        supabase,
        parsedInput.organizationId,
      );

    if (domainVerificationError) {
      throw new Error(domainVerificationError.message);
    }

    const { data, error } = await resend.emails.send({
      from: "StaffOptima <verification@staffoptima.co>",
      to: parsedInput.sendTo,
      subject: "Domain Verification",
      react: DnsVerificationEmail({
        records: [domainVerification],
        organizationDomain: organization.domain,
        sentBy: user.email || "",
      }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
