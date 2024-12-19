import { Badge } from "@optima/ui/badge";
import { Button } from "@optima/ui/button";
import { Card } from "@optima/ui/card";
import { Progress } from "@optima/ui/progress";
import { Separator } from "@optima/ui/separator";

export function PlanCard() {
  return (
    <Card className=" space-y-2">
      <div className="flex items-center gap-4 p-4 pb-0">
        <span className="font-semibold">Starter Plan</span>
        <Badge variant="success" className="rounded-sm" size="md">
          Monthly
        </Badge>
        <p className="ml-auto">
          15 $ <span className="text-muted-foreground text-sm">/ month</span>
        </p>
      </div>
      <p className="text-secondary-foreground px-4">
        Best for small team or startups
      </p>
      <div className="px-4 pb-4 space-y-2">
        <span className="text-sm">15 / 20 users</span>
        <Progress value={75} indicatorBg="success" />
      </div>
      <Separator />
      <div className="p-4 pt-0 pb-2 flex justify-end">
        <Button variant="outline">Manage</Button>
      </div>
    </Card>
  );
}
