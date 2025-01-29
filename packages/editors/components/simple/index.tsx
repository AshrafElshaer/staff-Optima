"use client";

import { generateJSON } from "@tiptap/core";
import type { HTMLContent } from "@tiptap/react";
import { EditorProvider } from "@tiptap/react";

import { cn } from "@optima/ui/cn";
import { EditorContent, EditorRoot } from "novel";
import { Placeholder } from "novel/extensions";
import { handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "../extensions";
import { SimpleToolbar } from "./toolbar";

type EditorProps = {
  content: HTMLContent | undefined;
  onChange?: (content: HTMLContent) => void;
  editable?: boolean;
  className?: string;
};

const extensions = [
  ...defaultExtensions,
  Placeholder.configure({
    placeholder: "Write something...",
  }),
];

export function SimpleEditor({
  content,
  onChange,
  editable = true,
  className,
}: EditorProps) {
  return (
    <EditorRoot>
      <EditorContent
        editable={editable}
        initialContent={generateJSON(content ?? "", extensions)}
        onUpdate={({ editor }) => {
          onChange?.(editor.getHTML());
        }}
        extensions={extensions}
        immediatelyRender={false}
        className={cn("h-full w-full overflow-hidden", className)}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          // handlePaste: (view, event) =>
          //   handleImagePaste(view, event, uploadFn),
          // handleDrop: (view, event, _slice, moved) =>
          //   handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class:
              "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-4",
          },
        }}
      >
        <SimpleToolbar />
      </EditorContent>
    </EditorRoot>
  );
}
