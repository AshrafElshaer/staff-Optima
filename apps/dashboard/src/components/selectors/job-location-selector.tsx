"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@optima/ui/select";

import { jobLocationEnum } from "@optima/supabase/types";

export function JobLocationSelector({
  onChange,
  value,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="capitalize">
        <SelectValue placeholder="Select a job location" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(jobLocationEnum).map((location) => (
          <SelectItem key={location} value={location} className="capitalize">
            {location.replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
