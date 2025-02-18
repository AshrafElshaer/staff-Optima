"use client";
import {
  type AttachmentType,
  type JobPost,
  attachmentTypeEnum,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { DatePickerWithSelect } from "@optima/ui/date-picker-with-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  AutoResizeTextArea,
  Input,
  PhoneInput,
  TagsInput,
  UrlInput,
} from "@optima/ui/inputs";
import type { Country } from "react-phone-number-input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationInsertSchema,
  candidateInsertSchema,
} from "@optima/supabase/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";
import { Label } from "@optima/ui/label";
import {
  CountrySelector,
  GenderSelector,
  TimezoneSelector,
} from "@optima/ui/selectors";
import { Separator } from "@optima/ui/separator";
import { Loading03Icon } from "hugeicons-react";
import { X } from "lucide-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";

import { createApplicationAction } from "@/acttions/apply-for-job";
import { calculateCandidateMatch } from "@/lib/ai/get-candidate-match";
import { countriesMap } from "@optima/location";
import { toast } from "sonner";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { ExtraFiles } from "./drop-zones/extra-files";
import { UploadTranscript } from "./drop-zones/upload-transcript";
import { UploadResume } from "./drop-zones/uploasd-resume";

type ApplicationFormProps = {
  job: JobPost;
};

const formSchema = z.object({
  candidate: candidateInsertSchema,
  application: applicationInsertSchema,
  attachments: z.array(
    z.object({
      fileType: z.nativeEnum(attachmentTypeEnum),
      file: zfd.file(),
    }),
  ),
});

export function ApplicationForm({ job }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { executeAsync: applyForJob } = useAction(createApplicationAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidate: {
        organization_id: job.organization_id ?? "",
        avatar_url: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        country: "",
        city: "",
        gender: "",
        date_of_birth: moment().subtract(16, "years").toISOString(),
        timezone: "",

        educations: [
          {
            school: "",
            degree: "",
            graduation_date: "",
            gpa: "",
          },
        ],
        experiences: [
          {
            company: "",
            position: "",
            start_date: "",
            end_date: null,
            description: "",
            skills: [],
          },
        ],
        social_links: {
          linkedin: "",
        },
      },
      application: {
        organization_id: job.organization_id ?? "",
        screening_question_answers: job.screening_questions?.map(
          (question) => ({
            question,
            answer: "",
          }),
        ),
        source: "website",
        candidate_match: 0,
        job_id: job.id,
        department_id: job.department_id ?? "",
        rejection_reason_id: null,
      },
      attachments: [],
    },
  });

  const experiences = useMemo(() => {
    return form.watch("candidate.experiences");
  }, [form.watch("candidate.experiences")]);

  const educations = useMemo(() => {
    return form.watch("candidate.educations");
  }, [form.watch("candidate.educations")]);

  const socialLinks = useMemo(() => {
    return form.watch("candidate.social_links");
  }, [form.watch("candidate.social_links")]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    setIsSubmitting(true);
    const { candidate, application, attachments } = data;

    const candidateMatch = await calculateCandidateMatch(
      job,
      {
        ...candidate,
        id: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        ...application,
        id: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        candidate_id: "",
        stage_id: "",
      },
    );

    toast.promise(
      async () => {
        const result = await applyForJob({
          candidate,
          application: {
            ...data.application,
            candidate_match: candidateMatch,
          },
          attachments,
        });


        if (result?.serverError) {
          throw new Error(result.serverError);
        }
      },
      {
        loading: "Submitting application...",
        success: "Application submitted successfully",
        error: (error) => error.message,
        finally: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="flex flex-col gap-4">
            <UploadResume form={form} />

            {/* Personal Information */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="candidate.first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="candidate.last_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="candidate.email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="candidate.phone_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultCountry={
                          (countriesMap.get(form.watch("candidate.country"))
                            ?.cca2 as Country) ?? undefined
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="candidate.country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountrySelector
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="candidate.city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City, State</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="candidate.timezone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <TimezoneSelector
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="candidate.gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <GenderSelector
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="candidate.date_of_birth"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <DatePickerWithSelect
                        date={
                          field.value
                            ? moment(field.value).toDate()
                            : moment().subtract(16, "years").toDate()
                        }
                        setDate={(date) => field.onChange(date?.toISOString())}
                        toDate={moment().subtract(16, "years").toDate()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Education */}
            <Label className="text-lg font-bold">
              Educations & Certifications
            </Label>
            <UploadTranscript form={form} />

            {educations.map((edu, index) => (
              <div key={index.toString()} className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <FormField
                    control={form.control}
                    name={`candidate.educations.${index}.school`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>School</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="University of California, Los Angeles"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`candidate.educations.${index}.degree`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor of Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 w-full mt-4">
                  <FormField
                    control={form.control}
                    name={`candidate.educations.${index}.graduation_date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Graduation Date</FormLabel>
                        <FormControl>
                          <DatePickerWithSelect
                            date={
                              field.value
                                ? moment(field.value).toDate()
                                : undefined
                            }
                            setDate={(date) =>
                              field.onChange(date?.toISOString() ?? "")
                            }
                            toDate={moment().toDate()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`candidate.educations.${index}.gpa`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>GPA</FormLabel>
                        <FormControl>
                          <Input placeholder="3.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    disabled={isSubmitting}
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      form.setValue(
                        "candidate.educations",
                        form
                          .getValues("candidate.educations")
                          .filter((_, i) => i !== index),
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>

                <Separator />
              </div>
            ))}

            <Button
              disabled={isSubmitting}
              type="button"
              variant="outline"
              onClick={() => {
                const currentEducations =
                  form.getValues("candidate.educations") || [];
                form.setValue("candidate.educations", [
                  ...currentEducations,
                  {
                    school: "",
                    degree: "",
                    graduation_date: "",
                    gpa: "",
                  },
                ]);
              }}
            >
              Add Education or Certification
            </Button>

            {/* Experience */}
            <Label className="text-lg font-bold">Experience</Label>

            {experiences.map((exp, index) => (
              <div key={index.toString()} className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <FormField
                    control={form.control}
                    name={`candidate.experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`candidate.experiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <FormField
                    control={form.control}
                    name={`candidate.experiences.${index}.start_date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <DatePickerWithSelect
                            date={
                              field.value
                                ? moment(field.value).toDate()
                                : undefined
                            }
                            setDate={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            toDate={moment().toDate()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`candidate.experiences.${index}.end_date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          End Date
                          <span className="text-sm text-muted-foreground ml-2">
                            if Present, leave blank
                          </span>
                        </FormLabel>
                        <FormControl>
                          <DatePickerWithSelect
                            date={
                              field.value
                                ? moment(field.value).toDate()
                                : undefined
                            }
                            setDate={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            toDate={moment().toDate()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`candidate.experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Key Responsibilities & Achievements</FormLabel>
                      <FormControl>
                        <AutoResizeTextArea
                          placeholder="I was responsible for..."
                          defaultRows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`candidate.experiences.${index}.skills`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Skills & Technologies
                        <span className="text-muted-foreground text-sm ml-2">
                          (Optional) Separated by enter key
                        </span>
                      </FormLabel>
                      <FormControl>
                        <TagsInput
                          onChange={(value) => {
                            // @ts-ignore
                            field.onChange(value.map((tag) => tag.text));
                          }}
                          tags={field.value.map((skill) => ({
                            id: skill,
                            text: skill,
                          }))}
                          placeholder="Add a skill"
                          containerClassName="w-full min-h-20 items-start justify-start"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    disabled={isSubmitting}
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      form.setValue(
                        "candidate.experiences",
                        form
                          .getValues("candidate.experiences")
                          .filter((_, i) => i !== index),
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>

                <Separator />
              </div>
            ))}

            <Button
              disabled={isSubmitting}
              type="button"
              variant="outline"
              onClick={() => {
                form.setValue("candidate.experiences", [
                  ...form.getValues("candidate.experiences"),
                  {
                    company: "",
                    position: "",
                    start_date: "",
                    end_date: null,
                    description: "",
                    skills: [],
                  },
                ]);
              }}
            >
              Add Experience
            </Button>

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-bold">Social Links</Label>
                <AddLink
                  isSubmitting={isSubmitting}
                  setLinks={(value) =>
                    form.setValue("candidate.social_links", {
                      ...form.getValues("candidate.social_links"),
                      ...value,
                    })
                  }
                />
              </div>
              {Object.keys(socialLinks).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`candidate.social_links.${key}`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="capitalize">{key}</FormLabel>
                      <div className="flex items-center gap-2 w-full">
                        <FormControl>
                          <UrlInput
                            placeholder={`www.${key}.com/john-doe`}
                            {...field}
                          />
                        </FormControl>
                        {key !== "linkedin" && (
                          <Button
                            disabled={isSubmitting}
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const currentLinks = form.getValues(
                                "candidate.social_links",
                              );
                              const updatedLinks = { ...currentLinks };
                              delete updatedLinks[key];
                              form.setValue(
                                "candidate.social_links",
                                updatedLinks,
                              );
                            }}
                          >
                            <X />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Screening Questions */}
            <div className="space-y-4">
              {job.screening_questions &&
                job.screening_questions?.length > 0 && (
                  <Label className="text-lg font-bold">
                    Screening Questions
                  </Label>
                )}
              {job.screening_questions?.map((question, index) => (
                <FormField
                  key={question}
                  control={form.control}
                  name={`application.screening_question_answers.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{question}</FormLabel>
                      <FormControl>
                        <AutoResizeTextArea
                          defaultRows={3}
                          placeholder={question}
                          value={field.value.answer}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              answer: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <Label className="text-base">
                Attachments
                <span className="text-sm text-muted-foreground ml-2">
                  (Optional) Upload additional documents (cover letter, letter
                  of recommendation, etc.)
                </span>
              </Label>

              <ExtraFiles form={form} />
            </div>

            <Button type="submit" className="mt-4" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loading03Icon className="size-4 animate-spin" />
              ) : (
                <IoIosSend className="size-4" />
              )}
              Submit Application
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
}

const linkOptions = [
  { label: "GitHub", value: "github" },
  { label: "Portfolio", value: "portfolio" },
  { label: "X (Twitter)", value: "x (twitter)" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Other", value: "other" },
];

function AddLink({
  setLinks,
  isSubmitting,
}: {
  setLinks: (value: { [key: string]: string }) => void;
  isSubmitting: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" type="button" disabled={isSubmitting}>
          Add Link
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {linkOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              setLinks({
                [option.value]: "",
              })
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
