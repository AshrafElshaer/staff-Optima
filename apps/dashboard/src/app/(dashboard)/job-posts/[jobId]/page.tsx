import { PageTitle } from "@/components/page-title";
import { JobPostForm } from "@/features/job-posts/components/job-post-form";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";
import type {
  Department,
  JobPost,
  JobPostCampaign,
} from "@optima/supabase/types";

type JobPostPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function JobPostPage({ params }: JobPostPageProps) {
  const { jobId } = await params;
  const supabase = await createServerClient();
  const { data: job, error } = await getJobPostById(supabase, jobId);

  return (
    <div className="flex flex-col flex-1 gap-8">
      <PageTitle
        title="Edit and customize job postings to attract the right candidates for your organization"
        // className="w-full"
      />
      <JobPostForm
        job={
          (job as unknown as JobPost & {
            department: Department;
            campaigns: JobPostCampaign[];
          }) ?? undefined
        }
      />
    </div>
  );
}
