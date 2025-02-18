"use client";
import { useOrganization } from "@/hooks/use-organization";
import { getLinkIcon } from "@/lib/get-link-icon";
import type { CandidateWithApplication } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import { buttonVariants } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import { Separator } from "@optima/ui/separator";
import { JobLinkIcon, MoreHorizontalIcon } from "hugeicons-react";
import Link from "next/link";
import { BiSolidCircleHalf, BiSolidCircleQuarter, BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";

export function CandidateCard({
  setOpen,
  candidate,
}: { candidate: CandidateWithApplication; setOpen: (open: boolean) => void }) {
  const { data: organization } = useOrganization();
  return (
    <div
      className="bg-accent border rounded-md text-sm py-4 space-y-4"
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setOpen(true);
        }
      }}
      role="button"
    >
      <div className="flex items-center gap-2 px-4">
        <Avatar
          src={candidate.avatar_url}
          initials={
            candidate.first_name.charAt(0) + candidate.last_name.charAt(0)
          }
        />
        <p className=" font-medium flex flex-col truncate ">
          <span>
            {candidate.first_name} {candidate.last_name}
          </span>
          <span className="text-secondary-foreground truncate">
            {candidate.email}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 w-full ">
        <Link
          href={`https://jobs.staffoptima.co/${organization?.domain}/${candidate.applications[0]?.job_posts.id}`}
          target="_blank"
          className={buttonVariants({
            variant: "link",
            className: "!p-0",
          })}
        >
          <JobLinkIcon strokeWidth={2} size={18} />
          <span>{candidate.applications[0]?.job_posts.title}</span>
        </Link>
        <div
          className={cn(
            "flex items-center gap-2 ml-auto ",
            candidate.applications[0]?.candidate_match &&
              (candidate.applications[0]?.candidate_match >= 75
                ? "text-tag-success-text"
                : candidate.applications[0]?.candidate_match >= 50
                ? "text-tag-warning-text" 
                : "text-tag-red-text"),
          )}
        >
          {
            candidate.applications[0]?.candidate_match &&
              (candidate.applications[0]?.candidate_match >= 75
                ? <BiSolidCircleThreeQuarter className="border rounded-full border-current" />
                : candidate.applications[0]?.candidate_match >= 50
                ? <BiSolidCircleHalf className="border rounded-full border-current" />
                : <BiSolidCircleQuarter className="border rounded-full border-current" />
              )
          }
          <span>{candidate.applications[0]?.candidate_match}%</span>
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2 px-4">
        <Link
          // @ts-ignore JSONB is not typed
          href={`https://${candidate.social_links?.linkedin as string}`}
          target="_blank"
          className={buttonVariants({
            variant: "link",
            className: "!p-0",
          })}
        >
          <FaLinkedinIn strokeWidth={2} size={16} className="text-blue" />
          <span>LinkedIn</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto">
            <MoreHorizontalIcon strokeWidth={2} size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {candidate.social_links &&
              Object.entries(candidate.social_links)
                .filter(([key]) => !key.includes("linkedin"))
                .map(([key, value]) => (
                  <DropdownMenuItem key={key} asChild>
                    <Link
                      href={`https://${value}`}
                      target="_blank"
                      className="capitalize"
                    >
                      {getLinkIcon(key)}
                      <span>{key}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
