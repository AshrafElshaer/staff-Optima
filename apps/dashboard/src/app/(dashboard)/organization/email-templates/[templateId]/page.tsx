import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";
import { UpdateEmailPlayground } from "@/features/organization/email-templates/components/update-email-playground";
import { createServerClient } from "@/lib/supabase/server";
import { getEmailTemplateById } from "@optima/supabase/queries";
import { notFound } from "next/navigation";

type OrganizationUpdateEmailTemplatePageProps = {
  params: Promise<{
    templateId: string;
  }>;
};

export default async function OrganizationUpdateEmailTemplatePage({
  params,
}: OrganizationUpdateEmailTemplatePageProps) {
  const { templateId } = await params;
  const supabase = await createServerClient();
  const { data: emailTemplate } = await getEmailTemplateById(
    supabase,
    templateId,
  );

  if (!emailTemplate) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6 flex-1">
      <PageTitle
        title="Edit your email template to streamline communication for your candidates and hiring team."
        className="!w-full"
      />
      <BackButton className="w-fit" href="/organization/email-templates" />

      <UpdateEmailPlayground emailTemplate={emailTemplate} />
    </div>
  );
}
