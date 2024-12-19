import { PageTitle } from "@/components/page-title";
import { SearchInput } from "@/components/search-input";
import { InviteMember } from "@/features/organization/members/invite-member";
import { MembersTable } from "@/features/organization/members/table";
import { columns } from "@/features/organization/members/table/columns";
import { createServerClient } from "@/lib/supabase/server";
import { getTeamMembers } from "@optima/supabase/queries";
import { Button } from "@optima/ui/button";
import { headers } from "next/headers";
import { createSearchParamsCache } from "nuqs/server";
import { parseAsString } from "nuqs/server";

const teamCache = createSearchParamsCache({
  name: parseAsString.withDefault(""),
});

type TeamSearchParams = Promise<{
  name: string;
}>;

type TeamPageProps = {
  searchParams: TeamSearchParams;
};

export default async function OrganizationTeamPage({
  searchParams,
}: TeamPageProps) {
  const headersList = await headers();
  const supabase = await createServerClient();
  const organizationId = headersList.get("x-organization-id");
  const { name } = teamCache.parse(await searchParams);
  const { data: teamMembers } = await getTeamMembers(
    supabase,
    organizationId ?? "",
    {
      name,
    },
  );

  return (
    <main className="flex flex-col gap-6 min-h-full">
      <PageTitle title="Invite and manage members of your organization's team." />
      <section className="flex justify-between gap-2 w-full">
        <div className="w-full max-w-60">
          <SearchInput query="name" placeholder="Search team members" />
        </div>
        <InviteMember />
      </section>
      <MembersTable data={teamMembers ?? []} columns={columns} />
    </main>
  );
}
