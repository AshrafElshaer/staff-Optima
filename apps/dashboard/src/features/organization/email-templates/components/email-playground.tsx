import { Button } from "@optima/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optima/ui/hover-card";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { InformationCircleIcon, MailSend01Icon } from "hugeicons-react";
import { EyeIcon } from "lucide-react";
import { HiInformationCircle } from "react-icons/hi";
import { EmailEditorToolbar } from "./email-editor-toolbar";

export function EmailPlayground() {
  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex flex-col md:items-center gap-2 mr-auto w-full md:w-auto md:flex-row">
          <Label
            htmlFor="subject"
            className="text-sm font-medium flex items-center gap-2 "
          >
            Subject
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger>
                <HiInformationCircle size={20} />
              </HoverCardTrigger>
              <HoverCardContent className="w-64 text-sm">
                <p>
                  The subject is the title of the email that will be displayed
                  in the inbox.
                </p>
              </HoverCardContent>
            </HoverCard>
          </Label>
          <Input
            id="subject"
            placeholder="Congrats we are moving to next step in proccess "
            className="w-full  lg:min-w-96"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <EyeIcon size={18} />
            Preview
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <MailSend01Icon size={18} />
            Test Email
          </Button>
        </div>
      </div>
      <div className="flex  gap-2 flex-1">
        <div className="h-full w-full border rounded-md">play</div>
        <EmailEditorToolbar />
      </div>
    </section>
  );
}
