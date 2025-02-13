"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Headset,
  LogOut,
  MonitorCog,
  Moon,
  MoreHorizontal,
  Sparkles,
  Sun,
  SunMoon,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSupabase } from "@/hooks/use-supabase";
import { Avatar } from "@optima/ui/avatar";
import { cn } from "@optima/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@optima/ui/sidebar";
import { Skeleton } from "@optima/ui/skeleton";
import {
  ChartBubble01Icon,
  CommentAdd01Icon,
  Door01Icon,
  IslandIcon,
  Settings01Icon,
} from "hugeicons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile, toggleSidebar, state } = useSidebar();
  const { data: user, isLoading } = useCurrentUser();
  const { theme, setTheme } = useTheme();
  const supabase = useSupabase();
  const router = useRouter();

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-2",
          state === "collapsed" && "justify-center !p-0",
        )}
      >
        <Skeleton className="size-6 rounded-sm" />
        {state === "expanded" && <Skeleton className="w-full h-6 rounded-sm" />}
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
              className={cn(
                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground items-center",
                state === "collapsed" && "justify-center",
                isMobile && state === "collapsed" && "justify-start ",
              )}
            >
              <Avatar
                className="size-6 "
                shape="square"
                initials={`${user?.first_name[0]}${user?.last_name[0]}`}
                src={user?.avatar_url}
              />

              {(state === "expanded" ||
                (isMobile && state === "collapsed")) && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold">
                      {user?.first_name} {user?.last_name}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(" rounded-md w-[12rem]")}
            side="top"
            align={state === "expanded" ? "center" : "start"}
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="pl-3">
                  <SunMoon strokeWidth={2} />
                  Theme
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent sideOffset={10}>
                  <DropdownMenuItem onSelect={() => setTheme("light")}>
                    <Sun />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setTheme("dark")}>
                    <Moon />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setTheme("system")}>
                    <MonitorCog />
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem
                asChild
                onSelect={() => {
                  if (isMobile) {
                    toggleSidebar();
                  }
                }}
              >
                <Link href="/account-settings">
                  <Settings01Icon strokeWidth={2} />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Headset strokeWidth={2} />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CommentAdd01Icon strokeWidth={2} />
                Feedback
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asDialogTrigger
              onSelect={async () => {
                await supabase.auth.signOut();
                router.push("/auth");
              }}
            >
              <Door01Icon strokeWidth={2} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
