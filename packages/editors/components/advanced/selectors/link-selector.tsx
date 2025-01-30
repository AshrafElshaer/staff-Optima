import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@optima/ui/popover";
import { Link04Icon } from "hugeicons-react";
import { Check, Trash } from "lucide-react";
import { useEditor } from "novel";
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useCurrentEditor } from "@tiptap/react";
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: "sm" | "lg" | "icon" | "default";
}

export const LinkSelector = ({
  open,
  onOpenChange,
  size = "sm",
}: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useCurrentEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size={size}
          variant="ghost"
          className="gap-1 rounded-none border-none"
          disabled={editor.state.selection.empty}
        >
          <Link04Icon size={16} />
          <p
            className={cn("", {
              "text-blue-500": editor.isActive("link"),
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement;
            e.preventDefault();
            const input = target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
              onOpenChange(false);
            }
          }}
          className="flex  p-1 "
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                inputRef.current!.value = "";
                onOpenChange(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="icon"
              className="h-8"
              type="submit"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
