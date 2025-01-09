import { defaultExtensions } from "@/components/editors/advanced/extensions";
import EmailEditor from "@/components/editors/email-editor";
import { Button } from "@optima/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import { generateJSON } from "@tiptap/react";
import { EyeIcon } from "lucide-react";

export function PreviewEmail({ emailTemplate }: { emailTemplate: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full " type="button">
          <EyeIcon size={18} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="h-96 ">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>
        <div className="p-4 overflow-y-scroll h-full">
          <EmailEditor
            content={generateJSON(emailTemplate, defaultExtensions)}
            editable={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
