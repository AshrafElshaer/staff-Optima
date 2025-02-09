"use client";
import type { JobPost } from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { DatePicker } from "@optima/ui/date-picker"; // Fixed import path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import { Input } from "@optima/ui/inputs";
import { PhoneInput } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { CountrySelector, TimezoneSelector } from "@optima/ui/selectors";
import { Textarea } from "@optima/ui/textarea";
import { AiBeautifyIcon, SentIcon } from "hugeicons-react";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

type ApplicationFormProps = {
  job: JobPost;
};

export function ApplicationForm({ job }: ApplicationFormProps) {
  const [links, setLinks] = useState<{
    [key: string]: string;
  }>({
    linkedin: "",
  });
  const [education, setEducation] = useState<
    Record<
      string,
      {
        school: string;
        degree: string;
        graduationDate: string;
        gpa: string;
      }
    >
  >({
    "0": {
      school: "",
      degree: "",
      graduationDate: "",
      gpa: "",
    },
  });

  const [experience, setExperience] = useState<
    {
      company: string;
      title: string;
      startDate: string;
      endDate: string;
      description: string;
    }[]
  >([
    {
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex  items-center gap-2 p-4 border rounded-md">
        <AiBeautifyIcon className="size-5" />
        Autofill from resume
        <Button className="ml-auto">Upload</Button>
      </div>

      {/* Personal Information */}

      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="space-y-2 w-full">
          <Label>First Name</Label>
          <Input placeholder="John" />
        </div>
        <div className="space-y-2 w-full">
          <Label>Last Name</Label>
          <Input placeholder="Doe" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="space-y-2 w-full">
          <Label>Email</Label>
          <Input placeholder="john.doe@example.com" />
        </div>
        <div className="space-y-2 w-full">
          <Label>Country</Label>
          <CountrySelector value={""} setValue={() => {}} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="space-y-2 w-full">
          <Label>Timezone</Label>
          <TimezoneSelector value={""} onValueChange={() => {}} />
        </div>
        <div className="space-y-2 w-full">
          <Label>Phone Number</Label>
          <PhoneInput
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
      </div>

      {/* Education  */}
      <Label className="text-lg font-bold">Educations & Certifications</Label>
      <div className="flex  items-center gap-2 p-4 border rounded-md">
        <AiBeautifyIcon className="size-5" />
        Autofill from education transcript
        <Button className="ml-auto">Upload</Button>
      </div>

      {Object.entries(education).map(([index, edu]) => (
        <div key={index}>
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="space-y-2 w-full">
              <Label>School</Label>
              <Input
                placeholder="University of California, Los Angeles"
                value={edu.school}
                onChange={(e) => {
                  setEducation((prev) => {
                    const updated = { ...prev };
                    if (updated[index]) {
                      updated[index].school = e.target.value;
                    }
                    return updated;
                  });
                }}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label>Degree</Label>
              <Input
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => {
                  setEducation((prev) => {
                    const updated = { ...prev };
                    if (updated[index]) {
                      updated[index].degree = e.target.value;
                    }
                    return updated;
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 w-full mt-4">
            <div className="space-y-2 w-full">
              <Label>Graduation Date</Label>
              <DatePicker
                date={
                  edu.graduationDate ? new Date(edu.graduationDate) : undefined
                }
                setDate={(date) => {
                  setEducation((prev) => {
                    const updated = { ...prev };
                    if (updated[index]) {
                      updated[index].graduationDate =
                        date?.toISOString() ?? "";
                    }
                    return updated;
                  });
                }}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label>GPA</Label>
              <Input
                placeholder="3.5"
                value={edu.gpa}
                onChange={(e) => {
                  setEducation((prev) => {
                    const updated = { ...prev };
                    if (updated[index]) {
                      updated[index].gpa = e.target.value;
                    }
                    return updated;
                  });
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => {
          const newIndex = Object.keys(education).length.toString();
          setEducation((prev) => ({
            ...prev,
            [newIndex]: {
              school: "",
              degree: "",
              graduationDate: "",
              gpa: "",
            },
          }));
        }}
      >
        Add Education or Certification
      </Button>

      {/* <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="space-y-2 w-full">
          <Label>School</Label>
          <Input placeholder="University of California, Los Angeles" />
        </div>
        <div className="space-y-2 w-full">
          <Label>Degree</Label>
          <Input placeholder="Bachelor of Science" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="space-y-2 w-full">
          <Label>Graduation Date</Label>
          {/* <DateInput /> */}
      {/* <Input type="date" /> */}
      {/* </div> */}
      {/* <div className="space-y-2 w-full">
          <Label>GPA</Label>
          <Input placeholder="3.5" />
        </div> */}
      {/* </div> */}

      {/* Social Links */}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-bold">Social Links</Label>
          <AddLink setLinks={setLinks} />
        </div>
        {Object.keys(links).map((key) => (
          <div className="space-y-2 w-full" key={key}>
            <Label className="capitalize">{key}</Label>
            <Input
              placeholder={`https://www.${key}.com/john-doe`}
              value={links[key]}
              onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-bold">Screening Questions</Label>
        {job.screening_questions?.map((question) => (
          <div className="space-y-2" key={question}>
            <Label>{question}</Label>
            <Textarea rows={3} placeholder={question} />
          </div>
        ))}
      </div>
      <Button className="mt-4">
        <IoIosSend className="size-4" />
        Submit Application
      </Button>
    </section>
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
}: {
  setLinks: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Add Link</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {linkOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              setLinks((links) => ({ ...links, [option.value]: "" }))
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
