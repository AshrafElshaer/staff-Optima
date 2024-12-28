import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";

type OrganizationUpdateEmailTemplatePageProps = {
  params: Promise<{
    templateId: string;
  }>;
};

export default async function OrganizationUpdateEmailTemplatePage({
  params,
}: OrganizationUpdateEmailTemplatePageProps) {
  const {templateId} = await params;
  return (
    <div className="flex flex-col gap-6 flex-1">
      <PageTitle
        title="Edit your email template to streamline communication for your candidates and hiring team."
        className="!w-full"
      />
      <BackButton className="w-fit" href="/organization/email-templates" />

      {templateId}
    </div>
  );
}
