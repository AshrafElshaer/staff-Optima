import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";
import { CreateEmailPlayground } from "@/features/organization/email-templates/components/create-email-playground";

export default function OrganizationNewEmailTemplatePage() {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
        <BackButton className="w-fit" />
        <PageTitle
          title="Create a new email template to streamline communication for your candidates and hiring team."
          className="!w-full"
        />
      </div>
      <CreateEmailPlayground />
    </div>
  );
}
