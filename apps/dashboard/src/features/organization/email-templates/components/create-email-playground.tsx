"use client";
import { defaultExtensions } from "@/components/editors/advanced/extensions";
import EmailEditor from "@/components/editors/email-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailTemplateInsertSchema } from "@optima/supabase/validations";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optima/ui/hover-card";
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { generateJSON } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import type { z } from "zod";
import { OnEditToast } from "@/components/toasts/on-edit-toast";
import { useActionBar } from "@/hooks/use-action-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createEmailTemplateAction } from "../emails.actions";
import { PreviewEmail } from "./preview-email";
import { TestEmailDropdown } from "./test-email-dropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@optima/ui/form";

export function CreateEmailPlayground() {
  const form = useForm<z.infer<typeof emailTemplateInsertSchema>>({
    resolver: zodResolver(emailTemplateInsertSchema),
    defaultValues: {
      title: "",
      subject: "",
      body: "",
    },
  });

  const { execute, status, reset } = useAction(createEmailTemplateAction, {
    onSuccess: () => {
      reset();
      form.reset();
      toast.success("Email template created");
    },
  });

  function handleSubmit(data: z.infer<typeof emailTemplateInsertSchema>) {
    execute(data);
  }

  useActionBar({
    show: form.formState.isDirty,
    ToastContent(props) {
      return (
        <OnEditToast
          toastId={props.toastId}
          onAction={() => {
            form.handleSubmit(handleSubmit)();
          }}
          onReset={() => {
            form.reset();
          }}
          status={status}
        />
      );
    },
  });

  return (
    <section className="flex-1 w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="h-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 md:flex-row w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex items-center gap-2">
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
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Congrats we are moving to next step in proccess"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <PreviewEmail emailTemplate={form.watch("body")} />
            <TestEmailDropdown
              emailContent={form.watch("body")}
              subject={form.watch("subject")}
            />
          </div>

          <div className="flex gap-2 flex-1">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <EmailEditor
                      key={form.formState.isDirty ? "dirty" : "clean"}
                      content={generateJSON(field.value, defaultExtensions)}
                      onChange={(content) =>
                        field.onChange(content)
                      }
                      className="border rounded-md p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );
}
