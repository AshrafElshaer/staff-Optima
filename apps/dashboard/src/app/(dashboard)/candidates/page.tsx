import { PageTitle } from "@/components/page-title";
import { CandidateCard } from "@/features/candidates/components/candidate-card";
import { CandidateSheet } from "@/features/candidates/components/candidate-sheet";
import { getLinkIcon } from "@/lib/get-link-icon";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages, getCandidates } from "@optima/supabase/queries";
import type {
  Application,
  Candidate,
  CandidateWithApplication,
  JobPost,
} from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import { buttonVariants } from "@optima/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import { Separator } from "@optima/ui/separator";
import { JobLinkIcon, Linkedin01Icon, MoreVerticalIcon } from "hugeicons-react";
import { LinkIcon, MoreHorizontalIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default async function CandidatesPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");

  const { data: candidates } = await getCandidates(
    supabase,
    organizationId as string,
  );
  // console.dir(candidates, { depth: Number.POSITIVE_INFINITY });

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
      // @ts-ignore
      if (!acc[stageId]) {
        // @ts-ignore
        acc[stageId] = [];
      }
      // @ts-ignore
      acc[stageId].push(candidate);
      return acc;
    },
    {} as Record<string, CandidateWithApplication[]>,
  );

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
                <Badge variant="info" className="ml-auto" size="md">
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
