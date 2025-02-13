import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { Icons } from "@optima/ui/icons";
import { Separator } from "@optima/ui/separator";

export default async function WaitlistPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Congratulations , You're on the waitlist!</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent >
          <Icons.Logo className="size-16 mx-auto my-8" />

          <p className="mb-4">
            Thank you for your interest in Staff Optima. We're currently
            building something amazing and will notify you as soon as access is
            granted.
          </p>
          <p>
            While you wait, feel free to reach out to our support team if you
            have any questions. We appreciate your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
