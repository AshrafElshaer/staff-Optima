"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building2,
  Command,
  Frame,
  GalleryVerticalEnd,
  //   Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type * as React from "react";

import { Icons } from "@optima/ui/icons";
import { Separator } from "@optima/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@optima/ui/sidebar";
import {
  Calendar03Icon,
  Chatting01Icon,
  Home01Icon,
  JobLinkIcon,
  UserSearch01Icon,
} from "hugeicons-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationLogo } from "./organization-logo";

// This is sample data.
const data = {
  user: {
    name: "Adam Ericson",
    email: "adam@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};
const links = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Home01Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: <Calendar03Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Job Listings",
    url: "/job-listings",
    icon: <JobLinkIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Candidates",
    url: "/candidates",
    icon: <UserSearch01Icon strokeWidth={2} size={20} />,
  },
];
const communication = [
  {
    title: "Chat",
    url: "/chat",
    icon: <Chatting01Icon strokeWidth={2} size={20} />,
  },
];

const settings = [
  {
    title: "Organization",
    url: "/organization",
    icon: <Icons.Building strokeWidth={2} className="size-[20px]" />,
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationLogo teams={data.teams} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={links} label="Workspace" />
        <NavMain items={communication} label="Team" />
        <NavMain items={settings} label="Settings" />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
