"use client";
import { Button } from "@optima/ui/button";

import { Label } from "@optima/ui/label";
import { parsePhoneNumber } from "react-phone-number-input";

import { PhoneInput } from "@/components/phone-number-input";
import { updateUserAction } from "@/features/user/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@optima/supabase/types";
import { userUpdateSchema } from "@optima/supabase/validations";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Input } from "@optima/ui/inputs";
import { Separator } from "@optima/ui/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
export function ContactInfo({ user }: { user: User }) {
  const { execute: updateUser, isExecuting } = useAction(updateUserAction, {
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const phoneNumberCountry = parsePhoneNumber(user.phone_number)?.country;

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
    },
  });

  function onSubmit(data: z.infer<typeof userUpdateSchema>) {
    updateUser(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Contact Information</CardTitle>
        {/* <CardDescription>Manage your account settings and preferences.</CardDescription> */}
      </CardHeader>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 w-full md:w-1/3">
            <Label>Email Address</Label>
            <Input
              placeholder="example@domain.com"
              {...form.register("email")}
              error={form.formState.errors.email?.message}
            />
          </div>
          <div className="space-y-2 w-full md:w-1/3">
            <Label>Phone Number</Label>
            <PhoneInput
              value={form.watch("phone_number")?.replace(/\s+/g, "")}
              onChange={(value) =>
                form.setValue("phone_number", value, {
                  shouldDirty: true,
                })
              }
              defaultCountry={phoneNumberCountry}
              error={form.formState.errors.phone_number?.message}
            />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end p-3 gap-2 items-center">
          {form.formState.isDirty && (
            <Button
              variant="outline"
              disabled={isExecuting}
              onClick={() => form.reset()}
              type="button"
            >
              Reset
            </Button>
          )}
          <Button
            disabled={!form.formState.isDirty || isExecuting}
            type="submit"
          >
            {isExecuting ? <Loader className="w-4 h-4 animate-spin" /> : null}
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
