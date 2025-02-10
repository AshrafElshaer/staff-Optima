"use client";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { useSupabase } from "@/hooks/use-supabase";
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
import { Separator } from "@optima/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyDomainAction } from "../organization.actions";
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
  const {
    data: domainVerification,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["domain-verification", organizationId],
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
      },
      {
        loading: "Verifying your domain...",
        success: "Domain verified successfully",
        error: (error) => `${error.message}`,
      },
    );
  }

  return (
    <Card>
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
        </CardTitle>
        <CardDescription>
          <p>
            Verify your domain to ensure that your organization is properly
            identified.
          </p>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="overflow-x-auto">
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
              <td className="p-2 text-sm flex items-center justify-between relative" >
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
