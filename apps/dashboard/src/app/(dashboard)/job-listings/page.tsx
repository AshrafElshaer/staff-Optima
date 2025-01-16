"use client";

import { PageTitle } from "@/components/page-title";
import type { Department, JobListing } from "@optima/supabase/types";
import {
  employmentTypeEnum,
  experienceLevelEnum,
  jobLocationEnum,
  jobStatusEnum,
} from "@optima/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Progress } from "@optima/ui/progress";
import { Separator } from "@optima/ui/separator";
import {
  Calendar01Icon,
  Calendar03Icon,
  Delete01Icon,
  Edit01Icon,
  FilterAddIcon,
  Megaphone01Icon,
  Menu03Icon,
  MoreHorizontalIcon,
  UserAdd01Icon,
} from "hugeicons-react";
import { FaPause } from "react-icons/fa6";

interface JobListingWithDepartment extends JobListing {
  department: Department;
}

const demoJobListing: JobListingWithDepartment[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    created_by: "1",
    department_id: "1",
    title: "Senior Frontend Engineer",
    details: {
      description:
        "Looking for an experienced frontend developer with React expertise",
    },
    employment_type: "full_time",
    experience_level: "senior",
    status: "published",
    location: "remote",
    organization_id: null,
    salary_range: "$120k-150k",
    screening_questions: null,
    updated_at: "",
    department: {
      id: "1",
      name: "Engineering",
      created_at: new Date().toISOString(),
      organization_id: null,
      updated_at: "",
    },
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    created_by: "1",
    department_id: "2",
    title: "Product Manager",
    details: {
      description: "Lead product strategy and execution for our core platform",
    },
    employment_type: "full_time",
    experience_level: "lead",
    status: "published",
    location: "hybrid",
    organization_id: null,
    salary_range: "$140k-180k",
    screening_questions: null,
    updated_at: "",
    department: {
      id: "2",
      name: "Product",
      created_at: new Date().toISOString(),
      organization_id: null,
      updated_at: "",
    },
  },
  {
    id: "3",
    created_at: new Date().toISOString(),
    created_by: "1",
    department_id: "3",
    title: "DevOps Engineer",
    details: {
      description:
        "Build and maintain our cloud infrastructure and CI/CD pipelines",
    },
    employment_type: "contract",
    experience_level: "mid",
    status: "published",
    location: "remote",
    organization_id: null,
    salary_range: "$100k-130k",
    screening_questions: null,
    updated_at: "",
    department: {
      id: "3",
      name: "Infrastructure",
      created_at: new Date().toISOString(),
      organization_id: null,
      updated_at: "",
    },
  },
  {
    id: "4",
    created_at: new Date().toISOString(),
    created_by: "1",
    department_id: "4",
    title: "UX Designer",
    details: {
      description:
        "Create delightful user experiences for our enterprise products",
    },
    employment_type: "full_time",
    experience_level: "mid",
    status: "draft",
    location: "on_site",
    organization_id: null,
    salary_range: "$90k-120k",
    screening_questions: null,
    updated_at: "",
    department: {
      id: "4",
      name: "Design",
      created_at: new Date().toISOString(),
      organization_id: null,
      updated_at: "",
    },
  },
  {
    id: "5",
    created_at: new Date().toISOString(),
    created_by: "1",
    department_id: "1",
    title: "Backend Engineer Intern",
    details: {
      description: "Join our backend team and learn modern API development",
    },
    employment_type: "internship",
    experience_level: "junior",
    status: "published",
    location: "hybrid",
    organization_id: null,
    salary_range: "$30/hr",
    screening_questions: null,
    updated_at: "",
    department: {
      id: "1",
      name: "Engineering",
      created_at: new Date().toISOString(),
      organization_id: null,
      updated_at: "",
    },
  },
];

const filters = [
  {
    label: "Status",
    options: Object.values(jobStatusEnum),
  },
  {
    label: "Department",
    options: ["engineering", "product", "infrastructure", "design"],
  },
  {
    label: "Type",
    options: Object.values(employmentTypeEnum),
  },
  {
    label: "Location",
    options: Object.values(jobLocationEnum),
  },
  {
    label: "Experience",
    options: Object.values(experienceLevelEnum),
  },
];

export default function JobListingsPage() {
  const [selectedFilters, setSelectedFilters] = useState<
    {
      label: string;
      value: string[];
    }[]
  >([]);

  const handleAddFilter = (label: string, value: string) => {
    setSelectedFilters((prev) => {
      const existingFilter = prev.find((filter) => filter.label === label);
      if (existingFilter) {
        return prev.map((filter) =>
          filter.label === label
            ? { ...filter, value: [...filter.value, value] }
            : filter,
        );
      }
      return [...prev, { label, value: [value] }];
    });
  };

  const handleRemoveFilter = (label: string) => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter.label !== label),
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex items-center justify-between">
        <PageTitle title="Job Listings" className="text-lg" />
        <Button className="min-w-fit ">
          <PlusIcon className="size-4" />
          Create Job Post
        </Button>
      </section>
      <section className="flex flex-col-reverse sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-scroll w-full scrollbar-hide">
          {selectedFilters.length > 0 && (
            <div className="flex items-center gap-2 ">
              {selectedFilters.map((filter) => (
                <div
                  key={filter.label}
                  className="flex items-stretch gap-2 text-sm bg-accent px-3 py-2 rounded-md font-medium border min-w-fit"
                >
                  <p className="text-secondary-foreground">{filter.label}</p>
                  <Separator orientation="vertical" />
                  <div className="flex items-center gap-2">
                    {filter.value.map((value) => (
                      <p key={value} className="capitalize">
                        {value.split("_").join(" ")},
                      </p>
                    ))}
                  </div>
                  <Separator orientation="vertical" />
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(filter.label)}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-fit py-2">
                <FilterAddIcon className="size-4" /> Add Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filters.map((filter) => (
                <DropdownMenuSub key={filter.label}>
                  <DropdownMenuSubTrigger>
                    {filter.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={8} className="w-36">
                    {filter.options.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        className="capitalize"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleAddFilter(filter.label, option);
                        }}
                      >
                        {option.split("_").join(" ")}
                        {selectedFilters.some(
                          (f) =>
                            f.label === filter.label &&
                            f.value.includes(option),
                        ) && <Check className="ml-auto size-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full sm:w-fit ml-auto">
          <Input
            placeholder="Search by title"
            startIcon={<SearchIcon className="size-5" />}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoJobListing.map((job) => (
          <Card key={job.id} className=" bg-accent space-y-2">
            <CardHeader className="p-4 pb-0 ">
              <CardTitle className="flex items-center">
                {job.title}
                <JobCardDropdown />
              </CardTitle>
              <CardDescription className="text-secondary-foreground capitalize">
                {job.department.name} •{" "}
                {job.employment_type.split("_").join(" ")} -{" "}
                {job.location.split("_").join(" ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-0 space-y-2">
              <p className="text-sm font-medium">5 Days left</p>
              <Progress value={50} indicatorBg="destructive" />
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
        ))}
      </section>
    </div>
  );
}

import { Badge } from "@optima/ui/badge";
import { Button } from "@optima/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optima/ui/hover-card";
import { Input } from "@optima/ui/input";
import { Check, FilterIcon, PlusIcon, SearchIcon, X } from "lucide-react";
import { useState } from "react";

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
