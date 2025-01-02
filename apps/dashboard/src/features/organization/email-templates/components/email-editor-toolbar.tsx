"use client";

import { Button } from "@optima/ui/button";
import { Card } from "@optima/ui/card";
import { ColorPicker } from "@optima/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@optima/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@optima/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@optima/ui/tooltip";
import {
  Image02Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  TextIcon,
} from "hugeicons-react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  Link,
  LinkIcon,
  ListTodoIcon,
  Minus,
  MinusIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";

const fontSizeOptions = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64];

export function EmailEditorToolbar() {
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#ff0000");
  const [backgroundColor, setBackgroundColor] = useState("");
  return (
    <div className="h-full w-80  flex flex-col gap-2">
      <Card className="p-2 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium w-fit">Font size</span>
          <Select
            value={fontSize.toString()}
            onValueChange={(value) => setFontSize(Number.parseInt(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="16" />
            </SelectTrigger>
            <SelectContent className="!min-w-20" align="end">
              {fontSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <TooltipProvider delayDuration={0}>
            <ToggleGroup type="multiple" defaultValue={["bold"]}>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="bold">
                    <BoldIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="italic">
                    <ItalicIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="underline">
                    <UnderlineIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="strike">
                    <StrikethroughIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Strikethrough</TooltipContent>
              </Tooltip>
            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="left">
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="left">
                    <AlignLeftIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Align left</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="center">
                    <AlignCenterIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Align center</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="right">
                    <AlignRightIcon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Align right</TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </TooltipProvider>
        </div>
      </Card>
      {/* <Card className="p-2 ">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium w-fit">Color</span>
          <div className="flex items-center gap-2 p-2  ">
            <ColorPicker
              className="w-fit"
              value={color}
              onChange={(color) => {
                setColor(color);
              }}
            />
            {color}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium w-fit">Background </span>
          <div className="flex items-center gap-2 p-2  ">
            <ColorPicker
              className="w-fit"
              value={backgroundColor || "#000000"}
              onChange={(color) => {
                setBackgroundColor(color);
              }}
            />
            {backgroundColor || "transparent"}
          </div>
        </div>
      </Card> */}
      <Card className="p-2 space-y-4">
        <h4 className="font-medium">Blocks</h4>
        <div className="grid grid-cols-2 gap-2 *:justify-start">
          <Button variant="outline">
            <Image02Icon size={16} strokeWidth={2} />
            Logo
          </Button>
          <Button variant="outline">
            <Image02Icon size={16} strokeWidth={2} />
            Image
          </Button>
          <Button variant="outline">
            <TextIcon size={14} strokeWidth={2} />
            Text
          </Button>
          <Button variant="outline">
            <Heading1Icon size={16} strokeWidth={2} />
            Heading 1
          </Button>
          <Button variant="secondary">
            <Heading2Icon size={16} strokeWidth={2} />
            Heading 2
          </Button>
          <Button variant="outline">
            <Heading3Icon size={16} strokeWidth={2} />
            Heading 3
          </Button>
          <Button variant="outline">
            <LeftToRightListBulletIcon size={16} strokeWidth={2} />
            Bullet list
          </Button>
          <Button variant="outline">
            <LeftToRightListNumberIcon size={14} strokeWidth={2} />
            Num list
          </Button>
          <Button variant="outline">
            <MinusIcon size={16} strokeWidth={2} />
            Divider
          </Button>
          <Button variant="outline">
            <LinkIcon size={14} strokeWidth={2} />
            Button
          </Button>
          <Button variant="outline">
            <QuoteIcon size={14} strokeWidth={2} />
            Quote
          </Button>
          <Button variant="outline">
            <ListTodoIcon size={16} strokeWidth={2} />
            Todo list
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Dependencies: pnpm install lucide-react
