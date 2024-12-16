import AdvancedEditor from "@/components/editors/advanced";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationByDomain } from "@optima/supabase/queries";
import { Avatar } from "@optima/ui/avatar";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const supabase = await createServerClient();
  const { data: organization, error } = await getOrganizationByDomain(
    supabase,
    domain,
  );
  if (!organization) {
    notFound();
  }

  const profileContent = organization.profile
    ? JSON.parse(organization.profile as string)
    : {};

  return (
    <main className="flex flex-col gap-4">
      <header className="flex justify-center  sticky top-0 bg-secondary z-10 p-4">
        <Link
          href={`https://${organization.domain}`}
          target="_blank"
          className="flex items-center gap-4"
        >
          <Avatar
            src={organization.logo_url}
            initials={organization.name.slice(0, 2)}
            shape="square"
            size="large"
          />

          <h1 className="text-3xl font-bold">{organization.name}</h1>
        </Link>
      </header>
      <section className="p-4 max-w-2xl mx-auto">
        <AdvancedEditor content={profileContent} editable={false} />
      </section>
    </main>
  );
}
