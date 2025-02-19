"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";

import { zodResolver } from "@hookform/resolvers/zod";
import { organizationInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { Input, UrlInput } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Loader } from "lucide-react";
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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";

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
    defaultValues: {
      country: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      industry: "",
      domain: "",
      name: "",
      profile: "",
    },
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <UrlInput placeholder="domain.example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="address_1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Address 1{" "}
                  <span className="text-muted-foreground">( Optional )</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main st"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address_2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Address 2{" "}
                  <span className="text-muted-foreground">( Optional )</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="suite #512"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  City{" "}
                  <span className="text-muted-foreground">( Optional )</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  State{" "}
                  <span className="text-muted-foreground">( Optional )</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Texas"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Zip Code{" "}
                  <span className="text-muted-foreground">( Optional )</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="12345"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <CountrySelector
                  value={field.value}
                  setValue={(value) => {
                    field.onChange(value);
                    form.clearErrors("country");
                  }}
                  error={form.formState.errors.country?.message}
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
            <Loader className="size-4 animate-spin mr-2" />
          ) : null}
          Complete Setup
        </Button>
      </form>
    </Form>
  );
}
