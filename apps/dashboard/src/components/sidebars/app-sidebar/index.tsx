"use client";

import type * as React from "react";

import { Icons } from "@optima/ui/icons";
import { Separator } from "@optima/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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

const links = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Home01Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Job Listings",
    url: "/job-listings",
    icon: <JobLinkIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: <Calendar03Icon strokeWidth={2} size={20} />,
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
        <OrganizationLogo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={links} label="Workspace" />
        {/* <NavMain items={communication} label="Team" /> */}
        <NavMain items={settings} label="Settings" />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
