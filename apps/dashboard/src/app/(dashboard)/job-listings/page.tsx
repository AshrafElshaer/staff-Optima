import { PageTitle } from "@/components/page-title";
import type { Department, JobListing } from "@optima/supabase/types";

import { createServerClient } from "@/lib/supabase/server";
import { getJobListings } from "@optima/supabase/queries";
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
  GridViewIcon,
  Location01Icon,
  Megaphone01Icon,
  Menu03Icon,
  MoreHorizontalIcon,
  UserAdd01Icon,
} from "hugeicons-react";
import { headers } from "next/headers";
import { FaPause } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";


const filters = [
  {
    label: "Status",
    options: Object.values(jobStatusEnum),
    icon: <MdSignalWifiStatusbarConnectedNoInternet1 className="size-4" />,
  },
  {
    label: "Type",
    options: Object.values(employmentTypeEnum),
    icon: <IoTimerOutline className="size-4" />,
  },
  {
    label: "Location",
    options: Object.values(jobLocationEnum),
    icon: <Location01Icon className="size-4" />,
  },
  {
    label: "Experience",
    options: Object.values(experienceLevelEnum),
    icon: <BriefcaseIcon className="size-4" />,
  },
];

export default async function JobListingsPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");
  const { data: jobListings,error } = await  getJobListings(supabase, organizationId ?? "");

  //   queryKey: ["departments"],
  //   queryFn: async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (!user) return [];

  //     const { data: departments, error } = await getDepartmentsByOrganizationId(
  //       supabase,
  //       user.user_metadata.organization_id,
  //     );
  //     if (error) throw error;
  //     return departments;
  //   },
  // });
  // const adjustedFilters = useMemo(() => {
  //   return [
  //     {
  //       label: "Department",
  //       options: departments?.map((department) => department.name) || [],
  //       icon: <GridViewIcon className="size-4" />,
  //     },
  //     ...filters,
  //   ];
  // }, [departments]);

  // const [selectedFilters, setSelectedFilters] = useState<
  //   {
  //     label: string;
  //     value: string[];
  //   }[]
  // >([]);

  // const handleAddFilter = (label: string, value: string) => {
  //   setSelectedFilters((prev) => {
  //     const existingFilter = prev.find((filter) => filter.label === label);
  //     if (existingFilter) {
  //       return prev.map((filter) =>
  //         filter.label === label
  //           ? { ...filter, value: [...filter.value, value] }
  //           : filter,
  //       );
  //     }
  //     return [...prev, { label, value: [value] }];
  //   });
  // };

  // const handleRemoveFilter = (label: string, value: string) => {
  //   setSelectedFilters((prev) =>
  //     prev.map((filter) =>
  //       filter.label === label
  //         ? { ...filter, value: filter.value.filter((v) => v !== value) }
  //         : filter,
  //     ),
  //   );
  // };

  // const handleClearFilters = () => {
  //   setSelectedFilters([]);
  // };

  // const handleRemoveLabel = (label: string) => {
  //   setSelectedFilters((prev) =>
  //     prev.filter((filter) => filter.label !== label),
  //   );
  // };



  return (
    <div className="flex flex-col gap-8">
      <section className="flex items-center justify-between">
        <PageTitle title="Job Listings" className="text-lg" />
        <Link
          href="/job-listings/new"
          className={buttonVariants({
            variant: "default",
            className: "min-w-fit",
          })}
        >
          <PlusIcon className="size-4" />
          Publish New Job
        </Link>
      </section>
      {/* <section className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-scroll w-full scrollbar-hide">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-fit py-2">
                <FilterAddIcon className="size-4" /> Add Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {adjustedFilters.map((filter) => (
                <DropdownMenuSub key={filter.label}>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    {filter.icon}
                    {filter.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={8} className="w-36">
                    {filter.options.map((option) => (
                      <DropdownMenuCheckboxItem
                        checked={selectedFilters.some(
                          (f) =>
                            f.label === filter.label &&
                            f.value.includes(option),
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleAddFilter(filter.label, option);
                          } else {
                            handleRemoveFilter(filter.label, option);
                          }
                        }}
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                        key={option}
                        className="capitalize"
                      >
                        {option.split("_").join(" ")}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedFilters.length > 0 && (
            <>
              <div className="flex items-center gap-2 ">
                {selectedFilters.map(
                  (filter) =>
                    filter.value.length > 0 && (
                      <div
                        key={filter.label}
                        className="flex items-stretch gap-2 text-sm bg-accent px-3 py-2 rounded-md font-medium border min-w-fit"
                      >
                        <p className="text-secondary-foreground">
                          {filter.label}
                        </p>
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
                          onClick={() => handleRemoveLabel(filter.label)}
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ),
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="min-w-fit"
              >
                Clear all
              </Button>
            </>
          )}
        </div>

        <div className="w-full sm:w-fit ml-auto">
          <Input
            placeholder="Search by title"
            startIcon={<SearchIcon className="size-5" />}
          />
        </div>
      </section> */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobListings?.map((job) => (
          <JobListingCard key={job.id} job={job as unknown as JobListing & { department: Department }} />
        ))}
      </section>
    </div>
  );
}

import { useSupabase } from "@/hooks/use-supabase";
import { getDepartmentsByOrganizationId } from "@optima/supabase/queries";
import { Badge } from "@optima/ui/badge";
import { Button, buttonVariants } from "@optima/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
// import { Input } from "@optima/ui/inputs";
// import { useQuery } from "@tanstack/react-query";
import {
  BriefcaseIcon,
  Check,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { JobListingCard } from "@/features/job-listings/components/job-card";
// import { useMemo, useState } from "react";


