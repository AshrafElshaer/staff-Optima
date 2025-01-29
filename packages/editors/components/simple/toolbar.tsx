"use client";

import { Separator } from "@optima/ui/separator";
import { useState } from "react";
import { ColorSelector } from "../advanced/selectors/color-selector";
import { LinkSelector } from "../advanced/selectors/link-selector";
import { NodeSelector } from "../advanced/selectors/node-selector";
import { TextButtons } from "../advanced/selectors/text-buttons";

export function SimpleToolbar() {
  const [open, setOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  return (
    <div className="flex items-center w-full border-b  overflow-x-auto">
      <NodeSelector open={open} onOpenChange={setOpen} size="default" />
      <Separator orientation="vertical" className="h-9" />
      <TextButtons size="default" />
      <Separator orientation="vertical" className="h-9" />
      <LinkSelector open={linkOpen} onOpenChange={setLinkOpen} size="default" />
      <Separator orientation="vertical" className="h-9" />
      <ColorSelector
        open={colorOpen}
        onOpenChange={setColorOpen}
        size="default"
      />
      <Separator orientation="vertical" className="h-9" />
    </div>
  );
}
