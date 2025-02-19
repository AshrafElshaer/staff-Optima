import { PageTitle } from "@/components/page-title";

import { CandidateSheet } from "@/features/candidates/components/candidate-sheet";

import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages, getCandidates } from "@optima/supabase/queries";
import type { CandidateWithApplication } from "@optima/supabase/types";

import { Badge } from "@optima/ui/badge";

import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import { Separator } from "@optima/ui/separator";

import { headers } from "next/headers";

export default async function CandidatesPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");

  const { data: candidates } = await getCandidates(
    supabase,
    organizationId as string,
  );

  const { data: applicationStages } = await getApplicationStages(
    supabase,
    organizationId as string,
  );

  if (!applicationStages) {
    return <div>No application stages found</div>;
  }

  const groupedCandidates = candidates?.reduce<
    Record<string, CandidateWithApplication[]>
  >(
    (acc, candidate) => {
      const stageId = candidate.applications[0]?.stage_id;
      if (!stageId) {
        return acc;
      }
      if (!acc[stageId]) {
        acc[stageId] = [];
      }
      acc[stageId].push(candidate as CandidateWithApplication);
      return acc;
    },
    {} as Record<string, CandidateWithApplication[]>,
  );

  // Sort candidates in each stage by match percentage
  for (const [stageId, candidates] of Object.entries(groupedCandidates ?? {})) {
    if (candidates) {
      candidates.sort((a, b) => {
        const matchA = a.applications[0]?.candidate_match ?? 0;
        const matchB = b.applications[0]?.candidate_match ?? 0;
        return matchB - matchA; // Sort descending
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageTitle title="Candidates" />

      <ScrollArea className="w-full flex-1 flex whitespace-nowrap ">
        <div className="flex w-max space-x-4 flex-1 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] ">
          {applicationStages?.map((stage) => (
            <div
              key={stage.id}
              className="w-80 h-full flex-1 flex flex-col border rounded-md "
            >
              <div className="flex items-center gap-2 p-4">
                <div
                  className={"w-4 h-4 rounded-sm"}
                  style={{ backgroundColor: stage.indicator_color }}
                />
                <p className=" font-medium text-sm md:text-base">
                  {stage.title}
                </p>
                <Badge variant="info" className="ml-auto">
                  {groupedCandidates?.[stage.id]?.length || 0}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-4 p-2 flex-1 overflow-y-scroll scrollbar-hide">
                {groupedCandidates?.[stage.id]?.map((candidate) => (
                  <CandidateSheet key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
