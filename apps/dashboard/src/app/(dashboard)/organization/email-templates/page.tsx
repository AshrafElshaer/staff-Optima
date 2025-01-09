import { PageTitle } from "@/components/page-title";
import { createServerClient } from "@/lib/supabase/server";
import { getEmailTemplates } from "@optima/supabase/queries";
import { buttonVariants } from "@optima/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import { MailAdd02Icon } from "hugeicons-react";
import moment from "moment";
import { headers } from "next/headers";
import Link from "next/link";

export default async function OrganizationEmailTemplatesPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");

  const emailTemplates = await getEmailTemplates(
    supabase,
    organizationId ?? "",
  );
  return (
    <div className="flex flex-col gap-6 flex-1">
      <PageTitle title="Create, edit, and manage email templates to streamline communication for your candidates and hiring team." />
      <div className="flex justify-end">
        <Link
          href="/organization/email-templates/new-template"
          className={buttonVariants({ variant: "secondary" })}
        >
          New template <MailAdd02Icon strokeWidth={2} size={16} />
        </Link>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emailTemplates.map((emailTemplate) => (
          <Link
            key={emailTemplate.id}
            href={`/organization/email-templates/${emailTemplate.id}`}
            className="p-4 space-y-2 rounded-md border bg-accent"
          >
            <h3 className=" font-semibold">{emailTemplate.title}</h3>
            <p className=" text-muted-foreground">
              Last updated {moment(emailTemplate.updated_at).fromNow()}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
