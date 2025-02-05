import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import type { Department, JobPost } from "@optima/supabase/types";
import { Badge } from "@optima/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optima/ui/hover-card";
import {
  Clock05Icon,
  GridViewIcon,
  Location05Icon,
  MoneyExchange02Icon,
  TaskDaily01Icon,
} from "hugeicons-react";
import { IoStatsChart } from "react-icons/io5";

export default async function JobPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const supabase = await createServerClient();
  const { data, error } = await getJobPostById(supabase, jobId);
  const job = data as unknown as JobPost & { department: Department };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-7  max-w-4xl mx-auto w-full gap-8 pt-12 relative p-4">
      <section className="flex flex-col gap-3 sm:sticky sm:top-24 h-fit sm:col-span-2">
        <h2 className="text-lg font-bold mb-6">{job?.title}</h2>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
            {/* <div className="flex items-center gap-2"> */}
            <GridViewIcon className="size-4" strokeWidth={2} />
            <p>{job.department.name}</p>
            {/* </div> */}
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="right" >
            <p>Associated Department</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
            <Location05Icon className="size-4" strokeWidth={2} />
            <p>{job.location.replace("_", " ")}</p>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="right">
            <p>Location</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
            <Clock05Icon className="size-4" strokeWidth={2} />
            <p>{job.employment_type.replace("_", " ")}</p>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="right">
            <p>Employment Type</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
            <MoneyExchange02Icon className="size-4" strokeWidth={2} />
            <p>{job.salary_range}</p>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="right">
            <p>Salary Range</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 w-fit capitalize">
            <IoStatsChart className="size-4" />
            <p>{job.experience_level.replace("_", " ")}</p>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="right">
            <p>Experience Level</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-start gap-2 capitalize">
            <TaskDaily01Icon className="size-5 min-w-fit" strokeWidth={2} />
            <div className="flex items-center gap-2 flex-wrap">
              {job?.skills?.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm" side="bottom">
            <p>Required Skills</p>
          </HoverCardContent>
        </HoverCard>
      </section>
      {children}
    </div>
  );
}
