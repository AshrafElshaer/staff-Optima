import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Department,
  JobPost,
  JobPostCampaign,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { Checkbox } from "@optima/ui/checkbox";
import { DatePicker } from "@optima/ui/date-picker";
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
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Megaphone01Icon } from "hugeicons-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createJobCampaignAction,
  createJobPostAction,
} from "../job-posts.actions";

const publishJobSchema = z.object({
  from: z.date(),
  fromTime: z.string().min(5, { message: " required" }),
  to: z.date(),
  toTime: z.string().min(5, { message: " required" }),
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
      from: moment().add(1, "days").toDate(),
      fromTime: "",
      to: moment().add(7, "days").toDate(),
      toTime: "",
      useIntegratedApps: false,
    },
  });

  async function onSubmit(data: PublishJobFormValues) {
    setIsLoading(true);

    toast.promise(
      async () => {
        const start_date = moment(data.from)
          .hour(Number.parseInt(data.fromTime.split(":")[0] ?? "0"))
          .minute(Number.parseInt(data.fromTime.split(":")[1] ?? "0"))
          .toISOString();

        const end_date = moment(data.to)
          .hour(Number.parseInt(data.toTime.split(":")[0] ?? "0"))
          .minute(Number.parseInt(data.toTime.split(":")[1] ?? "0"))
          .toISOString();

        if (!isNewJob) {
          const result = await createJobCampaign({
            job_id: job.id,
            start_date,
            end_date,
            status: "pending",
            is_integration_enabled: data.useIntegratedApps,
          });

          if (result?.serverError) {
            throw new Error(result.serverError);
          }

          setOpen(false);
          return { success: true };
        }

        const jobPostResult = await createJobPost({
          ...job,
          status: "pending",
          start_date,
          end_date,
        });

        if (jobPostResult?.serverError) {
          throw new Error(jobPostResult.serverError);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="flex flex-col gap-4 px-4 md:flex-row">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        fromDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value}
                        min={new Date(
                          Date.now() + 60 * 60 * 1000,
                        ).toLocaleTimeString("en-US", {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row px-4">
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        fromDate={form.getValues().from}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value}
                        min={form.getValues().fromTime}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="useIntegratedApps"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2 p-4">
                  <FormControl>
                    <div className="flex items-start gap-2 ">
                      <Checkbox
                        id="publish-job-checkbox"
                        checked={field.value}
                        onCheckedChange={(isChecked) =>
                          field.onChange(!!isChecked)
                        }
                        disabled={true}
                        aria-describedby="publish-job-checkbox-description"
                        aria-controls="publish-job-checkbox-input"
                      />
                      <div className="grow">
                        <div className="grid gap-2">
                          <Label htmlFor="publish-job-checkbox">
                            Launch with Integrated Apps{" "}
                            <span className="text-xs text-muted-foreground">
                              (Optional)
                            </span>
                          </Label>
                          <p
                            id="publish-job-checkbox-description"
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
                onClick={async () => {
                  const isValid = await form.trigger();
                  if (isValid) {
                    onSubmit(form.getValues());
                  }
                }}
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
