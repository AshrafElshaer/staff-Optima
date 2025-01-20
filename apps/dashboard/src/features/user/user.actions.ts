"use server";
import { authActionClient } from "@/lib/safe-action";
import { updateUser } from "@optima/supabase/mutations";
import { userUpdateSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";

export const updateUserAction = authActionClient
  .metadata({
    name: "update-user",
    track: {
      event: "update-user",
      channel: "user",
    },
  })
  .schema(userUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { supabase } = ctx;
    const { id, ...data } = parsedInput;
    const { error, data: user } = await updateUser(supabase, { id, ...data });
    if (error) throw new Error(error.message);

    revalidatePath("/account-settings");
    return user;
  });
