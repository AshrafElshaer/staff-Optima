"use client";

import { createBrowserClient } from "@/lib/supabase/browser";
import { getOrganizationByDomain } from "@optima/supabase/queries";
import { Avatar } from "@optima/ui/avatar";
import { Button } from "@optima/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const domain = pathname.split("/")[1];
  const supabase = createBrowserClient();
  const { data: organization, error } = useQuery({
    queryKey: ["organization", domain],
    queryFn: async () => {
      const { data, error } = await getOrganizationByDomain(
        supabase,
        domain ?? "",
      );
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return (
    <div className="flex flex-col min-h-[calc(100svh-53px)]">
      <header className="flex items-center justify-center w-full  sticky top-0 bg-secondary z-10 p-4">
        {pathname !== `/${domain}` ? (
          <Button
            onClick={() => router.back()}
            variant="link"
            className="absolute left-4"
            size="icon"
          >
            <ChevronLeft className="size-6" />
          </Button>
        ) : null}
        <Link
          href={`https://${organization?.domain}`}
          target="_blank"
          className="flex items-center gap-4"
        >
          <Avatar
            src={organization?.logo_url}
            initials={organization?.name.slice(0, 2)}
            shape="square"
            size="large"
          />

          <h1 className="text-3xl font-bold">{organization?.name}</h1>
        </Link>
      </header>
      {children}
    </div>
  );
}
