"use client";

import { formatBytes } from "@/lib/format-bytes";
import type { AttachmentType } from "@optima/supabase/types";
import { Button } from "@optima/ui/button";
import { Pdf02Icon, Cancel01Icon, PlusMinus01Icon } from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface ExtraFilesProps {
  setFiles: React.Dispatch<
    React.SetStateAction<
      {
        fileType: AttachmentType;
        file: File;
      }[]
    >
  >;
  files: {
    fileType: AttachmentType;
    file: File;
  }[];
}
export function ExtraFiles({ setFiles, files }: ExtraFilesProps) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,

    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop(acceptedFiles) {
      if (!acceptedFiles.length) return;
      setFiles((prev) => [...prev, ...acceptedFiles.map((file) => ({ fileType: "other" as const, file }))]);
    },
  });

  function handleRemoveFile(file: File) {
    setFiles((prev) => prev.filter((f) => f.file !== file));
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

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
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
