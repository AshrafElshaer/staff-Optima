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

export function JobCard({
  jobPost,
}: { jobPost: JobPost & { department: Department } }) {
  return (
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
        {jobPost.salary_range && <p>Salary Range: {jobPost.salary_range}</p>}
        <div className="flex flex-wrap gap-2">
          {jobPost.skills?.map((skill) => (
            <Badge key={skill} size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
