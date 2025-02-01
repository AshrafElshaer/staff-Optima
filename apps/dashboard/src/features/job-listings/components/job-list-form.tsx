"use client";

import { BackButton } from "@/components/back-button";
import { DepartmentSelector } from "@/components/selectors/department-selector";
import { EmploymentTypeSelector } from "@/components/selectors/employment-type-selector";
import { ExperienceLevelSelector } from "@/components/selectors/experience-level-selector";
import { JobLocationSelector } from "@/components/selectors/job-location-selector";
import { SimpleEditor } from "@optima/editors";
import { Button } from "@optima/ui/button";
import { Checkbox } from "@optima/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingSchema } from "@optima/supabase/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";
import { AutoResizeTextArea, Input, TagsInput } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { CheckmarkBadge03Icon, Megaphone01Icon } from "hugeicons-react";
import { PlusIcon, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createJobListingAction } from "../job-listings.actions";
import { Loader } from "lucide-react";

const COMPANY_BENEFITS = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "Mental Health Resources",
  "401(k) Retirement Plan",
  "Competitive Salary with Performance Bonuses",
  "Stock Options / Equity Grants",
  "Profit Sharing or Revenue Sharing",
  "Paid Time Off (PTO)",
  "Flexible Spending Accounts (FSAs)",
  "Employee Assistance Program (EAP)",
  "Employee Discounts",
];

export function JobListForm() {
  const { execute: createJobListing, isExecuting: isCreating } = useAction(
    createJobListingAction,
    {
      onSuccess: () => {
        toast.success("Job listing created successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );
  const form = useForm<z.infer<typeof jobListingSchema>>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      id: "",
      benefits: [],
      screening_questions: [],
      skills: [],
      salary_range: "",
      title: "",
      department_id: "",
      job_details: "",
      created_at: "",
      updated_at: "",
      organization_id: "",
      created_by: "",
      status: "draft",
    },
  });

  function handleSubmit(data: z.infer<typeof jobListingSchema>) {
    if (data.id.length > 0) {
      // updateJobListing(data);
    } else {
      const {
        id,
        created_at,
        updated_at,
        organization_id,
        created_by,
        ...rest
      } = data;
      createJobListing(rest);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-12 flex-1"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <section className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <BackButton />
          <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              type="submit"
              disabled={isCreating}
            >
              {isCreating ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <CheckmarkBadge03Icon className="size-4" strokeWidth={2} />
              )}
              Save as Draft
            </Button>
            <Button
              className="w-full sm:w-auto"
              type="button"
              disabled={isCreating}
            >
              <Megaphone01Icon className="size-4" strokeWidth={2} />
              Publish
            </Button>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Software Engineer"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <DepartmentSelector
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <JobLocationSelector
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employment_type"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <EmploymentTypeSelector
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>
                      Salary Range
                      <span className="text-muted-foreground text-sm ml-2">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$100,000 - $150,000"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <ExperienceLevelSelector
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Required Skills
                    <span className="text-muted-foreground text-sm ml-2">
                      (Optional) Separated by enter key
                    </span>
                  </FormLabel>
                  <FormControl>
                    <TagsInput
                      onChange={(value) =>
                        // @ts-ignore
                        field.onChange(value.map((tag) => tag.text))
                      }
                      tags={
                        field.value?.map((skill: string) => ({
                          id: skill,
                          text: skill,
                        })) || []
                      }
                      placeholder="Add a skill"
                      containerClassName="w-full min-h-20 items-start justify-start"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex-1 flex flex-col h-full">
            <Label className="mb-2">
              Extra Custom Questions
              <span className="text-muted-foreground ml-2">(Optional)</span>
            </Label>
            <span className="text-muted-foreground text-sm mb-4">
              These questions will be added to the job posting and the candidate
              will be able to answer them.
            </span>
            <div className="flex flex-col flex-1 gap-4 border rounded-md p-4">
              {form.watch("screening_questions")?.map((question, index) => (
                <div className="relative" key={index.toString()}>
                  <AutoResizeTextArea
                    placeholder="Question"
                    className="pr-10"
                    value={question}
                    onChange={(e) =>
                      form.setValue(
                        "screening_questions",
                        form
                          .getValues("screening_questions")
                          ?.map((q, i) => (i === index ? e.target.value : q)) ||
                          [],
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="size-4 absolute right-2 top-3"
                    onClick={() =>
                      form.setValue(
                        "screening_questions",
                        form
                          .getValues("screening_questions")
                          ?.filter((_, i) => i !== index) || [],
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
                type="button"
                onClick={() =>
                  form.setValue("screening_questions", [
                    ...(form.getValues("screening_questions") || []),
                    "",
                  ])
                }
              >
                <PlusIcon className="size-4" />
                Add Question
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full space-y-8">
          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Company Benefits
                  <span className="text-muted-foreground text-sm ml-2">
                    (Optional)
                  </span>
                </FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COMPANY_BENEFITS.map((benefit) => (
                    <div className="flex items-start gap-2" key={benefit}>
                      <Checkbox
                        id={benefit}
                        checked={
                          form.watch("benefits")?.includes(benefit) || false
                        }
                        onCheckedChange={(checked) =>
                          form.setValue(
                            "benefits",
                            checked
                              ? [...(form.watch("benefits") || []), benefit]
                              : (form.watch("benefits") || []).filter(
                                  (b) => b !== benefit,
                                ),
                          )
                        }
                      />
                      <Label htmlFor={benefit}>{benefit}</Label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="job_details"
          render={({ field }) => (
            <FormItem className="w-full flex-1 flex flex-col min-h-96">
              <FormLabel>Job Description</FormLabel>
              <p className="text-muted-foreground mb-4">
                Provide a detailed description of the job posting.
              </p>
              <FormControl>
                <div className="flex flex-col flex-1 border rounded-md [&>*:first-child]:flex-1">
                  <SimpleEditor
                    content={field.value || ""}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
