import { PageTitle } from "@/components/page-title";
import { buttonVariants } from "@optima/ui/button";
import { MailAdd02Icon } from "hugeicons-react";
import Link from "next/link";
export default function OrganizationEmailTemplatesPage() {
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
    </div>
  );
}
