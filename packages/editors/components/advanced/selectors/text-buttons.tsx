import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import { useCurrentEditor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./node-selector";

export const TextButtons = ({
  size = "sm",
}: {
  size?: "sm" | "lg" | "icon" | "default";
}) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "align-left",
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
      // Note: Requires the TextAlign extension to be enabled
      command: (editor) => editor.chain().focus().setTextAlign("left").run(),
      icon: AlignLeftIcon,
    },
    {
      name: "align-center",
      isActive: (editor) => editor.isActive({ textAlign: "center" }),
      command: (editor) => editor.chain().focus().setTextAlign("center").run(),
      icon: AlignCenterIcon,
    },
    {
      name: "align-right",
      isActive: (editor) => editor.isActive({ textAlign: "right" }),
      command: (editor) => editor.chain().focus().setTextAlign("right").run(),
      icon: AlignRightIcon,
    },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index.toString()}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button
            size={size}
            className="rounded-none"
            variant={item.isActive(editor) ? "secondary" : "ghost"}
            type="button"
          >
            <item.icon size={14} />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
