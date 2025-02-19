"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { userInsertSchema } from "@optima/supabase/validations";
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
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { inviteMemberAction } from "../members.actions";
import { AccessRoleSelector } from "./access-role-selector";
import { PhoneInput } from "@/components/phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Matt" {...field} />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Welsh" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="peer pe-9"
                        placeholder="example@domain.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
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
                name="access_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Role</FormLabel>
                    <FormControl>
                      <AccessRoleSelector
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("access_role");
                        }}
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
                {isExecuting ? (
                  <Loader className="size-4 animate-spin" />
                ) : null}
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
