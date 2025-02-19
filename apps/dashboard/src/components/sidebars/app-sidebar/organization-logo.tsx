"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { getOrganizationById } from "@optima/supabase/queries";
import { Avatar } from "@optima/ui/avatar";
import { cn } from "@optima/ui/cn";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@optima/ui/sidebar";
import { Skeleton } from "@optima/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export function OrganizationLogo() {
  const supabase = useSupabase();
  const { state, isMobile } = useSidebar();
  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await getOrganizationById(
        supabase,
        user?.user_metadata.organization_id,
      );
      if (error) {
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-2",
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
      <SidebarMenuItem
        className={cn(
          "flex items-center gap-2 p-2",
          state === "collapsed" && "p-0 justify-center",
          isMobile && state === "collapsed" && "justify-start !p-2",
        )}
      >
        <Avatar
          className="size-6"
          shape="square"
          src={organization?.logo_url}
          initials={`${organization?.name[0]}${organization?.name[1]}`}
        />
        {(state === "expanded" || (isMobile && state === "collapsed")) && (
          <span className="text-compact-large font-bold">
            {organization?.name}
          </span>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
