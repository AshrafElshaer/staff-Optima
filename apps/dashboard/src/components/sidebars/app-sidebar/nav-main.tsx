"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { buttonVariants } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@optima/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@optima/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
  label,
  
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
    isError?: boolean;
  }[];
  label: string;
}) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url ||
            (pathname.includes("/organization")
              ? item.url === pathname.split("/").slice(0, 3).join("/")
              : item.url === pathname.split("/").slice(0, 2).join("/"));
          return (
            <SidebarMenuButton
              asChild
              key={item.title}
              onClick={() => setOpenMobile(false)}
              tooltip={item.title}
            >
              <Link
                href={item.url}
                className={buttonVariants({
                  variant: isActive ? "secondary" : "ghost",
                  className: cn(
                    "!justify-start gap-2   relative font-semibold",
                  ),
                })}
              >
                {item.icon}
                {item.title}
                {item.isError && (
                  <div className="ml-auto bg-destructive size-2  rounded-full"/>
                    

                )}
                {isActive && (
                  <div
                    className={cn(
                      "absolute  bg-primary right-0 bottom-1 top-1 rounded-l-full",
                      state === "collapsed" ? "w-0.5" : "w-1",
                    )}
                  />
                )}
              </Link>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
