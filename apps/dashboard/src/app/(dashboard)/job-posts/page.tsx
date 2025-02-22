import { PageTitle } from "@/components/page-title";
import { JobPostCard } from "@/features/job-posts/components/job-card";
import { JobPostFilters } from "@/features/job-posts/components/job-post-filters";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostsWithApplicationsCount } from "@optima/supabase/queries";
import type {
  Department,
  JobPost,
  JobPostCampaign,
} from "@optima/supabase/types";

import { loadSearchParams } from "@/features/job-posts/job-posts.search-params";
import { buttonVariants } from "@optima/ui/button";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function JobPostsPage({ searchParams }: PageProps) {
  const filters = await loadSearchParams(searchParams);
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");
  const { data: jobPosts, error } = await getJobPostsWithApplicationsCount(
    supabase,
    organizationId ?? "",
    filters,
  );

  return (
    <div className="flex flex-col gap-8 flex-1">
      <section className="flex items-center justify-between">
        <PageTitle title="Job Listings" className="text-lg" />
        <Link
          href="/job-posts/new"
          className={buttonVariants({
            variant: "default",
            className: "min-w-fit",
          })}
        >
          <PlusIcon className="size-4" />
          Publish New Job
        </Link>
      </section>
      <JobPostFilters />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {!jobPosts?.length && (
          <div className="col-span-full flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <p className=" text-muted-foreground">No job posts found</p>
            <p className=" text-muted-foreground">
              Create your first job post to start receiving applications
            </p>
            <Link
              href="/job-posts/new"
              className={buttonVariants({
                variant: "outline",
                className: "mt-2",
                size: "lg",
              })}
            >
              <PlusIcon className="mr-2 size-4" />
              Create Job Post
            </Link>
          </div>
        )}
        {jobPosts?.map((job) => (
          <JobPostCard
            key={job.id}
            job={
              job as unknown as JobPost & {
                department: Department;
                applications: [{ count: number }];
                campaigns: JobPostCampaign[];
              }
            }
          />
        ))}
      </section>
    </div>
  );
}
