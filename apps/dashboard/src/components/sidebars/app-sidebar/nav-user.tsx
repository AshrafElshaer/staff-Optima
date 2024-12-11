"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Headset,
  LogOut,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar } from "@optima/ui/avatar";
import { cn } from "@optima/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@optima/ui/sidebar";
import {
  ChartBubble01Icon,
  CommentAdd01Icon,
  Door01Icon,
  IslandIcon,
  Settings01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { Skeleton } from "@optima/ui/skeleton";

export function NavUser() {
  const { isMobile, toggleSidebar } = useSidebar();
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="size-6 rounded-sm" />
        <Skeleton className="w-full h-6 rounded-sm" />
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="default"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground items-center"
            >
              <Avatar
                className="size-6 "
                shape="square"
                initials={`${user?.first_name[0]}${user?.last_name[0]}`}
                src={user?.avatar_url}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <MoreHorizontal className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(" rounded-md w-[12rem]")}
            side="top"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar
                  className="size-8"
                  shape="square"
                  initials={`${user?.first_name[0]}${user?.last_name[0]}`}
                  src={user?.avatar_url}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {" "}
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ThemeToggle />
              <DropdownMenuItem
                asChild
                onSelect={() => {
                  if (isMobile) {
                    toggleSidebar();
                  }
                }}
              >
                <Link href="/account-settings">
                  <Settings01Icon />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Headset />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CommentAdd01Icon />
                Feedback
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Door01Icon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
