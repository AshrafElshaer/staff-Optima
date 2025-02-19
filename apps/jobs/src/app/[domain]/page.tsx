import { createServerClient } from "@/lib/supabase/server";

import { OpenPositions } from "@/components/profile/open-positions";
import { filterSearchParamsCache } from "@/lib/filters.search-params";
import { countriesMap } from "@optima/location";
import { getOrganizationByDomain } from "@optima/supabase/queries";
import { Avatar } from "@optima/ui/avatar";
import { EditorContent, EditorProvider } from "@tiptap/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { Editor } from "./editor";

export default async function OrganizationPage({
  params,
  searchParams,
}: {
  params: Promise<{ domain: string }>;
  searchParams: Promise<SearchParams>;
}) {
  await filterSearchParamsCache.parse(searchParams);
  const { domain } = await params;
  const supabase = await createServerClient();
  const { data: organization, error } = await getOrganizationByDomain(
    supabase,
    domain,
  );
  if (!organization) {
    notFound();
  }

  const profileContent = organization.profile ?? "";

  const country = countriesMap.get(organization.country);

  return (
    <main className="flex flex-col  gap-4">
      <section className="p-4 max-w-3xl flex items-start justify-between gap-4 w-full mx-auto">
        <div className="flex flex-col gap-1">
          <h2 className=" text-secondary-foreground">Industry</h2>
          <p className="">{organization.industry}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className=" text-secondary-foreground">Location</h2>
          <p className="">
            {organization.address_1 ? `${organization.address_1}, ` : null}
            {organization.address_2 ? `${organization.address_2}, ` : null}
            {organization.address_1 || organization.address_2 ? <br /> : null}
            {organization.city ? `${organization.city}, ` : null}
            {organization.state ? `${organization.state}, ` : null}
            {organization.zip_code ? `${organization.zip_code}, ` : null}
            {organization.city ||
            organization.state ||
            organization.zip_code ? (
              <br />
            ) : null}
            {country?.flag} {country?.name}
          </p>
        </div>
      </section>
      <section className="p-4 max-w-3xl mx-auto">
        <Editor content={profileContent} />
      </section>

      <OpenPositions organizationId={organization.id} />
    </main>
  );
}
