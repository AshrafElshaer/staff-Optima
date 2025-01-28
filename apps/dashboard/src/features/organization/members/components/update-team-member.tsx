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
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { type ReactNode, useEffect, useState } from "react";
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

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="edit-first-name">First Name</Label>
                <Input
                  id="edit-first-name"
                  placeholder="Matt"
                  {...form.register("first_name")}
                  error={form.formState.errors.first_name?.message}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="edit-last-name">Last Name</Label>
                <Input
                  id="edit-last-name"
                  placeholder="Welsh"
                  {...form.register("last_name")}
                  error={form.formState.errors.last_name?.message}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                className="peer pe-9"
                placeholder="example@domain.com"
                type="email"
                {...form.register("email")}
                error={form.formState.errors.email?.message}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-access-role">Access Role</Label>
              <AccessRoleSelector
                value={form.watch("access_role") as UserAccessRole}
                onChange={(value) => {
                  form.setValue("access_role", value);
                  form.trigger("access_role");
                }}
                error={form.formState.errors.access_role?.message}
              />
            </div>
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
      </DialogContent>
    </Dialog>
  );
}
