import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages } from "@optima/supabase/queries";
import { Badge } from "@optima/ui/badge";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import { Separator } from "@optima/ui/separator";
import { headers } from "next/headers";

export default async function CandidatesPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");

  const { data: applicationStages } = await getApplicationStages(
    supabase,
    organizationId as string,
  );

  if (!applicationStages) {
    return <div>No application stages found</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageTitle title="Candidates" />

      <ScrollArea className="w-full flex-1 flex whitespace-nowrap ">
        <div className="flex w-max space-x-4 flex-1 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
          {applicationStages?.map((stage) => (
            <div
              key={stage.id}
              className="w-64 h-full flex-1 bg-muted rounded-md"
            >
              <div className="flex items-center gap-2 p-4">
                <div
                  className={"w-4 h-4 rounded-sm"}
                  style={{ backgroundColor: stage.indicator_color }}
                />
                <p className=" font-medium text-sm md:text-base">
                  {stage.title}
                </p>
                <Badge variant="info" className="ml-auto p-1 py-0.5" >
                  55
                </Badge>
              </div>
              <Separator />
              <div className="space-y-4 p-4">
                <div className="flex items-center gap-2 p-2 bg-accent">
                  <p className=" font-medium">candidates</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
