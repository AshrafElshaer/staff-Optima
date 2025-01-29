"use client";

import { BackButton } from "@/components/back-button";
import { DepartmentSelector } from "@/components/selectors/department-selector";
import { EmploymentTypeSelector } from "@/components/selectors/employment-type-selector";
import { ExperienceLevelSelector } from "@/components/selectors/experience-level-selector";
import { JobLocationSelector } from "@/components/selectors/job-location-selector";
import { SimpleEditor } from "@optima/editors";
import { Button } from "@optima/ui/button";

import { Input, TagsInput } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { CheckmarkBadge03Icon, Megaphone01Icon } from "hugeicons-react";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export function JobListForm() {
  const form = useForm();

  const [skills, setSkills] = useState<{ id: string; text: string }[]>([]);
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-12 flex-1">
      <section className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <BackButton />
        <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <CheckmarkBadge03Icon className="size-4" strokeWidth={2} />
            Save as Draft
          </Button>
          <Button className="w-full sm:w-auto">
            <Megaphone01Icon className="size-4" strokeWidth={2} />
            Publish
          </Button>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-start gap-8 flex-1">
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
        <div className="w-full flex-1 flex flex-col h-full ">
          <Label className="mb-2">
            Extra Custom Questions
            <span className="text-muted-foreground ml-2">(Optional)</span>
          </Label>
          <span className="text-secondary-foreground text-sm mb-4">
            These questions will be added to the job posting and the candidate
            will be able to answer them.
          </span>
          <div className="flex flex-col flex-1 gap-4 border rounded-md p-4">
            {customQuestions.map((question, index) => (
              <div className="relative " key={index.toString()}>
                <Input
                  placeholder="Question"
                  className="pr-10 "
                  value={question}
                  onChange={(e) =>
                    setCustomQuestions(
                      customQuestions.map((q, i) =>
                        i === index ? e.target.value : q,
                      ),
                    )
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="size-4 absolute right-2 top-1/2 -translate-y-1/2 "
                  onClick={() =>
                    setCustomQuestions(
                      customQuestions.filter((_, i) => i !== index),
                    )
                  }
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              className="w-full mt-auto"
              variant="secondary"
              onClick={() => setCustomQuestions([...customQuestions, ""])}
            >
              <PlusIcon className="size-4" />
              Add Question
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full flex-1 flex flex-col min-h-96 ">
        <Label className="mb-2">Job Description</Label>
        <p className="text-muted-foreground mb-4">
          Provide a detailed description of the job posting.
        </p>
        {/* <SimpleEditor
          className="border rounded-md flex-1"
          content={form.getValues("jobDescription") ?? ""}
          onChange={(content) => form.setValue("jobDescription", content)}
        /> */}
      </section>
    </div>
  );
}
