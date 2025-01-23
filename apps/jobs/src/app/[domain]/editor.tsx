"use client";

import { defaultExtensions } from "@optima/editors/components/extensions";
import { EditorContent, useEditor } from "@tiptap/react";

export function Editor({ content }: { content: string }) {
  const editor = useEditor({
    content,
    editable: false,
    extensions: defaultExtensions,
  });
  return <EditorContent editor={editor} />;
}
