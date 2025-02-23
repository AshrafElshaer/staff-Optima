"use client";
import { SearchIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";

import {
  employmentTypeEnum,
  experienceLevelEnum,
  jobLocationEnum,
  JobPostCampaignStatus,
  jobPostCampaignStatusEnum,
} from "@optima/supabase/types";

import { BriefcaseIcon, X } from "lucide-react";

// import { jobPostsSearchParams } from "../candidates.search-params";
import { useSession } from "@/hooks/use-session";
import { useSupabase } from "@/hooks/use-supabase";
import {
  getDepartmentsByOrganizationId,
  getJobPosts,
} from "@optima/supabase/queries";
import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/inputs";
import { Separator } from "@optima/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { FilterAddIcon, GridViewIcon, Location01Icon } from "hugeicons-react";
import { useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";
import { candidatesSearchParams } from "../candidates.search-params";
const filters = [
  {
    label: "Status",
    options: Object.values(jobPostCampaignStatusEnum).map((status) => ({
      label: status,
      value: status,
    })),
    icon: <MdSignalWifiStatusbarConnectedNoInternet1 className="size-4" />,
  },
  {
    label: "Type",
    options: Object.values(employmentTypeEnum).map((type) => ({
      label: type,
      value: type,
    })),
    icon: <IoTimerOutline className="size-4" />,
  },
  {
    label: "Location",
    options: Object.values(jobLocationEnum).map((location) => ({
      label: location,
      value: location,
    })),
    icon: <Location01Icon className="size-4" />,
  },
  {
    label: "Experience",
    options: Object.values(experienceLevelEnum).map((experience) => ({
      label: experience,
      value: experience,
    })),
    icon: <BriefcaseIcon className="size-4" />,
  },
];

export function CandidatesFilters() {
  const [selectedFilters, setSelectedFilters] = useQueryStates(
    candidatesSearchParams,
    {
      shallow: false,
    },
  );
  const { data: session } = useSession();
  const supabase = useSupabase();

  const { data: departments, error } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!session?.user) throw new Error("User not found");
      const { data: departments, error } = await getDepartmentsByOrganizationId(
        supabase,
        session.user.user_metadata.organization_id,
      );
      if (error) throw error;
      return departments;
    },
  });

  const { data: jobs, error: jobsError } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!session?.user) throw new Error("User not found");
      const { data: jobs, error } = await getJobPosts(
        supabase,
        session.user.user_metadata.organization_id,
      );
      if (error) throw error;
      return jobs;
    },
  });

  const adjustedFilters = useMemo(() => {
    return [
      {
        label: "Department",
        options:
          departments?.map((department) => ({
            label: department.name,
            value: department.id,
          })) || [],
        icon: <GridViewIcon className="size-4" />,
      },
      {
        label: "Job",
        options:
          jobs?.map((job) => ({
            label: job.title,
            value: job.id,
          })) || [],
        icon: <BriefcaseIcon className="size-4" />,
      },
    ];
  }, [departments, jobs]);

  const handleAddFilter = (label: string, value: string) => {
    const target = label.toLowerCase() as keyof typeof selectedFilters;
    setSelectedFilters((prev) => ({
      ...prev,
      [target]: [...(prev[target] || []), value],
    }));
  };

  const handleRemoveFilter = (label: string, value: string) => {
    const target = label.toLowerCase() as keyof typeof selectedFilters;
    setSelectedFilters((prev) => ({
      ...prev,
      [target]: Array.isArray(prev[target])
        ? prev[target].filter((v: string) => v !== value)
        : [],
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      department: [],
      job: [],
      email: "",
    });
  };

  const handleRemoveLabel = (label: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label.toLowerCase()]: [],
    }));
  };

  return (
    <section className="flex flex-col sm:flex-row items-center gap-4">
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
                <DropdownMenuSubContent sideOffset={8} className="w-48">
                  {filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      checked={Boolean(
                        (
                          selectedFilters[
                            filter.label.toLowerCase() as keyof typeof selectedFilters
                          ] as string[]
                        )?.includes(option.value),
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleAddFilter(
                            filter.label.toLowerCase(),
                            option.value,
                          );
                        } else {
                          handleRemoveFilter(
                            filter.label.toLowerCase(),
                            option.value,
                          );
                        }
                      }}
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                      key={option.value}
                      className="capitalize"
                    >
                      {option.label.split("_").join(" ")}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {Object.keys(selectedFilters).length > 0 && (
          <>
            <div className="flex items-center gap-2 ">
              {Object.entries(selectedFilters).map(
                ([key, values]) =>
                  key !== "email" &&
                  values.length > 0 && (
                    <div
                      key={key}
                      className="flex items-stretch gap-2 text-sm bg-accent px-3 py-2 rounded-md font-medium border min-w-fit"
                    >
                      <p className="text-secondary-foreground capitalize">
                        {key}
                      </p>
                      <Separator orientation="vertical" />
                      <div className="flex items-center gap-2">
                        {Array.isArray(values) &&
                          values.map((value: string) => (
                            <p key={value} className="capitalize">
                              {key === "department"
                                ? departments?.find((d) => d.id === value)
                                    ?.name ?? value
                                : key === "job"
                                  ? jobs?.find((j) => j.id === value)?.title ??
                                    value
                                  : value.split("_").join(" ")}
                              ,
                            </p>
                          ))}
                      </div>
                      <Separator orientation="vertical" />
                      <button
                        type="button"
                        onClick={() => handleRemoveLabel(key)}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ),
              )}
            </div>
            {Object.entries(selectedFilters).some(
              ([key, values]) => key !== "email" && values.length > 0,
            ) && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="min-w-fit"
              >
                Clear all
              </Button>
            )}
          </>
        )}
      </div>

      <div className="w-full sm:w-96 ml-auto">
        <Input
          placeholder="Search by email"
          startIcon={<SearchIcon className="size-5" />}
          value={selectedFilters.email}
          onChange={(e) => {
            setSelectedFilters((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
      </div>
    </section>
  );
}
