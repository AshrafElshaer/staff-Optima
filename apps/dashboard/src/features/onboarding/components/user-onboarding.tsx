"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

export function UserOnboarding() {
  const [counter, { startCountdown }] = useCountdown({
    countStart: 3,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {counter !== 0 ? (
        <motion.div
          key={"welcome-message"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          custom={{
            className: "flex-grow grid place-content-center w-full  p-4",
          }}
        >
          <TextGenerateEffect
            words="First, let's gather basic information about you."
            className="w-full "
          />
        </motion.div>
      ) : (
        <motion.div
          key={"onboarding-form"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          custom={{ className: "w-full p-4" }}
        >
          <UserForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useSession } from "@/hooks/use-session";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";

import { useAction } from "next-safe-action/hooks";

import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { onboardUserAction } from "../onboarding.actions";

function UserForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof userInsertSchema>>({
    defaultValues: {
      email: session?.data?.session?.user.email ?? "",
      access_role: "admin",
    },
    resolver: zodResolver(userInsertSchema),
  });

  const { executeAsync: createUser, status } = useAction(onboardUserAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: () => {
      router.push("/onboarding/organization");
    },
  });

  async function onSubmit(data: z.infer<typeof userInsertSchema>) {
    await createUser(data);
  }

  useEffect(() => {
    form.setValue("email", session?.data?.session?.user.email ?? "");
  }, [session?.data?.session?.user.email]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="space-y-2 ">
          <Label>First Name</Label>
          <Input
            {...form.register("first_name")}
            placeholder="John"
            error={form.formState.errors.first_name?.message}
          />
        </div>

        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input
            {...form.register("last_name")}
            placeholder="Doe"
            error={form.formState.errors.last_name?.message}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          {...form.register("email")}
          placeholder="john.doe@example.com"
          error={form.formState.errors.email?.message}
          disabled
        />
      </div>

      {/* <TimezoneSelector
        value={form.watch("timezone")}
        onValueChange={(value) => form.setValue("timezone", value)}
      /> */}

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting || status === "hasSucceeded"}
      >
        {form.formState.isSubmitting ? (
          <Loader className="size-4 animate-spin " />
        ) : null}
        Continue
      </Button>
    </form>
  );
}
