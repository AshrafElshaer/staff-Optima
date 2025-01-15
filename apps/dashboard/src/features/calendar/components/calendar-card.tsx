import { JobLinkIcon, LinkSquare02Icon, TimeQuarterPassIcon } from "hugeicons-react";

import { Card } from "@optima/ui/card";
import Link from "next/link";
import { Icons } from "@optima/ui/icons";

type CalendarCardProps = {
  title: string;
  date: Date;
  location: string;
  status: string;
  candidate: string;
  job: string;
  time: string;
  link: string;
};

export function CalendarCard({
  date,
  job,
  link,
  location,
  time,
  title,
}: CalendarCardProps) {
  const Icon = location === "Google Meet" ? Icons.GoogleMeet : location === "Zoom" ? Icons.Zoom : Icons.Building;
  return (
    <Card className=" p-4 w-80 space-y-2 bg-accent" key={title}>
      <p className="font-semibold truncate">{title}</p>
      <p className=" flex items-center gap-2 text-secondary-foreground">
      <JobLinkIcon strokeWidth={2} size={16} />
      <span className="text-sm ">{job}</span>
    </p>
    <p className="text-sm text-secondary-foreground flex items-center gap-2">
      <TimeQuarterPassIcon strokeWidth={2} size={16} />
      <span>{time} (UTC)</span>
    </p>
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition-colors"
    >
      <Icon  />
      <span className="text-sm mr-auto">{location}</span>
      <LinkSquare02Icon strokeWidth={2} size={18} />
    </Link>
  </Card>
  )
}
