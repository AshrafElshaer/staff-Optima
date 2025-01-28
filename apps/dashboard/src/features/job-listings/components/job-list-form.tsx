"use client";

import { BackButton } from "@/components/back-button";
import { DepartmentSelector } from "@/components/selectors/department-selector";
import { EmploymentTypeSelector } from "@/components/selectors/employment-type-selector";
import { ExperienceLevelSelector } from "@/components/selectors/experience-level-selector";
import { JobLocationSelector } from "@/components/selectors/job-location-selector";
import { Button } from "@optima/ui/button";

import { Input, TagsInput } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { CheckmarkBadge03Icon, Megaphone01Icon } from "hugeicons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function JobListForm() {
  const form = useForm();

  const [skills, setSkills] = useState<{ id: string; text: string }[]>([
    {
      id: "1",
      text: "React",
    },
  ]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <section className="flex items-center gap-4">
        <BackButton />
        <Button className="ml-auto" variant="outline">
          <CheckmarkBadge03Icon className="size-4" strokeWidth={2} />
          Save as Draft
        </Button>
        <Button>
          <Megaphone01Icon className="size-4" strokeWidth={2} />
          Publish
        </Button>
      </section>
      <section className="flex flex-col flex-1 ">
        <h3 className="text-lg font-medium">Essential Information</h3>
        <p className="text-muted-foreground mb-6">
          Provide essential information about the job posting.
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-8 flex-1">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <div className="space-y-2  w-full">
                <Label>Job Title</Label>
                <Input placeholder="Senior Software Engineer" />
              </div>
              <div className="space-y-2  w-full">
                <Label>Department</Label>
                <DepartmentSelector
                  onChange={() => {}}
                  value={form.getValues("department")}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="space-y-2 flex-1 w-full">
                <Label>Location</Label>
                <JobLocationSelector
                  onChange={() => {}}
                  value={form.getValues("jobLocation")}
                />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <Label>Employment Type</Label>
                <EmploymentTypeSelector
                  onChange={() => {}}
                  value={form.getValues("employmentType")}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="space-y-2 flex-1 w-full">
                <Label>Salary Range</Label>
                <Input placeholder="$100,000 - $150,000" />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <Label>Experience Level</Label>
                <ExperienceLevelSelector
                  onChange={() => {}}
                  value={form.getValues("experienceLevel")}
                />
              </div>
            </div>
            <div className="space-y-2 w-full">
              <Label>Required Skills</Label>
              <TagsInput
                onChange={setSkills}
                tags={skills}
                placeholder="Add a skill"
                containerClassName="w-full min-h-20 items-start justify-start"
              />
            </div>
          </div>
          <div className="flex-1 border rounded-md h-full">right side</div>
        </div>
      </section>
    </div>
  );
}
