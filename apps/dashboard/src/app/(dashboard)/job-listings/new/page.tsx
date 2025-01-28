import { BackButton } from "@/components/back-button";
import { PageTitle } from "@/components/page-title";
import { JobListForm } from "@/features/job-listings/components/job-list-form";
import { Button } from "@optima/ui/button";
import { CheckmarkBadge03Icon, Megaphone01Icon } from "hugeicons-react";

export default function NewJobListingPage() {
  return (
    <div className="flex flex-col flex-1 gap-8">
      <PageTitle
        title="Create and customize job postings to attract the right candidates for your organization"
        // className="w-full"
      />
      <JobListForm />
    </div>
  );
}
