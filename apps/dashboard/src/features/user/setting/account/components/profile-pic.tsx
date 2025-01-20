import type { User } from "@optima/supabase/types";
import { Avatar } from "@optima/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { UserEdit01Icon } from "hugeicons-react";

export function ProfilePic({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold ">Profile Picture</CardTitle>
        {/* <CardDescription>Manage your account settings and preferences.</CardDescription> */}
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center justify-between gap-4">
        <p className="text-compact-xlarge text-secondary-foreground">
          Accepts : PNG, JPG, or SVG. <br />
          Max size : 1MB <br />
          Recommended dimensions: <br />
          200x200 pixels.
        </p>

        <Avatar
          className="size-20"
          shape="square"
          // src={user?.avatar_url}
          initials={"AE"}
        />
      </CardContent>
      <Separator />
      <CardFooter className=" p-4">
        <CardDescription>
          This is your avatar. Click on the avatar to upload a custom one from
          your files.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
