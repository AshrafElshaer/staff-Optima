"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { getOrganizationById } from "@optima/supabase/queries";
import { Avatar } from "@optima/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@optima/ui/sidebar";
import { Skeleton } from "@optima/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export function OrganizationLogo() {
  const supabase = useSupabase();
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
      <div className="flex items-center gap-2 p-2">
        <Skeleton className="size-6 rounded-sm" />
        <Skeleton className="w-full h-6 rounded-sm" />
      </div>
    );
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 p-2">
        <Avatar
          className="size-6"
          shape="square"
          src={organization?.logo_url}
          initials={`${organization?.name[0]}${organization?.name[1]}`}
        />
        <span className="text-compact-large font-bold">
          {organization?.name}
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
