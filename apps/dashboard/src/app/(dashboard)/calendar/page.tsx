"use client";
import Calendar from "@/components/calendar/calendar";
import type { CalendarEvent, Mode } from "@/components/calendar/calendar-types";
import { ExpandableTabs } from "@/components/expandable-tabs";
import { PageTitle } from "@/components/page-title";
import { CalendarCard } from "@/features/calendar/components/calendar-card";
import { generateMockEvents } from "@/lib/mock-calendar-events";
import { Button } from "@optima/ui/button";
import { ScrollArea, ScrollBar } from "@optima/ui/scroll-area";
import {
  CalendarAdd01Icon,
  GridTableIcon,
  Layout2ColumnIcon,
  LeftToRightListDashIcon,
} from "hugeicons-react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  Settings,
  Shield,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";

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
    location: "Zoom",
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
const tabs = [
  { title: "Dashboard", icon: Home },
  { title: "Notifications", icon: Bell },
  { type: "separator" },
  { title: "Settings", icon: Settings },
  { title: "Support", icon: HelpCircle },
  { title: "Security", icon: Shield },
];
export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents());
  const [mode, setMode] = useState<Mode>("month");
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* <section className="flex justify-between items-center">
        <div>
          <PageTitle
            title={`${moment().format("MMMM DD, YYYY")}`}
            className="text-lg"
          />
          <p>You have 2 meetings and 1 event tody</p>
        </div>
        <Button>
          <CalendarAdd01Icon strokeWidth={2} size={18} />
          Create Event
        </Button>
      </section> */}
      {/* <PageTitle title="Today's Events" className="text-lg" />
      <ScrollArea className="w-full whitespace-nowrap ">
        <div className="flex w-max space-x-4 pb-4">
          {upcomingEvents.map((event) => (
            <CalendarCard key={event.title} {...event} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea> */}
      <PageTitle title="Calendar" className="text-lg" />
      <Calendar
        events={events}
        setEvents={setEvents}
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />
    </div>
  );
}
