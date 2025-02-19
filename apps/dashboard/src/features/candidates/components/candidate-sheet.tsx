"use client";
import { countriesMap } from "@optima/location";
import type { CandidateWithApplication } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import { cn } from "@optima/ui/cn";
import { Separator } from "@optima/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@optima/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@optima/ui/tabs";
import { Call02Icon, Location09Icon, Mail02Icon } from "hugeicons-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import {
  BiSolidCircleHalf,
  BiSolidCircleQuarter,
  BiSolidCircleThreeQuarter,
} from "react-icons/bi";
import { CandidateCard } from "./candidate-card";
import { EducationsCard } from "./educations-card";
import { ExperiencesCard } from "./experiences-card";

export function CandidateSheet({
  candidate,
}: { candidate: CandidateWithApplication }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <CandidateCard candidate={candidate} setOpen={setOpen} />
      </SheetTrigger>
      <SheetContent className="max-w-2xl w-full ">
        <SheetHeader>
          <SheetTitle>Candidate Profile</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-scroll flex flex-col gap-4">
          <section className="p-4 space-y-8">
            <div className="flex items-center gap-4 ">
              <Avatar
                src={candidate.avatar_url}
                initials={
                  (candidate.first_name?.[0] ?? "") +
                  (candidate.last_name?.[0] ?? "")
                }
                size="medium"
              />

              <h3 className=" font-semibold">
                {candidate.first_name} {candidate.last_name}
              </h3>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href={`mailto:${candidate.email}`} className=" space-y-1">
                {/* <Mail02Icon className="size-5" strokeWidth={2} /> */}
                <p className="text-secondary-foreground">Email</p>
                <p>{candidate.email}</p>
              </Link>
              <Link
                href={`tel:${candidate.phone_number}`}
                className=" space-y-1"
              >
                <p className="text-secondary-foreground">Phone Number</p>
                <p>{candidate.phone_number}</p>
              </Link>
              <p className=" space-y-1">
                <p className="text-secondary-foreground">Location</p>
                <p className="flex items-center gap-2">
                  {countriesMap.get(candidate.country)?.flag}
                  {candidate.country} , {candidate.city}
                </p>
              </p>
            </div>
          </section>
          <section className="flex items-center justify-between flex-wrap gap-4 p-4">
            <div className="space-y-1">
              <p className="text-muted-foreground">Job Applied</p>
              <div className="flex items-center gap-2">
                <p>{candidate.applications?.[0]?.job_posts.title}</p>

                <div
                  className={cn(
                    "flex items-center gap-2 ml-auto ",
                    candidate.applications[0]?.candidate_match &&
                      (candidate.applications[0]?.candidate_match >= 75
                        ? "text-tag-success-text"
                        : candidate.applications[0]?.candidate_match >= 50
                          ? "text-tag-warning-text"
                          : "text-tag-red-text"),
                  )}
                >
                  {candidate.applications[0]?.candidate_match &&
                    (candidate.applications[0]?.candidate_match >= 75 ? (
                      <BiSolidCircleThreeQuarter className="border rounded-full border-current size-3" />
                    ) : candidate.applications[0]?.candidate_match >= 50 ? (
                      <BiSolidCircleHalf className="border rounded-full border-current size-3" />
                    ) : (
                      <BiSolidCircleQuarter className="border rounded-full border-current size-3" />
                    ))}
                  <span className="text-sm">
                    {candidate.applications[0]?.candidate_match}%
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Applied At</p>
              <p>
                {moment(candidate.applications?.[0]?.created_at).format(
                  "MMM DD YYYY",
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Origin</p>
              <p>{candidate.applications?.[0]?.source}</p>
            </div>
          </section>

          <Tabs defaultValue="application" className="flex-1 flex flex-col">
            <TabsList className="bg-transparent p-4 my-2 justify-start">
              <TabsTrigger
                value="application"
                className="py-2 data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
              >
                Application
              </TabsTrigger>
              <TabsTrigger
                value="attachment"
                className="py-2 data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
              >
                Attachment
              </TabsTrigger>
              <TabsTrigger
                value="interviews"
                className="py-2 data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
              >
                Interviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="application" className="flex-1 p-4 space-y-4">
              <EducationsCard candidate={candidate} />
              <ExperiencesCard candidate={candidate} />
            </TabsContent>
            <TabsContent value="attachment">
              <p className="p-4 text-center text-xs text-muted-foreground">
                Content for Tab 2
              </p>
            </TabsContent>
            <TabsContent value="interviews">
              <p className="p-4 text-center text-xs text-muted-foreground">
                Content for Tab 3
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
