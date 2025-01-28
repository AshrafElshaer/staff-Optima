"use client";
import { updateUserAction } from "@/features/user/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@optima/supabase/types";
import { userUpdateSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Separator } from "@optima/ui/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { z } from "zod";
export function FullName({ user }: { user: User }) {
  const { execute: updateUser, isExecuting } = useAction(updateUserAction, {
    onSuccess: ({ data }) => {
      toast.success("User updated successfully");
      form.reset({
        id: user.id,
        first_name: data?.first_name ?? user.first_name,
        last_name: data?.last_name ?? user.last_name,
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
  function onSubmit(values: z.infer<typeof userUpdateSchema>) {
    updateUser(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Full Name</CardTitle>
      </CardHeader>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 w-full md:w-1/3">
            <Label>First Name</Label>
            <Input
              placeholder="Enter your first name"
              {...form.register("first_name")}
              error={form.formState.errors.first_name?.message}
            />
          </div>
          <div className="space-y-2 w-full md:w-1/3">
            <Label>Last Name</Label>
            <Input
              placeholder="Enter your last name"
              {...form.register("last_name")}
              error={form.formState.errors.last_name?.message}
            />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end p-3 gap-2 items-center">
          {form.formState.isDirty && (
            <Button
              variant="outline"
              type="button"
              disabled={!form.formState.isDirty || isExecuting}
              onClick={() => {
                form.reset();
              }}
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
