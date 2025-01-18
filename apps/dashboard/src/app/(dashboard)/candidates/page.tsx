import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages } from "@optima/supabase/queries";
import type { Candidate } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import { Separator } from "@optima/ui/separator";
import { JobLinkIcon, Linkedin01Icon, MoreVerticalIcon } from "hugeicons-react";
import { Link, LinkIcon, MoreHorizontalIcon } from "lucide-react";
import { headers } from "next/headers";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
  {
    id: "5",
    first_name: "Alex",
    last_name: "Chen",
    email: "alex.chen@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "5678901234",
    time_zone: "Asia/Shanghai",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/alex-chen",
    },
    job_listing_id: {
      title: "Frontend Developer",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "6",
    first_name: "Emily",
    last_name: "Brown",
    email: "emily.brown@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "6789012345",
    time_zone: "America/Chicago",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/emily-brown",
    },
    job_listing_id: {
      title: "Marketing Manager",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "7",
    first_name: "David",
    last_name: "Garcia",
    email: "david.garcia@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "7890123456",
    time_zone: "Europe/Madrid",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/david-garcia",
    },
    job_listing_id: {
      title: "Backend Developer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "8",
    first_name: "Sophie",
    last_name: "Martin",
    email: "sophie.martin@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "8901234567",
    time_zone: "Europe/Paris",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/sophie-martin",
    },
    job_listing_id: {
      title: "Product Designer",
    },
    application_id: {
      stage_id: stageIds[3],
    },
  },
  {
    id: "9",
    first_name: "Ryan",
    last_name: "Taylor",
    email: "ryan.taylor@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "9012345678",
    time_zone: "America/Toronto",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/ryan-taylor",
    },
    job_listing_id: {
      title: "DevOps Engineer",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "10",
    first_name: "Emma",
    last_name: "Wilson",
    email: "emma.wilson@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "0123456789",
    time_zone: "Europe/London",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/emma-wilson",
    },
    job_listing_id: {
      title: "Data Engineer",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "11",
    first_name: "Lucas",
    last_name: "Anderson",
    email: "lucas.anderson@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "1234509876",
    time_zone: "America/Los_Angeles",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/lucas-anderson",
    },
    job_listing_id: {
      title: "Full Stack Developer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "12",
    first_name: "Isabella",
    last_name: "Lopez",
    email: "isabella.lopez@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "2345098761",
    time_zone: "America/Mexico_City",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/isabella-lopez",
    },
    job_listing_id: {
      title: "UI Developer",
    },
    application_id: {
      stage_id: stageIds[3],
    },
  },
  {
    id: "13",
    first_name: "Oliver",
    last_name: "Lee",
    email: "oliver.lee@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "3450987612",
    time_zone: "Asia/Singapore",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/oliver-lee",
    },
    job_listing_id: {
      title: "Systems Architect",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "14",
    first_name: "Sophia",
    last_name: "Kim",
    email: "sophia.kim@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "4509876123",
    time_zone: "Asia/Seoul",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/sophia-kim",
    },
    job_listing_id: {
      title: "Product Analyst",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "15",
    first_name: "William",
    last_name: "Clark",
    email: "william.clark@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "5098761234",
    time_zone: "America/Denver",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/william-clark",
    },
    job_listing_id: {
      title: "Cloud Engineer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "16",
    first_name: "Ava",
    last_name: "Patel",
    email: "ava.patel@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "6098761234",
    time_zone: "Asia/Kolkata",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/ava-patel",
    },
    job_listing_id: {
      title: "ML Engineer",
    },
    application_id: {
      stage_id: stageIds[3],
    },
  },
  {
    id: "17",
    first_name: "James",
    last_name: "Murphy",
    email: "james.murphy@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "7098761234",
    time_zone: "Europe/Dublin",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/james-murphy",
    },
    job_listing_id: {
      title: "Security Engineer",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "18",
    first_name: "Mia",
    last_name: "Schmidt",
    email: "mia.schmidt@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "8098761234",
    time_zone: "Europe/Berlin",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/mia-schmidt",
    },
    job_listing_id: {
      title: "Mobile Developer",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "19",
    first_name: "Ethan",
    last_name: "Nguyen",
    email: "ethan.nguyen@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "9098761234",
    time_zone: "Asia/Ho_Chi_Minh",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/ethan-nguyen",
    },
    job_listing_id: {
      title: "QA Engineer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "20",
    first_name: "Charlotte",
    last_name: "Davies",
    email: "charlotte.davies@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "0987612345",
    time_zone: "Europe/London",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/charlotte-davies",
    },
    job_listing_id: {
      title: "Technical Lead",
    },
    application_id: {
      stage_id: stageIds[3],
    },
  },
  {
    id: "21",
    first_name: "Daniel",
    last_name: "Silva",
    email: "daniel.silva@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "1987612345",
    time_zone: "America/Sao_Paulo",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/daniel-silva",
    },
    job_listing_id: {
      title: "Solutions Architect",
    },
    application_id: {
      stage_id: stageIds[0],
    },
  },
  {
    id: "22",
    first_name: "Victoria",
    last_name: "Wong",
    email: "victoria.wong@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "2987612345",
    time_zone: "Asia/Hong_Kong",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/victoria-wong",
    },
    job_listing_id: {
      title: "DevOps Manager",
    },
    application_id: {
      stage_id: stageIds[1],
    },
  },
  {
    id: "23",
    first_name: "Henry",
    last_name: "O'Connor",
    email: "henry.oconnor@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "3987612345",
    time_zone: "Europe/Dublin",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/henry-oconnor",
    },
    job_listing_id: {
      title: "Site Reliability Engineer",
    },
    application_id: {
      stage_id: stageIds[2],
    },
  },
  {
    id: "24",
    first_name: "Zoe",
    last_name: "Fischer",
    email: "zoe.fischer@example.com",
    avatar_url: "https://github.com/shadcn.png",
    created_at: new Date().toISOString(),
    organization_id: "1",
    phone_number: "4987612345",
    time_zone: "Europe/Berlin",
    updated_at: new Date().toISOString(),
    urls: {
      linkedin: "https://www.linkedin.com/in/zoe-fischer",
    },
    job_listing_id: {
      title: "AI Research Engineer",
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
        <div className="flex w-max space-x-4 flex-1 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] ">
          {applicationStages?.map((stage) => (
            <div
              key={stage.id}
              className="w-80 h-full flex-1 flex flex-col bg-accent rounded-md "
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
                  {groupedCandidates[stage.id]?.length}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-4 p-2 flex-1 overflow-y-scroll scrollbar-hide">
                {groupedCandidates[stage.id]?.map((candidate) => (
                  <div
                    className="bg-background rounded-md text-sm py-4 space-y-4"
                    key={candidate.id}
                  >
                    <div className="flex items-center gap-2 px-4">
                      <Avatar src={candidate.avatar_url} />
                      <p className=" font-medium flex flex-col truncate ">
                        <span>
                          {candidate.first_name} {candidate.last_name}
                        </span>
                        <span className="text-secondary-foreground truncate">
                          {candidate.email}
                        </span>
                      </p>
                    </div>
                    <p className="flex items-center gap-2 px-4 w-full ">
                      <JobLinkIcon strokeWidth={2} size={18} />
                      <span>{candidate.job_listing_id.title}</span>
                      <div className="flex items-center gap-2 ml-auto text-tag-success-text">
                        <BiSolidCircleThreeQuarter />
                        <span>80%</span>
                      </div>
                    </p>
                    <Separator />
                    <div className="flex items-center gap-2 px-4">
                      <FaLinkedinIn
                        strokeWidth={2}
                        size={16}
                        className="text-blue"
                      />
                      <span>LinkedIn</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="ml-auto">
                          <MoreHorizontalIcon strokeWidth={2} size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FaGithub strokeWidth={2} size={16} />
                            <span>GitHub</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FaXTwitter strokeWidth={2} size={16} />
                            <span>X (twitter)</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <LinkIcon strokeWidth={2} size={16} />
                            <span>Website</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
