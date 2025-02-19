"use client";
import { defaultExtensions } from "@/components/editors/advanced/extensions";
import EmailEditor from "@/components/editors/email-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailTemplateUpdateSchema } from "@optima/supabase/validations";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optima/ui/hover-card";
import { Input } from "@optima/ui/inputs";
import { generateJSON } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import type { z } from "zod";
import { OnEditToast } from "@/components/toasts/on-edit-toast";
import { useActionBar } from "@/hooks/use-action-bar";
import type { EmailTemplate } from "@optima/supabase/types";
import { useAction } from "next-safe-action/hooks";
import { updateEmailTemplateAction } from "../emails.actions";
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

interface UpdateEmailPlaygroundProps {
  emailTemplate: EmailTemplate;
}

export function UpdateEmailPlayground({
  emailTemplate,
}: UpdateEmailPlaygroundProps) {
  const form = useForm<z.infer<typeof emailTemplateUpdateSchema>>({
    resolver: zodResolver(emailTemplateUpdateSchema),
    defaultValues: {
      id: emailTemplate.id,
      title: emailTemplate.title,
      subject: emailTemplate.subject,
      body: emailTemplate.body,
    },
  });

  const { execute, status, reset } = useAction(updateEmailTemplateAction, {
    onSuccess: ({ data }) => {
      setTimeout(() => {
        reset();
        form.reset(data);
      }, 3000);
    },
  });

  function handleSubmit(data: z.infer<typeof emailTemplateUpdateSchema>) {
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
                          The subject is the title of the email that will be
                          displayed in the inbox.
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
            <PreviewEmail emailTemplate={form.watch("body") || ""} />
            <TestEmailDropdown
              emailContent={form.watch("body") || ""}
              subject={form.watch("subject") || ""}
            />
          </div>

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <EmailEditor
                    key={form.formState.isDirty ? "dirty" : "clean"}
                    content={generateJSON(
                      field.value || emailTemplate.body,
                      defaultExtensions,
                    )}
                    onChange={(content) => field.onChange(content)}
                    className="border rounded-md p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
