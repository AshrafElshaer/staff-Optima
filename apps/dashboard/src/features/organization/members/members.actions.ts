"use server";

import { authActionClient } from "@/lib/safe-action";
import { userInsertSchema, userUpdateSchema } from "@optima/supabase/validations";
import { createUser, deleteUser, updateUser } from "@optima/supabase/mutations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { InvitationEmail } from "@optima/email";
import { getOrganizationById } from "@optima/supabase/queries";

export const inviteMemberAction = authActionClient
  .metadata({
    name: "inviteMember",
    track: {
      event: "invite-member",
      channel: "organization",
    },
  })
  .schema(userInsertSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { user, resend } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data, error } = await createUser(
      supabase,
      parsedInput,
      user.user_metadata.organization_id,
    );

    if (error) {
      throw new Error(error.message);
    }

    const { data: organization, error: organizationError } =
      await getOrganizationById(supabase, user.user_metadata.organization_id);

    if (organizationError) {
      throw new Error(organizationError.message);
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Access Granted <onboarding@staffoptima.co>",
      to: [parsedInput.email],
      subject: `Welcome to ${organization.name}!`,
      react: InvitationEmail({
        name: `${parsedInput.first_name} ${parsedInput.last_name}`,
        organization,
      }),
      headers: {
        "X-Entity-Ref-ID": data?.id ?? "",
      },
    });

    if (emailError) {
      throw new Error(emailError.message);
    }

    revalidatePath("/organization/team");

    return data;
  });

export const updateTeamMemberAction = authActionClient
  .metadata({
    name: "updateMember",
    track: {
      event: "update-member",
      channel: "organization",
    },
  })
  .schema(userUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;

    const { data, error } = await updateUser(supabase, parsedInput);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/organization/team");

    return data;
  });

export const deleteTeamMember = authActionClient
  .metadata({
    name: "deleteMember",
    track: {
      event: "delete-member",
      channel: "organization",
    },
  })
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;
    const supabase = await createServerClient({
      isAdmin: true,
    });

    const { data: organization } = await getOrganizationById(
      supabase,
      user.user_metadata.organization_id,
    );

    const isOrganizationAdmin = organization?.admin_id === parsedInput.id;

    if (isOrganizationAdmin) {
      throw Error("Can't delete organization admin");
    }

    const { data, error } = await deleteUser(supabase, parsedInput.id);
    if (error) {
      throw Error(error.message);
    }

    revalidatePath("/organization/team");

    return data.user;
  });