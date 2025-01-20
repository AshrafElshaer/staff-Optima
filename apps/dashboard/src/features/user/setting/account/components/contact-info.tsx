import { Button } from "@optima/ui/button";

import { Label } from "@optima/ui/label";

import type { User } from "@optima/supabase/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Input } from "@optima/ui/input";
import { Separator } from "@optima/ui/separator";

export function ContactInfo({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Contact Information</CardTitle>
        {/* <CardDescription>Manage your account settings and preferences.</CardDescription> */}
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 w-full md:w-1/3">
          <Label>Email Address</Label>
          <Input placeholder="Enter your email" value={user.email} />
        </div>
        <div className="space-y-2 w-full md:w-1/3">
          <Label>Phone Number</Label>
          <Input placeholder="Enter your phone number" />
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
