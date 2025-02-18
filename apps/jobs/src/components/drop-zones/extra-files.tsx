"use client";

import { formatBytes } from "@/lib/format-bytes";

import { attachmentTypeEnum } from "@optima/supabase/types";
import {
  applicationInsertSchema,
  candidateInsertSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { Cancel01Icon, Pdf02Icon, PlusMinus01Icon } from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, } from "react";
import { useDropzone } from "react-dropzone";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zfd } from "zod-form-data";

const formSchema = z.object({
  candidate: candidateInsertSchema,
  application: applicationInsertSchema,
  attachments: z.array(
    z.object({
      fileType: z.nativeEnum(attachmentTypeEnum),
      file: zfd.file(),
    }),
  ),
});

interface ExtraFilesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}
export function ExtraFiles({ form }: ExtraFilesProps) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,

    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop(acceptedFiles) {
      if (!acceptedFiles.length) return;
      form.setValue("attachments", [
        ...form.getValues("attachments"),
        ...acceptedFiles.map((file) => ({ fileType: "other" as const, file })),
      ]);
    },
  });

  const attachments = useMemo(
    () => form.watch("attachments"),
    [form.watch("attachments")],
  );

  function handleRemoveFile(file: File) {
    form.setValue(
      "attachments",
      form.getValues("attachments").filter((f) => f.file !== file),
    );
  }

  return (
    <div
      {...getRootProps()}
      className="relative  min-h-40 border rounded-md p-4 "
    >
      <input {...getInputProps()} />
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <p className="text-sm text-secondary-foreground">
            Drag and drop your files here
          </p>
          <Button variant="outline" size="icon" type="button" onClick={open}>
            <PlusMinus01Icon className="size-4" />
          </Button>
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((file) => (
              <div
                key={file.file.name}
                className="text-sm flex items-center gap-2 w-full border rounded-md p-2"
              >
                <p>{file.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.file.size)}
                </p>
                <Button
                  variant="destructive"
                  className="ml-auto"
                  type="button"
                  size="iconSm"
                  onClick={() => handleRemoveFile(file.file)}
                >
                  <Cancel01Icon className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-primary/70"
          >
            <div className="text-center">
              <Pdf02Icon className="size-8 mx-auto mb-2" />
              <p className="text-lg font-medium">Drop your files here</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
