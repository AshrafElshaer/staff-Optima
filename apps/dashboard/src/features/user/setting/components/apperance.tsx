import { Card, CardContent, CardHeader, CardTitle } from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { PaintBrush04Icon } from "hugeicons-react";
export function ApperanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold flex items-center gap-2">
          <PaintBrush04Icon size={18} strokeWidth={2} />
          <span>Apperance</span>
        </CardTitle>
        {/* <CardDescription>Manage your account settings and preferences.</CardDescription> */}
      </CardHeader>
      <Separator />
      <CardContent>apperance settings</CardContent>
    </Card>
  );
}
