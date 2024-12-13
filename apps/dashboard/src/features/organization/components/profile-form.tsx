"use client";
import { CountrySelector } from "@/components/selectors/country-selector";
import { OnEditToast } from "@/components/toasts/on-edit-toast";
import { useActionBar } from "@/hooks/use-action-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@optima/supabase/types";
import { organizationSchema } from "@optima/supabase/validations";
import { Avatar } from "@optima/ui/avatar";
import { Button } from "@optima/ui/button";
import { Input, UrlInput } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Separator } from "@optima/ui/separator";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateOrganizationAction } from "../organization.actions";

export function OrganizationProfileForm({
  organization,
}: {
  organization: Organization | null;
}) {
  const formSubmitRef = useRef<HTMLButtonElement | null>(null);
  const {
    execute: updateOrganization,
    isExecuting: isUpdating,
    status,
    result,
    reset: resetAction,
  } = useAction(updateOrganizationAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: ({ data }) => {
      form.reset(
        {},
        {
          keepDirty: false,
        },
      );
      toast.success("Organization profile updated successfully");
    },
  });

  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: organization
      ? {
          ...organization,
          profile: organization.profile
            ? JSON.parse(organization.profile as string)
            : null,
          logo_url: organization.logo_url ?? null,
          admin_id: organization.admin_id ?? undefined,
          address_1: organization.address_1 ?? null,
          address_2: organization.address_2 ?? null,
          city: organization.city ?? null,
        }
      : undefined,
  });

  function onSubmit(values: z.infer<typeof organizationSchema>) {
    updateOrganization(values);
  }

  useActionBar({
    onAction: async () => {
      formSubmitRef.current?.click();
    },
    onReset: () => {
      form.reset(
        organization
          ? {
              ...organization,
              profile: organization.profile
                ? JSON.parse(organization.profile as string)
                : null,
              admin_id: organization.admin_id ?? undefined,
              address_1: organization.address_1 ?? null,
              address_2: organization.address_2 ?? null,
              city: organization.city ?? null,
            }
          : undefined,
      );
    },
    isLoading: isUpdating,
    status,
    show: form.formState.isDirty,
    title: "Unsaved Changes",
    error: result?.serverError,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 max-w-3xl mx-auto w-full"
    >
      <section className="flex justify-between items-center w-full gap-4">
        <div className="space-y-2 w-full">
          <Label className="font-semibold text-base">Organization Logo</Label>
          <p className="text-muted-foreground text-sm">
            Accepts : PNG, JPG, or SVG.
            <br />
            Max size : 1MB
            <br />
            Recommended dimensions: 200x200 pixels.
          </p>
        </div>
        <Avatar
          className="size-28"
          shape="square"
          initials={`${organization?.name[0]}${organization?.name[1]}`}
        />
      </section>
      <Separator />

      <section className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="space-y-2 w-full md:w-2/3">
          <Label htmlFor="name" className="font-semibold text-base">
            Legal Name
          </Label>
          <p className="text-muted-foreground text-sm">
            Organization's registered legal name
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <Input
            {...form.register("name")}
            id="name"
            placeholder="Acme Corp"
            error={form.formState.errors.name?.message}
          />
        </div>
      </section>
      <Separator />

      <section className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="space-y-2 w-full md:w-2/3">
          <Label htmlFor="domain" className="font-semibold text-base">
            Domain
          </Label>
          <p className="text-muted-foreground text-sm">
            organization's official website domain.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <UrlInput
            {...form.register("domain")}
            id="domain"
            placeholder="domain.com"
            error={form.formState.errors.domain?.message}
          />
        </div>
      </section>
      <Separator />

      <section className="flex flex-col  w-full gap-4">
        <div className="space-y-2 w-full">
          <Label className="font-semibold text-base">Location</Label>
          <p className="text-muted-foreground text-sm">
            organization's headquarter address
          </p>
        </div>
        <div className="grid gap-y-4 gap-x-20 md:grid-cols-2 ">
          <div className="w-full space-y-2">
            <Label htmlFor="address_1">
              Address 1{" "}
              <span className="text-muted-foreground">( Optional )</span>
            </Label>
            <Input
              {...form.register("address_1")}
              id="address_1"
              placeholder="123 Main st"
              error={form.formState.errors.address_1?.message}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="address_2">
              Address 2{" "}
              <span className="text-muted-foreground">( Optional )</span>
            </Label>
            <Input
              {...form.register("address_2")}
              id="address_2"
              placeholder="suite 542"
              error={form.formState.errors.address_2?.message}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="city">
              City <span className="text-muted-foreground">( Optional )</span>
            </Label>
            <Input
              {...form.register("city")}
              id="city"
              placeholder="San Francisco"
              error={form.formState.errors.city?.message}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="state">
              State <span className="text-muted-foreground">( Optional )</span>
            </Label>
            <Input
              {...form.register("state")}
              id="state"
              placeholder="California"
              error={form.formState.errors.state?.message}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="zip_code">
              Zip Code{" "}
              <span className="text-muted-foreground">( Optional )</span>
            </Label>
            <Input
              {...form.register("zip_code")}
              id="zip_code"
              placeholder="12345"
              error={form.formState.errors.zip_code?.message}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Country</Label>

            <CountrySelector
              value={form.watch("country") ?? null}
              setValue={(value) => {
                form.setValue("country", value);
                form.clearErrors("country");
              }}
              error={form.formState.errors.country?.message}
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col  w-full gap-4 ">
        <div className="space-y-2 w-full">
          <Label className="font-semibold text-base">Profile</Label>
          <p className="text-muted-foreground text-sm md:w-1/2">
            Write a detailed profile showcasing your organization's mission,
            values, services, and achievements.
          </p>
        </div>
        <div className="w-full border rounded-md min-h-96 p-4 ">hello</div>
      </section>

      <button type="submit" ref={formSubmitRef} className="hidden">
        save
      </button>
    </form>
  );
}
