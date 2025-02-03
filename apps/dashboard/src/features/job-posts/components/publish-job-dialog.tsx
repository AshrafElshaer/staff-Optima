import type { JobPost } from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { Checkbox } from "@optima/ui/checkbox";
import { DatePickerWithRange } from "@optima/ui/date-picker-range";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import { Label } from "@optima/ui/label";
import { Megaphone01Icon } from "hugeicons-react";
import moment from "moment";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function PublishJobDialog({
  job,

  open,
  setOpen,
}: {
  job: JobPost;

  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: moment().toDate(),
    to: moment().add(7, "days").toDate(),
  });
  const [checked, setChecked] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone01Icon className="size-5" strokeWidth={2} />
            Publish Job
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Launch a campaign to publish your job and reach top candidates across
          multiple channels.
        </DialogDescription>
        <div className="flex flex-col items-start sm:items-center sm:justify-between gap-4 p-4 sm:flex-row">
          <Label>Start & End Date</Label>
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            fromDate={new Date()}
          />
        </div>
        <div className="flex items-start gap-2 p-4">
          <Checkbox
            id={"publish-job-checkbox"}
            checked={checked}
            onCheckedChange={(isChecked) => setChecked(!!isChecked)}
            aria-describedby={"publish-job-checkbox-description"}
            aria-controls={"publish-job-checkbox-input"}
          />
          <div className="grow">
            <div className="grid gap-2">
              <Label htmlFor={"publish-job-checkbox"}>
                Launch with Integrated Apps{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <p
                id={"publish-job-checkbox-description"}
                className="text-sm text-muted-foreground"
              >
                Publish your job posting through connected platforms.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
