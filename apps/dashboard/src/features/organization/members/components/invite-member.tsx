"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { userInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Textarea } from "@optima/ui/textarea";
import { Check, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { inviteMemberAction } from "../members.actions";
import { AccessRoleSelector } from "./access-role-selector";
import { PhoneInput } from "@/components/phone-number-input";

export function InviteMember() {
  const [open, setOpen] = useState(false);
  const { execute, isExecuting } = useAction(inviteMemberAction, {
    onSuccess: () => {
      toast.success("Invitation sent successfully");
      setOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const form = useForm<z.infer<typeof userInsertSchema>>({
    resolver: zodResolver(userInsertSchema),
  });

  function onSubmit(data: z.infer<typeof userInsertSchema>) {
    execute(data);
  }
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="min-w-fit">
          Invite Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Invite Team Member
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone-number">Phone Number</Label>
              <PhoneInput
                value={form.watch("phone_number")}
                onChange={(value) => form.setValue("phone_number", value ?? "")}
                placeholder="+1234567890"
                error={form.formState.errors.phone_number?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-access-role">Access Role</Label>
              <AccessRoleSelector
                value={form.watch("access_role")}
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
              Invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
