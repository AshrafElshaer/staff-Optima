import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { Notification02Icon } from "hugeicons-react";
export function NotificationsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold flex items-center gap-2">
          <Notification02Icon size={18} strokeWidth={2} />
          <span>Notifications</span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>notifications settings</CardContent>
    </Card>
  );
}
