"use client";

import { Separator } from "@optima/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
} from "@optima/ui/sidebar";

import {
  CreditCardIcon,
  DashboardSquare03Icon,
  MailAdd02Icon,
  Profile02Icon,
  SlidersHorizontalIcon,
  UserMultipleIcon,
  WorkflowSquare10Icon,
} from "hugeicons-react";

import { useRouter } from "next/navigation";
import type * as React from "react";

import { HiArrowUturnLeft } from "react-icons/hi2";
import { NavMain } from "../app-sidebar/nav-main";
import { Building2 } from "lucide-react";

const general = [
  {
    title: "Public Profile",
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
    title: "Integrations",
    url: "/organization/integrations",
    icon: <SlidersHorizontalIcon strokeWidth={2} size={20} />,
  },
  {
    title: "Billing & Usage",
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
  // {
  //   title: "Chat Channels",
  //   url: "/organization/chat-channels",
  //   icon: <FaHashtag strokeWidth={1} className="size-[20px]" />,
  // },
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
        <SidebarMenuItem className="flex items-center gap-2 p-2">
          <button type="button" onClick={() => router.push("/")}>
            <HiArrowUturnLeft strokeWidth={2} size={14} />
            <span className="sr-only">Back</span>
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
    </Sidebar>
  );
}
