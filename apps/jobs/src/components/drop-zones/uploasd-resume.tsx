"use client";
import {
  applicationInsertSchema,
  candidateInsertSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { AiBeautifyIcon, Loading03Icon, Pdf02Icon } from "hugeicons-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { extractResumeData } from "@/lib/ai/parse-resume";
import { parseDateFromString } from "@/lib/date/parse-date-from-string";

import { countriesMap } from "@optima/location";
import { Alert, AlertDescription, AlertTitle } from "@optima/ui/alert";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { z } from "zod";
import { zfd } from "zod-form-data";

import { attachmentTypeEnum } from "@optima/supabase/types";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

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

export function UploadResume({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: extractResume, isPending } = useMutation({
    mutationFn: extractResumeData,
    onSuccess: (data) => {
      setIsSuccess(true);
      form.setValue(
        "candidate.first_name",
        data.first_name !== "null" ? data.first_name ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.last_name",
        data.last_name !== "null" ? data.last_name ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.email",
        data.email !== "null" ? data.email ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.phone_number",
        data.phone_number !== "null" ? data.phone_number ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.city",
        data.city !== "null" ? data.city ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.country",
        data.country !== "null" && data.country
          ? countriesMap.get(data.country)?.name ?? ""
          : "",
        {
          shouldValidate: true,
        },
      );

      form.setValue(
        "candidate.educations",
        data.educations?.length
          ? data.educations.map((education) => ({
              school: education.school !== "null" ? education.school ?? "" : "",
              degree: education.degree !== "null" ? education.degree ?? "" : "",
              graduation_date: education.graduation_date
                ? parseDateFromString(
                    education.graduation_date,
                  )?.toISOString() ?? ""
                : "",
              gpa: education.gpa !== "null" ? education.gpa ?? "" : "",
            }))
          : [
              {
                school: "",
                degree: "",
                graduation_date: "",
                gpa: "",
              },
            ],
        {
          shouldValidate: true,
        },
      );

      form.setValue(
        "candidate.experiences",
        data.experiences?.length
          ? data.experiences.map((experience) => ({
              company:
                experience.company !== "null" ? experience.company ?? "" : "",
              position:
                experience.position !== "null" ? experience.position ?? "" : "",
              description:
                experience.description !== "null"
                  ? experience.description ?? ""
                  : "",
              start_date: experience.start_date
                ? parseDateFromString(experience.start_date)?.toISOString() ??
                  ""
                : "",
              end_date: experience.end_date
                ? parseDateFromString(experience.end_date)?.toISOString() ?? ""
                : "",
              skills: experience.skills ?? [],
            }))
          : [
              {
                company: "",
                position: "",
                description: "",
                start_date: "",
                end_date: "",
                skills: [],
              },
            ],
        {
          shouldValidate: true,
        },
      );

      form.setValue(
        "candidate.social_links",
        {
          linkedin: (data.social_links?.linkedin === "null"
            ? ""
            : data.social_links?.linkedin ?? ""
          ).replace(/^https?:\/\//, ""),
          ...Object.fromEntries(
            Object.entries(data.social_links ?? {})
              .filter(([key]) => key !== "linkedin")
              .filter(([_, value]) => value !== "null")
              .map(([key, value]) => [
                key,
                String(value).replace(/^https?:\/\//, ""),
              ]),
          ),
        },
        {
          shouldValidate: true,
        },
      );

      form.setValue(
        "candidate.timezone",
        data.timezone !== "null" ? data.timezone ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.gender",
        data.gender !== "null" ? data.gender ?? "" : "",
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "candidate.date_of_birth",
        data.date_of_birth
          ? parseDateFromString(data.date_of_birth)?.toISOString() ?? ""
          : "",
        {
          shouldValidate: true,
        },
      );
    },
  });
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    disabled: isPending,
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/pdf": [".pdf"],
    },

    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    async onDropAccepted(acceptedFiles) {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0] as File;
      form.setValue("attachments", [
        ...form.getValues("attachments"),
        { fileType: "resume", file },
      ]);
      extractResume(file);
    },
    onDropRejected(fileRejections, event) {
      toast.error(fileRejections[0]?.errors[0]?.message ?? "Invalid file type");
    },
  });

  return (
    <div
      {...getRootProps()}
      className="relative flex items-center gap-2 p-4 border rounded-md"
    >
      <input {...getInputProps()} />
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-2 w-full">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Loading03Icon className="size-5 animate-spin" />
                <span>Extracting the information ...</span>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <AiBeautifyIcon className="size-5" />
                <span>Autofill from resume</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={open}
            disabled={isPending}
            type="button"
            className="ml-auto"
          >
            Upload
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Please upload your resume to autofill your application.
          <br />
          Only PDF files are supported.
        </p>
        {isSuccess && (
          <Alert variant="warning">
            <AlertTitle>
              The information has been extracted from the resume.
            </AlertTitle>
            <AlertDescription>
              Please verify the information before submitting the application.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-primary/70"
          >
            <div className="text-center">
              <Pdf02Icon className="size-8 mx-auto mb-2" />
              <p className="text-lg font-medium">Drop your resume here</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
