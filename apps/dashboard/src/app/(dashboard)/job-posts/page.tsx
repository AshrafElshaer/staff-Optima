import { PageTitle } from "@/components/page-title";
import { JobListingCard } from "@/features/job-posts/components/job-card";
import { JobPostFilters } from "@/features/job-posts/components/job-post-filters";
import { createServerClient } from "@/lib/supabase/server";
import { getJobPostsWithApplicationsCount } from "@optima/supabase/queries";
import type { Department, JobPost } from "@optima/supabase/types";

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
    <div className="flex flex-col gap-8">
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobPosts?.map((job) => (
          <JobListingCard
            key={job.id}
            job={
              job as unknown as JobPost & {
                department: Department;
                applications: [{ count: number }];
              }
            }
          />
        ))}
      </section>
    </div>
  );
}
