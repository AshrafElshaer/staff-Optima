"use client";

import { generateHTML, generateJSON } from "@tiptap/core";
import type { HTMLContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorBubble, EditorContent, EditorRoot } from "novel";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { useState } from "react";
import { ColorSelector } from "../selectors/color-selector";
import { LinkSelector } from "../selectors/link-selector";
import { NodeSelector } from "../selectors/node-selector";
import { TextButtons } from "../selectors/text-buttons";
import { uploadFn } from "../utils/image-upload";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-commands";
type AdvancedEditorProps = {
  content: JSONContent | undefined;
  onChange?: (content: JSONContent) => void;
  editable?: boolean;
};

const extensions = [...defaultExtensions, slashCommand];

export default function AdvancedEditor({
  content,
  onChange,
  editable = true,
}: AdvancedEditorProps) {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        editable={editable}
        initialContent={content}
        onUpdate={({ editor }) => {
          onChange?.(editor.getJSON());
        }}
        extensions={extensions}
        immediatelyRender={false}
        className="h-full w-full"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class:
              "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border  bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={
                  "flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent "
                }
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          {/* <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
