"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User, UserAccessRole } from "@optima/supabase/types";
import { userUpdateSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";
import { Input } from "@optima/ui/inputs";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateTeamMemberAction } from "../members.actions";
import { AccessRoleSelector } from "./access-role-selector";

export function UpdateMember({
  children,
  user,
}: { children: ReactNode; user: User }) {
  const [open, setOpen] = useState(false);
  const { execute, isExecuting } = useAction(updateTeamMemberAction, {
    onSuccess: ({ data }) => {
      toast.success("Changes Saved successfully");
      setOpen(false);
      form.reset(data);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: user,
  });

  function onSubmit(data: z.infer<typeof userUpdateSchema>) {
    execute(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Edit Team Member
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel htmlFor="edit-first-name">First Name</FormLabel>
                      <FormControl>
                        <Input id="edit-first-name" placeholder="Matt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel htmlFor="edit-last-name">Last Name</FormLabel>
                      <FormControl>
                        <Input id="edit-last-name" placeholder="Welsh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="edit-email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="edit-email"
                        className="peer pe-9"
                        placeholder="example@domain.com"
                        type="email"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="access_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="edit-access-role">Access Role</FormLabel>
                    <FormControl>
                      <AccessRoleSelector
                        value={field.value as UserAccessRole}
                        onChange={field.onChange}
                        error={form.formState.errors.access_role?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="border-t border-border px-6 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isExecuting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isExecuting}>
                {isExecuting ? <Loader className="size-4 animate-spin" /> : null}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
