"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";



import { zodResolver } from "@hookform/resolvers/zod";
import { organizationInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { Input, UrlInput } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import {  Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { CountrySelector } from "@/components/selectors/country-selector";
import { countries } from "@optima/location";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { onboardOrganizationAction } from "../onboarding.actions";

export function OrganizationOnboarding() {
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
            className: "flex-grow grid place-content-center w-full p-4",
          }}
        >
          <TextGenerateEffect
            words="Now, let's set up your organization."
            className="w-full"
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
          <OrganizationForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrganizationForm() {
  const router = useRouter();
 

  const form = useForm<z.infer<typeof organizationInsertSchema>>({
    resolver: zodResolver(organizationInsertSchema),
  });

  const { executeAsync: createOrganization, status } = useAction(
    onboardOrganizationAction,
    {
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
      onSuccess: () => {
        router.push("/onboarding/congrats");
      },
    },
  );

  async function onSubmit(data: z.infer<typeof organizationInsertSchema>) {
    await createOrganization({ ...data });
  }

  useEffect(() => {
    const countryCode = navigator.language.split("-")[1];
    const country = countries.find((country) => country.cca2 === countryCode);
    form.setValue("country", country?.name ?? "");
  }, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="space-y-2 w-full">
        <Label>Organization Name</Label>
        <Input
          {...form.register("name")}
          placeholder="Acme Corp"
          error={form.formState.errors.name?.message}
        />
      </div>
      <div className="flex flex-col sm:flex-row  gap-2">
        <div className="space-y-2 w-full">
          <Label>Domain</Label>

          <UrlInput
            {...form.register("domain")}
            placeholder="domain.example"
            error={form.formState.errors.domain?.message}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label>Industry</Label>
          <Input
            {...form.register("industry")}
            placeholder="Technology"
            error={form.formState.errors.industry?.message}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="space-y-2 w-full">
          <Label>
            Address 1{" "}
            <span className="text-muted-foreground">( Optional )</span>
          </Label>
          <Input
            {...form.register("address_1")}
            placeholder="123 Main st"
            error={form.formState.errors.address_1?.message}
          />
        </div>

        <div className="space-y-2 w-full">
          <Label>
            Address 2{" "}
            <span className="text-muted-foreground">( Optional )</span>
          </Label>
          <Input
            {...form.register("address_2")}
            placeholder="suite #512"
            error={form.formState.errors.address_2?.message}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="space-y-2 w-full">
          <Label>
            City <span className="text-muted-foreground">( Optional )</span>
          </Label>
          <Input
            {...form.register("city")}
            placeholder="New York"
            error={form.formState.errors.city?.message}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label>
            State <span className="text-muted-foreground">( Optional )</span>
          </Label>
          <Input
            {...form.register("state")}
            placeholder="Texas"
            error={form.formState.errors.state?.message}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label>
            Zip Code <span className="text-muted-foreground">( Optional )</span>
          </Label>
          <Input
            {...form.register("zip_code")}
            placeholder="12345"
            error={form.formState.errors.zip_code?.message}
          />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <Label>Country</Label>
        <CountrySelector
          value={form.watch("country")}
          setValue={(value) => {
            form.setValue("country", value);
            form.clearErrors("country");
          }}
          error={form.formState.errors.country?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting || status === "hasSucceeded"}
      >
        {form.formState.isSubmitting ? (
          <Loader className="size-4 animate-spin mr-2" />
        ) : null}
        Complete Setup
      </Button>
    </form>
  );
}
