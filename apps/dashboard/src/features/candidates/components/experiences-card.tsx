import type { CandidateWithApplication } from "@optima/supabase/types";
import type { Experience } from "@optima/supabase/validations";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import moment from "moment";

export function ExperiencesCard({
  candidate,
}: { candidate: CandidateWithApplication }) {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Experiences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {(candidate.experiences as Experience[])?.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-secondary-foreground ">Company</p>
              <p className="">-</p>
            </div>
            <div className="space-y-1">
              <p className="text-secondary-foreground">Position</p>
              <p>-</p>
            </div>
            <div className="space-y-1">
              <p className="text-secondary-foreground">Experience</p>
              <p>-</p>
            </div>
          </div>
        ) : (
          (candidate.experiences as Experience[])?.map((experience, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-3  gap-4 text-sm"
              key={index.toString()}
            >
              <div className="space-y-1">
                <p className="text-secondary-foreground ">Company</p>
                <p className="">{experience.company}</p>
              </div>
              <div className="space-y-1">
                <p className="text-secondary-foreground">Position</p>
                <p>{experience.position}</p>
              </div>
              <div className="space-y-1">
                <p className="text-secondary-foreground">Experience</p>
                <p>
                  {experience.end_date
                    ? moment
                        .duration(
                          moment(experience.end_date).diff(
                            moment(experience.start_date),
                          ),
                        )
                        .humanize()
                    : moment
                        .duration(moment().diff(moment(experience.start_date)))
                        .humanize()}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
