"use client";

import { filterSearchParamsParser } from "@/lib/filters.search-params";
import { createBrowserClient } from "@/lib/supabase/browser";
import { getDepartmentsByOrganizationId } from "@optima/supabase/queries";
import {
  type EmploymentType,
  type ExperienceLevel,
  type JobLocation,
  employmentTypeEnum,
  experienceLevelEnum,
  jobLocationEnum,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { Label } from "@optima/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@optima/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
export function PositionsFilters() {
  const [filters, setFilters] = useQueryStates(filterSearchParamsParser, {
    shallow: false,
  });
  const supabase = createBrowserClient();

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not found");
      }
      const { data, error } = await getDepartmentsByOrganizationId(
        supabase,
        user.user_metadata.organization_id,
      );
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <Label>Department</Label>
        <Select
          value={filters.department[0]}
          onValueChange={(value) =>
            setFilters({ ...filters, department: [value] })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments?.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Select
          value={filters.location[0]}
          onValueChange={(value) =>
            setFilters({ ...filters, location: [value as JobLocation] })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(jobLocationEnum).map((location) => (
              <SelectItem
                key={location}
                value={location}
                className="capitalize"
              >
                {location.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Experience Level</Label>
        <Select
          value={filters.experience[0]}
          onValueChange={(value) =>
            setFilters({ ...filters, experience: [value as ExperienceLevel] })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select an experience level" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(experienceLevelEnum).map((level) => (
              <SelectItem key={level} value={level} className="capitalize">
                {level.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Employment Type</Label>
        <Select
          value={filters.type[0]}
          onValueChange={(value) =>
            setFilters({ ...filters, type: [value as EmploymentType] })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select an employment type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(employmentTypeEnum).map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {Object.values(filters).some((filter) => filter.length > 0) && (
        <Button
          variant="secondary"
          className="w-full col-span-2"
          onClick={() =>
            setFilters({
              department: [],
              location: [],
              experience: [],
              type: [],
            })
          }
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
