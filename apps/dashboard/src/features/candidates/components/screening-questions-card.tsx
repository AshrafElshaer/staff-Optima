import type { CandidateWithApplication } from "@optima/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";

export function ScreeningQuestionsCard({
  candidate,
}: { candidate: CandidateWithApplication }) {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Screening Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(
          candidate.applications[0]?.screening_question_answers as {
            question: string;
            answer: string;
          }[]
        )?.map((question) => (
          <div key={question.question} className="space-y-1">
            <p className="text-sm font-medium text-secondary-foreground">
              {question.question}
            </p>
            <p className="text-sm ">{question.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
