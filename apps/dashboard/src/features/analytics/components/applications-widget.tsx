import { createServerClient } from "@/lib/supabase/server";
import { Card } from "@optima/ui/card";
import { UserSearch01Icon } from "hugeicons-react";
import moment from "moment";
import { headers } from "next/headers";
import { Skeleton } from "@optima/ui/skeleton";

export async function ApplicationsWidget() {
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");
  const supabase = await createServerClient({
    isAdmin: true,
  });
  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .eq("organization_id", organizationId as string)
    .gte("created_at", moment().startOf("month").toISOString())
    .lte("created_at", moment().endOf("month").toISOString());
  return (
    <Card className="flex items-center  p-4 gap-2 bg-accent">
      <UserSearch01Icon strokeWidth={2} size={20} />
      <span className="font-semibold">Applications</span>
      <span className="text-sm text-secondary-foreground">This month</span>
      <span className="text-lg font-semibold font-mono ml-auto">
        {applications?.length ?? 0}
      </span>
    </Card>
  );
}

export function ApplicationsWidgetSkeleton() {
  return (
    <Card className="flex items-center  p-4 gap-2 bg-accent">
      <UserSearch01Icon strokeWidth={2} size={20} />
      <span className="font-semibold">Applications</span>
      <span className="text-sm text-secondary-foreground">This month</span>
      <Skeleton className="size-7 ml-auto rounded-sm" />
    </Card>
  );
}
