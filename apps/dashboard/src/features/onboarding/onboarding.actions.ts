"use server";
import crypto from "node:crypto";
import { redis } from "@/lib/redis";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";
// import { uploadOrganizationLogo } from "@/lib/supabase/storage/uploads";
import {
  createDomainVerification,
  createOrganization,
  createUser,
  createUserAdmin,
} from "@optima/supabase/mutations";
import {
  organizationInsertSchema,
  userInsertSchema,
} from "@optima/supabase/validations";
import { redirect } from "next/navigation";
import { z } from "zod";

export const onboardUserAction = authActionClient
  .metadata({
    name: "onboard-user",
  })
  .schema(userInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data, error } = await createUserAdmin(supabase, {
      ...parsedInput,
      id: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

export const onboardOrganizationAction = authActionClient
  .metadata({
    name: "onboard-organization",
  })
  .schema(organizationInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, resend } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data: organization, error } = await createOrganization(supabase, {
      ...parsedInput,
      admin_id: user.id,

      profile: null,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { error: domainVerificationError } = await createDomainVerification(
      supabase,
      {
        organization_id: organization.id,
        domain: organization.domain,
        verification_token: crypto.randomBytes(16).toString("hex"),
      },
    );

    if (domainVerificationError) {
      throw new Error(domainVerificationError.message);
    }

    const allowedOrganization = await redis.sismember(
      "allowed_organizations",
      organization.id,
    );
    if (!allowedOrganization) {
      const { data, error } = await supabase.from("waitlist").insert({
        email: user.email ?? "",
        organization_id: organization.id,
      });
     
      if (error) {
        throw new Error(error.message);
      }

      await resend.emails.send({
        from: "Staff Optima <support@staffoptima.co>",
        to: user.email ?? "",
        subject: "You're on the List!",
        react: WaitlistEmail(),
        headers: {
          "X-Entity-Ref-ID": user.email ?? "",
        },
      });

      redirect("/waitlist");
    }

    return organization;
  });
