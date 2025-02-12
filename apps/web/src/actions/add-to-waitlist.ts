"use server";

import { resend } from "@/lib/resend";
import { actionClientWithMeta } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";
import { z } from "zod";
export const addToWaitlistAction = actionClientWithMeta
  .metadata({
    name: "add-to-waitlist",
    track: {
      event: "add-to-waitlist",
      channel: "waitlist",
    },
  })
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("waitlist").insert({
      email: parsedInput.email,
    });

    if (error) {
      if (
        error?.message.includes(
          "duplicate key value violates unique constraint",
        )
      ) {
        throw new Error("You're already on the waitlist");
      }

      throw new Error(error.message);
    }

    await resend.emails.send({
      from: "Staff Optima <support@staffoptima.co>",
      to: parsedInput.email,
      subject: "You're on the List!",
      react: WaitlistEmail(),
      headers: {
        "X-Entity-Ref-ID": parsedInput.email,
      },
    });

    return data;
  });
