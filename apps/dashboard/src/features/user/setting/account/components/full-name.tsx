import type { User } from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Separator } from "@optima/ui/separator";

export function FullName({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Full Name</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 w-full md:w-1/3">
          <Label>First Name</Label>
          <Input placeholder="Enter your first name" value={user.first_name} />
        </div>
        <div className="space-y-2 w-full md:w-1/3">
          <Label>Last Name</Label>
          <Input placeholder="Enter your last name" value={user.last_name} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end p-3 gap-2 items-center">
        <Button variant="outline">Reset</Button>
        <Button disabled>Save</Button>
      </CardFooter>
    </Card>
  );
}
