"use client";

import { PageTitle } from "@/components/page-title";
import { JobPostForm } from "@/features/job-posts/components/job-post-form";

export default function NewJobPostPage() {
  return (
    <div className="flex flex-col flex-1 gap-8">
      <PageTitle
        title="Create and customize job postings to attract the right candidates for your organization"
        // className="w-full"
      />
      <JobPostForm />
    </div>
  );
}
