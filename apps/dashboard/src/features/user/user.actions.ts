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

    if (data.email) {
      const updatedAuth = await supabase.auth.updateUser({
        email: data.email,
      });
      if (updatedAuth.error) throw new Error(updatedAuth.error.message);
    }
    const { error, data: user } = await updateUser(supabase, { id, ...data });
    if (error) throw new Error(error.message);

    revalidatePath("/account-settings");
    return user;
  });
