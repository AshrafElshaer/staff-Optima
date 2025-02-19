import type { CandidateWithApplication } from "@optima/supabase/types";
import type { Education } from "@optima/supabase/validations";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import moment from "moment";

export function EducationsCard({
  candidate,
}: { candidate: CandidateWithApplication }) {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Educations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {(candidate.educations as Education[])?.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-secondary-foreground">School</p>
              <p className="">-</p>
            </div>
            <div className="space-y-1">
              <p className="text-secondary-foreground">Degree</p>
              <p>-</p>
            </div>
            <div className="space-y-1">
              <p className="text-secondary-foreground">Graduation</p>
              <p>-</p>
            </div>
            <div className="space-y-1">
              <p className="text-secondary-foreground">GPA</p>
              <p>-</p>
            </div>
          </div>
        ) : (
          (candidate.educations as Education[])?.map((education, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4"
              key={index.toString()}
            >
              <div className="space-y-1 w-full md:col-span-2">
                <p className="text-secondary-foreground ">School</p>
                <p>{education.school}</p>
              </div>
              <div className="space-y-1 w-full md:col-span-2">
                <p className="text-secondary-foreground">Degree</p>
                <p>{education.degree}</p>
              </div>

              <div className="space-y-1 w-full">
                <p className="text-secondary-foreground">Graduation</p>
                <p>{moment(education.graduation_date).format("MMM YYYY")}</p>
              </div>

              <div className="space-y-1 w-full">
                <p className="text-secondary-foreground">GPA</p>
                <p>{education.gpa}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
