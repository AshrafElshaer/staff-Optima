import { ApplicationForm } from "@/components/application-form";
import { JobNavigation } from "@/components/job-navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostById } from "@optima/supabase/queries";

type ApplicationPageProps = {
  params: Promise<{
    domain: string;
    jobId: string;
  }>;
};

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { domain, jobId } = await params;
  const supabase = await createServerClient();
  const { data: job } = await getJobPostById(supabase, jobId);
  if (!job) {
    return <div>Job not found</div>;
  }
  return (
    <div className="flex flex-col flex-1 gap-4  w-full ">
      <JobNavigation />
      <ApplicationForm job={job} />
    </div>
  );
}
