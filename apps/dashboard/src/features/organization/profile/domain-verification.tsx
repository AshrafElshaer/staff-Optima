"use client";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { useSupabase } from "@/hooks/use-supabase";
import { queryClient } from "@/lib/react-query";
import { getDomainVerificationByOrganizationId } from "@optima/supabase/queries";
import { Badge } from "@optima/ui/badge";
import { Button } from "@optima/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { cn } from "@optima/ui/cn";

import { Separator } from "@optima/ui/separator";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  sendDomainVerificationEmailAction,
  verifyDomainAction,
} from "../organization.actions";

import { Input } from "@optima/ui/inputs";
import { Popover, PopoverContent, PopoverTrigger } from "@optima/ui/popover";
import { MailSend02Icon, SentIcon } from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function DomainVerification({
  organizationId,
}: {
  organizationId: string;
}) {
  const router = useRouter();
  const { executeAsync: verifyDomain, isExecuting } = useAction(
    verifyDomainAction,
    {
      onSuccess: () => {
        router.refresh();
      },
    },
  );
  const supabase = useSupabase();
  const { data: domainVerification } = useQuery({
    queryKey: ["domain-verification"],
    queryFn: async () => {
      const { data, error } = await getDomainVerificationByOrganizationId(
        supabase,
        organizationId,
      );
      if (error) throw error;
      return data;
    },
  });
  if (!domainVerification || domainVerification === undefined) return null;

  const status = domainVerification.verification_status;

  async function handleVerifyDomain() {
    if (!domainVerification) return;
    toast.promise(
      async () => {
        const result = await verifyDomain({
          ...domainVerification,
        });
        if (result?.serverError) {
          throw new Error(result.serverError);
        }
        queryClient.invalidateQueries({
          queryKey: ["organization"],
        });
        queryClient.invalidateQueries({
          queryKey: ["domain-verification"],
        });
      },
      {
        loading: "Verifying your domain...",
        success: "Domain verified successfully",
        error: (error) => `${error.message}`,
      },
    );
  }

  return (
    <Card
      className={cn(
        status === "pending" && "border-warning",
        status === "failed" && "border-destructive",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Domain Verification
          <Badge
            variant={
              status === "pending"
                ? "warning"
                : status === "verified"
                  ? "success"
                  : "destructive"
            }
            className="rounded-sm capitalize"
          >
            {status}
          </Badge>
          <Button
            variant="outline"
            className="ml-auto"
            type="button"
            onClick={handleVerifyDomain}
            disabled={isExecuting}
          >
            {isExecuting ? "Verifying..." : "Verify"}
          </Button>
          <ForwardDnsEmail organizationId={organizationId} />
        </CardTitle>
        <CardDescription>
          <p>
            Verify your domain to ensure that your organization is properly
            identified.
          </p>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="overflow-x-auto space-y-4">
        {domainVerification.verification_date ? (
          <p className="text-secondary-foreground">
            Verified at{" "}
            {moment(domainVerification.verification_date).format("MMM D, YYYY")}
          </p>
        ) : null}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="divide-x *:text-left *:p-2 *:text-sm *:font-medium *:text-muted-foreground border-b">
              <th>Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>TTL</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr className="divide-x">
              <td className="p-2 text-sm flex items-center justify-between relative">
                staffoptima_verification
                <CopyToClipboard text="staffoptima_verification" />
              </td>
              <td className="p-2 text-sm ">TXT</td>
              <td className="p-2 text-sm flex items-center justify-between relative">
                {domainVerification.verification_token}
                <CopyToClipboard text={domainVerification.verification_token} />
              </td>
              <td className="p-2 text-sm ">60</td>
              <td className="p-2 text-sm " />
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircleIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

export function ForwardDnsEmail({
  organizationId,
}: {
  organizationId: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    execute: sendDomainVerificationEmail,
    isExecuting,
    status,
    reset,
  } = useAction(sendDomainVerificationEmailAction, {
    onSuccess: () => {
      form.reset();
      setTimeout(() => {
        setOpen(false);
        reset();
      }, 1000);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendDomainVerificationEmail({ organizationId, sendTo: data.email });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MailSend02Icon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2 p-2" align="end">
        <p className="text-sm text-secondary-foreground">
          Forward Instructions to
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start gap-2"
        >
          <Input
            {...form.register("email")}
            error={form.formState.errors.email?.message}
            placeholder="Email"
          />
          <Button
            variant="secondary"
            size="icon"
            type="submit"
            disabled={isExecuting}
          >
            <AnimatePresence mode="wait">
              {status === "executing" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                </motion.div>
              ) : status === "hasSucceeded" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Check className="w-4 h-4 text-success" />
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <SentIcon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
