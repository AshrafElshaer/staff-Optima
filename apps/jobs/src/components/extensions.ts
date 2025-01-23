import { TextAlign } from "@tiptap/extension-text-align";
import {
  AIHighlight,
  Color,
  HighlightExtension,
  HorizontalRule,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
} from "novel/extensions";

import { cn } from "@optima/ui/cn";
import { ResizableImage } from "./ResizableImage";

const aiHighlight = AIHighlight;
const placeholder = Placeholder;
const highlight = HighlightExtension;
const underline = TiptapUnderline;
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(" underline underline-offset-[3px] cursor-pointer "),
  },
});

const textAlign = TextAlign.configure({
  alignments: ["left", "center", "right"],
  types: ["heading", "paragraph"],
});

const color = Color;

const textStyle = TextStyle;

const tiptapImage = ResizableImage.configure({
  HTMLAttributes: {
    class: "my-8 rounded-lg border ",
  },
});

// const updatedImage = UpdatedImage.configure({
//   HTMLAttributes: {
//     class: cn("rounded-lg border border-muted"),
//   },
// });

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cn("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cn("flex gap-2 items-start my-2"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cn("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-3 -mt-2 "),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-3 mt-2 ml-4"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-normal mb-2 ml-4 "),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn("border-l-4 border-primary pl-4"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cn(
        "rounded-md bg-muted text-foreground border p-5 font-mono font-medium",
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cn(
        "rounded-md bg-muted text-foreground  px-1.5 py-1 font-mono font-medium",
      ),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    class: "border-border",
    width: 4,
  },
  gapcursor: false,
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  // updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  textAlign,
  color,
  textStyle,
  highlight,
  underline,
];
