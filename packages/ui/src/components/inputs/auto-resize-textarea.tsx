"use client";

import type { ChangeEvent, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { Textarea } from "../textarea";

interface AutoResizeTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function AutoResizeTextArea({
  onChange,
  className,
  ...props
}: AutoResizeTextAreaProps) {
  const defaultRows = 1;
  const maxRows = undefined; // You can set a max number of rows

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    onChange?.(e);
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      Number.parseInt(style.borderTopWidth) +
      Number.parseInt(style.borderBottomWidth);
    const paddingHeight =
      Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom);

    const lineHeight = Number.parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Number.POSITIVE_INFINITY;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <Textarea
      placeholder="Leave a comment"
      onChange={handleInput}
      rows={defaultRows}
      className={cn("min-h-[none] !resize-none", className)}
      {...props}
    />
  );
}
