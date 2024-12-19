import { Button } from "@optima/ui/button";
import { Card } from "@optima/ui/card";
import { Separator } from "@optima/ui/separator";
import { MailSend01Icon } from "hugeicons-react";
import { SiVisa } from "react-icons/si";
export function PaymentInUse() {
  return (
    <Card className="flex pt-4 flex-col">
      <div className="px-4 ">
        <h4 className="font-semibold">Payment Details</h4>
        <p className="text-secondary-foreground">
          Change how would you pay for service.
        </p>
        <div className="flex items-center justify-between gap-4">
          <SiVisa size={80} />
          <div className="w-full text-sm font-semibold">
            <p>Visa ending with 6499</p>
            <span className="text-secondary-foreground">expiry 12/29</span>
          </div>

          <Button variant="outline">Change</Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-2 pb-2 flex-1 flex items-center gap-2 text-muted-foreground">
        <MailSend01Icon size={24} strokeWidth={2} />
        <span className="font-medium">ashrafelshaer98@gmail.com</span>
      </div>
    </Card>
  );
}
