import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationById } from "@optima/supabase/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrganizationProfileForm } from "@/features/organization/components/profile-form";

export default async function OrganizationProfilePage() {
  const supabase = await createServerClient();
  const headerList = await headers();
  const organizationId = headerList.get("x-organization-id");
  if (!organizationId) {
    redirect("/");
    return;
  }
  const { data: organization } = await getOrganizationById(
    supabase,
    organizationId,
  );
  return (
    <main className="flex flex-col gap-8">
      <PageTitle
        title="Customize your organization's public profile settings, including logo,
        legal name, domain, industry, and description."
      />
      <OrganizationProfileForm organization={organization } />
    </main>
  );
}
