import { HoverCardContent } from "@optima/ui/hover-card";
import {
  Delete01Icon,
  Edit01Icon,
  Megaphone01Icon,
  Menu03Icon,
  MoreHorizontalIcon,
  UserAdd01Icon,
} from "hugeicons-react";

import { HoverCardTrigger } from "@optima/ui/hover-card";

import type { Department, JobPost } from "@optima/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@optima/ui/dropdown-menu";
import { DropdownMenuContent } from "@optima/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@optima/ui/dropdown-menu";
import { HoverCard } from "@optima/ui/hover-card";
import { Progress } from "@optima/ui/progress";
import { Separator } from "@optima/ui/separator";
import { Calendar03Icon } from "hugeicons-react";

import { FaPause } from "react-icons/fa";

interface JobCardProps {
  job: JobPost & {
    department: Department & { applications: [{ count: number }] };
  };
}

export function JobListingCard({ job }: JobCardProps) {
  return (
    <Card key={job.id} className=" bg-accent space-y-2">
      <CardHeader className="p-4 pb-0 ">
        <CardTitle className="flex items-center">
          {job.title}
          {/* <JobCardDropdown /> */}
        </CardTitle>
        <CardDescription className="text-secondary-foreground capitalize">
          {job.department.name} • {job.employment_type.split("_").join(" ")} -{" "}
          {job.location.split("_").join(" ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-0 space-y-2">
        <p className="text-sm ">
          <span className="text-secondary-foreground">Deadline:</span>{" "}
          <span>5 Days left</span>
        </p>
        <Progress value={50} indicatorBg="success" />
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center gap-2 text-sm">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2">
            <Calendar03Icon className="size-4" />
            <p className=" font-medium">
              {new Date(job.created_at).toLocaleDateString()}
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="bg-background">
            <p className=" font-medium">Published At</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className="flex items-center gap-2 ml-auto">
            <UserAdd01Icon className="size-4" />
            <p className=" font-medium">12</p>
          </HoverCardTrigger>
          <HoverCardContent className="bg-background">
            <p className=" font-medium">Applications</p>
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  );
}

function JobCardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto ">
        <MoreHorizontalIcon className="size-5" strokeWidth={4} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem>
          <Edit01Icon size={18} strokeWidth={2} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Menu03Icon size={18} strokeWidth={2} />
            Actions
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent sideOffset={8} className="w-36">
            <DropdownMenuItem>
              <Megaphone01Icon size={18} strokeWidth={2} />
              Publish
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaPause size={18} strokeWidth={2} />
              Pause
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Delete01Icon size={18} strokeWidth={2} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
