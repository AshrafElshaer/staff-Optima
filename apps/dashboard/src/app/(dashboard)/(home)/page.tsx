import { PageTitle } from "@/components/page-title";
import { ApplicationsCharts } from "@/features/analytics/components/applications-charts";
import { ApplicationsSources } from "@/features/analytics/components/applications-sources";
import { ApplicationsStagesChart } from "@/features/analytics/components/applications-stages";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import {
  Calendar03Icon,
  JobLinkIcon,
  LinkSquare02Icon,
  TimeQuarterPassIcon,
  UserCheck01Icon,
  UserSearch01Icon,
} from "hugeicons-react";
import Link from "next/link";

export const metadata = {
  title: "Home",
};

const upcomingEvents = [
  {
    title: "Interview with John Doe Interview with John Doe",
    date: new Date(),
    location: "Google Meet",
    status: "Pending",
    candidate: "John Doe",
    job: "Software Engineer",
    time: "10:00 AM - 11:00 AM",
    link: "/interviews/123",
  },
  {
    title: "Interview with Jane Smith",
    date: new Date(),
    location: "Zoom",
    status: "Confirmed",
    candidate: "Jane Smith",
    job: "Product Manager",
    time: "2:00 PM - 3:00 PM",
    link: "/interviews/124",
  },
  {
    title: "Interview with Mike Johnson",
    date: new Date(),
    location: "Microsoft Teams",
    status: "Pending",
    candidate: "Mike Johnson",
    job: "UX Designer",
    time: "11:30 AM - 12:30 PM",
    link: "/interviews/125",
  },
  {
    title: "Interview with Sarah Williams",
    date: new Date(),
    location: "Google Meet",
    status: "Confirmed",
    candidate: "Sarah Williams",
    job: "Frontend Developer",
    time: "4:00 PM - 5:00 PM",
    link: "/interviews/126",
  },
  {
    title: "Interview with David Brown",
    date: new Date(),
    location: "Zoom",
    status: "Pending",
    candidate: "David Brown",
    job: "DevOps Engineer",
    time: "1:00 PM - 2:00 PM",
    link: "/interviews/127",
  },
];

export default async function Page() {
  return (
    <div className=" flex flex-col gap-4">
      <section className="space-y-2">
        <PageTitle title="Welcome Back !" className="mb-2 text-lg" />
        <p className=" text-secondary-foreground">
          You have 2 meetings and 1 event tody
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center  p-4 gap-2 bg-accent">
          <JobLinkIcon strokeWidth={2} size={20} />
          <span className="font-semibold">Open Jobs</span>
          <span className="text-lg font-semibold font-mono ml-auto">10</span>
        </Card>
        <Card className="flex items-center  p-4 gap-2 bg-accent">
          <UserSearch01Icon strokeWidth={2} size={20} />
          <span className="font-semibold">Applications</span>
          <span className="text-lg font-semibold font-mono ml-auto">100</span>
        </Card>
        <Card className="flex items-center  p-4 gap-2 bg-accent">
          <UserCheck01Icon strokeWidth={2} size={20} />
          <span className="font-semibold">Hired Candidates</span>
          <span className="text-lg font-semibold font-mono ml-auto">5</span>
        </Card>
        <Card className="flex items-center  p-4 gap-2 bg-accent">
          <Calendar03Icon strokeWidth={2} size={20} />
          <span className="font-semibold">Interviews</span>
          <span className="text-sm text-secondary-foreground">This week</span>
          <span className="text-lg font-semibold font-mono ml-auto">5</span>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Today's Events</h3>
        <ScrollArea className="w-full whitespace-nowrap ">
          <div className="flex w-max space-x-4 pb-4">
            {upcomingEvents.map((event) => (
              <Card className=" p-4 w-80 space-y-2 bg-accent" key={event.title}>
                <p className="font-semibold truncate">{event.title}</p>
                <p className=" flex items-center gap-2 text-secondary-foreground">
                  <JobLinkIcon strokeWidth={2} size={16} />
                  <span className="text-sm ">{event.job}</span>
                </p>
                <p className="text-sm text-secondary-foreground flex items-center gap-2">
                  <TimeQuarterPassIcon strokeWidth={2} size={16} />
                  <span>{event.time} UTC</span>
                </p>
                <Link
                  href={event.link}
                  target="_blank"
                  className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition-colors"
                >
                  <LogosGoogleMeet width={18} height={18} />
                  <span className="text-sm mr-auto">{event.location}</span>
                  <LinkSquare02Icon strokeWidth={2} size={18} />
                </Link>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <ApplicationsCharts />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApplicationsSources />
        <ApplicationsStagesChart />
      </section>
    </div>
  );
}

import React from "react";
import type { SVGProps } from "react";

export function LogosGoogleMeet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={256}
      height={211}
      viewBox="0 0 256 211"
      {...props}
    >
      <path
        fill="#00832d"
        d="m144.822 105.322l24.957 28.527l33.562 21.445l5.838-49.792l-5.838-48.669l-34.205 18.839z"
      />
      <path
        fill="#0066da"
        d="M0 150.66v42.43c0 9.688 7.864 17.554 17.554 17.554h42.43l8.786-32.059l-8.786-27.925l-29.11-8.786z"
      />
      <path
        fill="#e94235"
        d="M59.984 0L0 59.984l30.876 8.765l29.108-8.765l8.626-27.545z"
      />
      <path fill="#2684fc" d="M.001 150.679h59.983V59.983H.001z" />
      <path
        fill="#00ac47"
        d="M241.659 25.398L203.34 56.834v98.46l38.477 31.558c5.76 4.512 14.186.4 14.186-6.922V32.18c0-7.403-8.627-11.495-14.345-6.781"
      />
      <path
        fill="#00ac47"
        d="M144.822 105.322v45.338H59.984v59.984h125.804c9.69 0 17.553-7.866 17.553-17.554v-37.796z"
      />
      <path
        fill="#ffba00"
        d="M185.788 0H59.984v59.984h84.838v45.338l58.52-48.49V17.555c0-9.69-7.864-17.554-17.554-17.554"
      />
    </svg>
  );
}
