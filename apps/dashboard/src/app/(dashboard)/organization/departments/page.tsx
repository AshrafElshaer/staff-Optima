import { PageTitle } from "@/components/page-title";
import { DeleteDepartment } from "@/features/organization/departments/delete-department";
import { DepartmentDialog } from "@/features/organization/departments/department-dialog";
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
import { Pencil } from "lucide-react";
import { headers } from "next/headers";

export default async function OrganizationDepartmentsPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id")!;
  const { data: departments, error } =
    await getDepartmentsWithJobsAndApplications(supabase, organizationId);

  return (
    <main className="flex flex-col gap-6">
      <PageTitle title="Manage and view all departments within your organization. Use departments to organize job listings and streamline operations." />
      <section className="flex justify-end w-full">
        <DepartmentDialog>
          <Button variant="secondary">New Department</Button>
        </DepartmentDialog>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments?.map((department) => (
          <Card
            key={department.id}
            className="p-4 space-y-4 bg-secondary group"
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
                  <TooltipTrigger className="flex items-center gap-2">
                    <JobLinkIcon size={18} strokeWidth={2} />
                    <p className=" ">{department.job_listings.length}</p>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background">
                    <p>Job Listings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <UserIcon size={18} strokeWidth={2} />
                    <p className=" ">{department.applications.length}</p>
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
