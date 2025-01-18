import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages } from "@optima/supabase/queries";
import type { Candidate } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import { Separator } from "@optima/ui/separator";
import { JobLinkIcon, Linkedin01Icon } from "hugeicons-react";
import { headers } from "next/headers";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";

const stageIds = [
  "61d058c6-19fc-4d9e-924f-75f138cca0c4",
  "8282590a-d43d-407c-b647-85bb66b9e388",
  "b389bd71-b7dd-4d37-8411-da80b32d3d64",
  "feb1ff83-bd00-4611-b4de-7a7ce5e62a63",
];

const demoCandidates = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "1234567890",
    time_zone: "America/New_York",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/john-doe-1234567890",
    },
    job_listing_id: {
      title: "Software Engineer",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "2345678901",
    time_zone: "Europe/London",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/jane-smith",
    },
    job_listing_id: {
      title: "Product Manager",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "3",
    first_name: "Mike",
    last_name: "Johnson",
    email: "mike.johnson@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "3456789012",
    time_zone: "Asia/Tokyo",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/mike-johnson",
    },
    job_listing_id: {
      title: "UX Designer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "4",
    first_name: "Sarah",
    last_name: "Williams",
    email: "sarah.williams@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "4567890123",
    time_zone: "Australia/Sydney",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/sarah-williams",
    },
    job_listing_id: {
      title: "Data Scientist",
    },
    application_id: {
      stage_id: stageIds[3],
    },
  },
];

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

  const groupedCandidates = demoCandidates.reduce<
    Record<string, typeof demoCandidates>
  >(
    (acc, candidate) => {
      const stageId = candidate.application_id.stage_id;
      // @ts-ignore
      if (!acc[stageId]) {
        // @ts-ignore
        acc[stageId] = [];
      }
      // @ts-ignore
      acc[stageId].push(candidate);
      return acc;
    },
    {} as Record<string, typeof demoCandidates>,
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageTitle title="Candidates" />

      <ScrollArea className="w-full flex-1 flex whitespace-nowrap ">
        <div className="flex w-max space-x-4 flex-1 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
          {applicationStages?.map((stage) => (
            <div
              key={stage.id}
              className="w-80 h-full flex-1 bg-muted rounded-md"
            >
              <div className="flex items-center gap-2 p-4">
                <div
                  className={"w-4 h-4 rounded-sm"}
                  style={{ backgroundColor: stage.indicator_color }}
                />
                <p className=" font-medium text-sm md:text-base">
                  {stage.title}
                </p>
                <Badge variant="info" className="ml-auto p-1 py-0.5">
                  55
                </Badge>
              </div>
              <Separator />
              <div className="space-y-4 p-4">
                {groupedCandidates[stage.id]?.map((candidate) => (
                  <div
                    className="space-y-2  bg-accent rounded-md text-sm"
                    key={candidate.id}
                  >
                    <div className="flex items-center gap-2 p-2">
                      <Avatar src={candidate.avatar_url} />
                      <p className=" font-medium flex flex-col truncate ">
                        <span>
                          {candidate.first_name} {candidate.last_name}
                        </span>
                        <span className="text-muted-foreground truncate">
                          {candidate.email}
                        </span>
                      </p>
                    </div>
                    <p className="flex items-center gap-2 p-2 w-full ">
                      <JobLinkIcon strokeWidth={2} size={18} />
                      <span>{candidate.job_listing_id.title}</span>
                      <div className="flex items-center gap-2 ml-auto text-tag-success-text">
                        <BiSolidCircleThreeQuarter />
                        <span>80%</span>
                      </div>
                    </p>
                    <Separator />
                    <div className="flex items-center gap-2 p-2">
                      <Linkedin01Icon strokeWidth={2} size={18} />
                      <span>LinkedIn</span>
                    </div>
                  </div>
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
