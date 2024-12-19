"use client";
import { DropZone } from "@/components/drop-zone";
import AdvancedEditor from "@/components/editors/advanced";
import { CountrySelector } from "@/components/selectors/country-selector";
import { OnEditToast } from "@/components/toasts/on-edit-toast";
import { useActionBar } from "@/hooks/use-action-bar";
import { useSupabase } from "@/hooks/use-supabase";
import { uploadOrganizationLogo } from "@/lib/supabase/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@optima/supabase/types";
import { organizationSchema } from "@optima/supabase/validations";
import { Avatar } from "@optima/ui/avatar";
import { Button, buttonVariants } from "@optima/ui/button";
import { Input, UrlInput } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Separator } from "@optima/ui/separator";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRef } from "react";
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
  const supabase = useSupabase();
  const {
    execute: updateOrganization,
    executeAsync: updateOrganizationAsync,
    status,
    result,
    reset: resetAction,
  } = useAction(updateOrganizationAction, {
    onError: () => {
      setTimeout(() => {
        resetAction();
      }, 3000);
    },
    onSuccess: ({ data }) => {
      setTimeout(() => {
        form.reset(
          data
            ? {
                ...data,
                profile: data.profile
                  ? JSON.parse(data.profile as string)
                  : null,
                logo_url: data.logo_url ?? null,
                admin_id: data.admin_id ?? undefined,
                address_1: data.address_1 ?? null,
                address_2: data.address_2 ?? null,
                city: data.city ?? null,
              }
            : undefined,
          {
            keepDirty: false,
          },
        );
        dismissToast();
        resetAction();
      }, 3000);
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

  async function uploadLogo(file: File) {
    toast.promise(
      async () => {
        const url = await uploadOrganizationLogo({
          supabase,
          organizationId: form.getValues("id"),
          file,
        });
        form.setValue("logo_url", url, {
          shouldDirty: false,
        });
        return await updateOrganizationAsync({
          id: form.getValues("id"),
          logo_url: url,
          profile: form.getValues("profile"),
        });
      },
      {
        loading: "Uploading logo...",
        success: "Logo uploaded successfully",
        error: ({ error }) => error,
      },
    );
  }

  const { dismissToast } = useActionBar({
    show: form.formState.isDirty,
    ToastContent: () => (
      <OnEditToast
        onAction={() => formSubmitRef.current?.click()}
        onReset={() => form.reset()}
        status={status}
        error={result?.serverError}
      />
    ),
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
        <DropZone
          options={{
            accept: {
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
              "image/svg+xml": [".svg"],
              "image/webp": [".webp"],
              "image/x-icon": [".ico"],
            },
            maxSize: 1000000,
            maxFiles: 1,
            multiple: false,
            onDrop: async (acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                await uploadLogo(file);
              }
            },
            onDropRejected: (rejectedFiles) => {
              for (const file of rejectedFiles) {
                toast.error(file.errors[0]?.message);
              }
            },
          }}
        >
          <Avatar
            className="size-28"
            shape="square"
            initials={`${organization?.name[0]}${organization?.name[1]}`}
            src={organization?.logo_url}
          />
          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center">
            <Plus className="size-10 text-secondary-foreground" />
          </div>
        </DropZone>
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
          <div className="w-full space-y-2 pb-20">
            <Label>Country</Label>

            <CountrySelector
              value={form.watch("country") ?? null}
              setValue={(value) => {
                form.setValue("country", value, {
                  shouldDirty: true,
                });
                if (form.formState.errors.country) {
                  form.clearErrors("country");
                }
              }}
              error={form.formState.errors.country?.message}
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col  w-full gap-4 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 w-full">
            <Label className="font-semibold text-base">Profile</Label>
            <p className="text-muted-foreground text-sm md:w-3/4">
              Write a detailed profile showcasing your organization's mission,
              values, services, and achievements.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link
              href={`/jobs/${organization?.domain}`}
              className={buttonVariants({
                variant: "outline",
                className: "w-full md:w-auto",
              })}
              target="_blank"
            >
              Preview
            </Link>
            <Button
              type="button"
              className="w-full md:w-auto"
              onClick={() => {
                form.setValue("id", form.getValues("id"), {
                  shouldDirty: true,
                });
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="w-full border rounded-md min-h-96 p-4 grid ">
          <AdvancedEditor
            content={form.watch("profile")}
            onChange={(content) => {
              form.setValue("profile", content, {
                shouldDirty: false,
              });
            }}
          />
        </div>
      </section>

      <button type="submit" ref={formSubmitRef} className="hidden">
        save
      </button>
    </form>
  );
}
