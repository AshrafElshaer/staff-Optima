import { PageTitle } from "@/components/page-title";
import { SearchInput } from "@/components/search-input";
import { DeleteDepartment } from "@/features/organization/departments/components/delete-department";
import { DepartmentDialog } from "@/features/organization/departments/components/department-dialog";
import { createServerClient } from "@/lib/supabase/server";
import {
  getDepartmentsByOrganizationId,
  getDepartmentsWithJobsAndApplications,
} from "@optima/supabase/queries";
import { Button } from "@optima/ui/button";
import { Card, CardHeader, CardTitle } from "@optima/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@optima/ui/tooltip";
import {
  Delete03Icon,
  JobLinkIcon,
  PencilEdit01Icon,
  UserIcon,
} from "hugeicons-react";

import { headers } from "next/headers";
import Link from "next/link";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { PiArrowBendDoubleUpLeftFill } from "react-icons/pi";

const departmentCache = createSearchParamsCache({
  name: parseAsString.withDefault(""),
});

type DepartmentSearchParams = Promise<{
  name: string;
}>;

type DepartmentPageProps = {
  searchParams: DepartmentSearchParams;
};

export default async function OrganizationDepartmentsPage({
  searchParams,
}: DepartmentPageProps) {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id")!;
  const { name } = departmentCache.parse(await searchParams);
  const { data: departments, error } =
    await getDepartmentsWithJobsAndApplications(supabase, organizationId, {
      name,
    });

  return (
    <main className="flex flex-col gap-6 flex-1">
      <PageTitle title="Manage and view all departments within your organization. Use departments to organize job listings and streamline operations." />
      <section className="flex justify-between gap-2 w-full">
        <div className="w-full max-w-xs">
          <SearchInput query="name" placeholder="Search departments" />
        </div>
        <DepartmentDialog>
          <Button variant="secondary" className="min-w-fit">
            New Department
          </Button>
        </DepartmentDialog>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {!departments?.length && (
          <div className="col-span-full flex min-h-[200px] flex-col items-center justify-center gap-4 relative p-8 text-center">
            <PiArrowBendDoubleUpLeftFill
              className="absolute top-0 right-8 text-muted-foreground rotate-90"
              size={70}
            />
            <p className=" text-muted-foreground">No departments found</p>
            <p className=" text-muted-foreground">
              Create your first department to start receiving applications
            </p>
          </div>
        )}
        {departments?.map((department) => (
          <Card
            key={department.id}
            className="p-4 space-y-4 bg-secondary group h-fit"
          >
            <div className="flex items-center  gap-4">
              <p className="text-lg font-semibold mr-auto">{department.name}</p>

              <DepartmentDialog department={department}>
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-secondary-foreground hover:text-foreground "
                >
                  <PencilEdit01Icon size={18} strokeWidth={2} />
                </button>
              </DepartmentDialog>
              <DeleteDepartment department={department} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger  asChild>
                    <Link
                      href={`/job-posts?department=${department.id}`}
                      className="flex items-center gap-2"
                    >
                      <JobLinkIcon size={18} strokeWidth={2} />
                      <p className=" ">{department.job_posts.length}</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background">
                    <p>Job Posts</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2" asChild>
                    <Link
                      href={`/candidates?department=${department.id}`}
                      className="flex items-center gap-2"
                    >
                      <UserIcon size={18} strokeWidth={2} />
                      <p className=" ">{department.applications.length}</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background">
                    <p>Applicants</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
