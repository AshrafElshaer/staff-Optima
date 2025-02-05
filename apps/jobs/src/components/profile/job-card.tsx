import type { Department, JobPost } from "@optima/supabase/types";
import { Badge } from "@optima/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { headers } from "next/headers";
import Link from "next/link";

export async function JobCard({
  jobPost,
}: { jobPost: JobPost & { department: Department } }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const organizationDomain = pathname?.split("/")[1];

  return (
    <Link href={`/${organizationDomain}/${jobPost.id}`}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between gap-2 capitalize">
            <span>{jobPost.title}</span>
            <span>{jobPost.experience_level.replace("_", " ")}</span>
          </CardTitle>
          <CardDescription className="capitalize">
            {jobPost.department.name} • {jobPost.location.replace("_", "")} -{" "}
            {jobPost.employment_type.replace("_", " ")}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2 text-secondary-foreground">
          <div className="flex flex-wrap gap-2">
            {jobPost.skills?.map((skill) => (
              <Badge key={skill} size="md">
                {skill}
              </Badge>
            ))}
          </div>
          {jobPost.salary_range && <p>Salary Range: {jobPost.salary_range}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}
