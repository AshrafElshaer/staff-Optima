"use client";

import { Button } from "@optima/ui/button";
import { Icons } from "@optima/ui/icons";
import { Separator } from "@optima/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
} from "@optima/ui/sidebar";
import {
  Calendar03Icon,
  Chatting01Icon,
  CreditCardIcon,
  DashboardSquare03Icon,
  Home01Icon,
  JobLinkIcon,
  MailAdd02Icon,
  Profile02Icon,
  UserMultipleIcon,
  UserSearch01Icon,
  WorkflowSquare10Icon,
} from "hugeicons-react";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { FaHashtag } from "react-icons/fa";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { NavMain } from "../app-sidebar/nav-main";
import { NavUser } from "../app-sidebar/nav-user";
import { OrganizationLogo } from "../app-sidebar/organization-logo";

const general = [
  {
    title: "Profile",
    url: "/organization",
    icon: <Profile02Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Departments",
    url: "/organization/departments",
    icon: <DashboardSquare03Icon strokeWidth={2} size={20} />,
  },
  {
    title: "Team",
    url: "/organization/team",
    icon: <UserMultipleIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Biiling & Usage",
    url: "/organization/billing",
    icon: <CreditCardIcon strokeWidth={2} size={20} />,
  },
];
const applications = [
  {
    title: "Pipeline",
    url: "/organization/pipeline",
    icon: <WorkflowSquare10Icon strokeWidth={2} size={20} />,
  },
];

const communication = [
  {
    title: "Chat Channels",
    url: "/organization/chat-channels",
    icon: <FaHashtag strokeWidth={2} className="size-[20px]" />,
  },
  {
    title: "Email Templates",
    url: "/organization/email-templates",
    icon: <MailAdd02Icon strokeWidth={2} className="size-[20px]" />,
  },
];
export function OrganizationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuItem className="flex items-center gap-4 p-2">
          <button type="button" onClick={() => router.back()}>
            <HiArrowUturnLeft strokeWidth={2} size={14} />
          </button>
          <span className="text-compact-large font-bold">Settings</span>
        </SidebarMenuItem>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={general} label="General" />
        <NavMain items={applications} label="Applications" />
        <NavMain items={communication} label="Communication" />
      </SidebarContent>
      <Separator />

      <SidebarRail />
    </Sidebar>
  );
}
