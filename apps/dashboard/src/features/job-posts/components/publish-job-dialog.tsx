import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Department,
  JobPost,
  JobPostCampaign,
} from "@optima/supabase/types";
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
} from "@optima/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";
import { Label } from "@optima/ui/label";
import { Megaphone01Icon } from "hugeicons-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createJobCampaignAction,
  createJobPostAction,
} from "../job-posts.actions";

const publishJobSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  useIntegratedApps: z.boolean().default(false),
});

type PublishJobFormValues = z.infer<typeof publishJobSchema>;

export function PublishJobDialog({
  job,
  open,
  setOpen,
}: {
  job: JobPost & {
    department: Department;
    campaigns: JobPostCampaign[];
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const isNewJob = !job.id;
  const [isLoading, setIsLoading] = useState(false);
  const { executeAsync: createJobCampaign } = useAction(
    createJobCampaignAction,
  );
  const { executeAsync: createJobPost } = useAction(createJobPostAction);

  const form = useForm<PublishJobFormValues>({
    resolver: zodResolver(publishJobSchema),
    defaultValues: {
      dateRange: {
        from: moment().add(1, "days").toDate(),
        to: moment().add(7, "days").toDate(),
      },
      useIntegratedApps: false,
    },
  });

  async function onSubmit(data: PublishJobFormValues) {
    // Handle form submission
    setIsLoading(true);
    toast.promise(
      async () => {
        if (!isNewJob) {
          const result = await createJobCampaign({
            job_id: job.id,
            start_date: moment(data.dateRange.from)
              .utc()
              .startOf("day")
              .toISOString(),
            end_date: moment(data.dateRange.to)
              .utc()
              .endOf("day")
              .toISOString(),
            status: "pending",
            is_integration_enabled: data.useIntegratedApps,
          });

          if (result?.serverError) {
            throw new Error(result.serverError);
          }
          setOpen(false);
          return {
            success: true,
          };
        }

        const jobPostResult = await createJobPost({
          ...job,
          status: "pending",
        });

        if (jobPostResult?.serverError) {
          throw new Error(jobPostResult?.serverError);
        }

        setOpen(false);
      },

      {
        loading: "Launching job campaign ...",
        success: "Job campaign launched successfully",
        error: (error) => error.message,
        finally: () => setIsLoading(false),
      },
    );
  }

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start sm:items-center sm:justify-between gap-4 p-4 sm:flex-row">
                  <FormLabel>Start & End Date</FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                      fromDate={moment().add(1, "days").toDate()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useIntegratedApps"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2 p-4">
                  <FormControl>
                    <div className="flex items-start gap-2 p-4">
                      <Checkbox
                        id={"publish-job-checkbox"}
                        checked={field.value}
                        onCheckedChange={(isChecked) =>
                          field.onChange(!!isChecked)
                        }
                        disabled={true}
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
                            Publish your job posting through connected
                            platforms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => onSubmit(form.getValues())}
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "Publish"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
