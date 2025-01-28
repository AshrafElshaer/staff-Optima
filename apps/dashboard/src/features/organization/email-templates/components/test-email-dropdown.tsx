import { Button } from "@optima/ui/button";
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@optima/ui/popover";
import { MailSend01Icon } from "hugeicons-react";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { sendTestEmailAction } from "../emails.actions";

export const TestEmailDropdown = ({
  emailContent,
  subject,
}: {
  emailContent: string;
  subject: string;
}) => {
  const { execute, isExecuting } = useAction(sendTestEmailAction, {
    onSuccess: () => {
      toast.success("Email sent successfully");
    },
    onError: ({ error }) => {
      toast.error(
        error.validationErrors?.sendTo?._errors?.[0] ?? error.serverError,
      );
    },
  });
  const [sendTo, setSendTo] = useState<string>("");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full " type="button">
          <MailSend01Icon size={18} />
          Test Email
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4" align="end">
        <Label>Email</Label>
        <Input
          placeholder="Enter email address"
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
        />
        <Button
          type="button"
          className="w-full"
          disabled={isExecuting}
          onClick={() => {
            execute({
              sendTo: sendTo,
              subject: subject,
              emailContent: emailContent,
            });
          }}
        >
          {isExecuting ? <Loader className="size-4 animate-spin" /> : null}
          send
        </Button>
      </PopoverContent>
    </Popover>
  );
};
