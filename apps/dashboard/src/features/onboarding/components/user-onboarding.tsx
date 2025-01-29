"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { useSession } from "@/hooks/use-session";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/inputs";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/phone-number-input";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { onboardUserAction } from "../onboarding.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";

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

function UserForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof userInsertSchema>>({
    defaultValues: {
      email: session?.user.email ?? "",
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
    form.setValue("email", session?.user.email ?? "");
  }, [session?.user.email]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                  placeholder="+1234567890"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
    </Form>
  );
}
