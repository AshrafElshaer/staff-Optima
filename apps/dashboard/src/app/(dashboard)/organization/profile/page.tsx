import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationById } from "@optima/supabase/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrganizationProfilePage() {
  const supabase = await createServerClient();
  const headerList = await headers();
  const organizationId = headerList.get("x-organization-id");
  if (!organizationId) {
    redirect("/");
  }
  const { data: organization } = await getOrganizationById(
    supabase,
    organizationId,
  );
  return (
    <main className="flex flex-col gap-2">
      <PageTitle title="Customize your organization's public profile" />
      {/* <OrganizationProfileForm /> */}
      <p className="text-secondary-foreground md:w-1/2">
        Write a detailed profile showcasing your organization's mission, values,
        services, and achievements.
      </p>
      
    </main>
  );
}
