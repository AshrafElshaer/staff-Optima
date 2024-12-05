"use client";

import { Icons } from "@optima/ui/icons";
import { SidebarMenu, SidebarMenuItem } from "@optima/ui/sidebar";

export function OrganizationLogo({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 p-2">
        <Icons.Logo className="size-5" />
        <span className="text-compact-large font-bold">Acme Corp</span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
