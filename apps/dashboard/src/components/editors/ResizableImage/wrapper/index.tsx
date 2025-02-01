import { cn } from "@optima/ui/cn";
import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import Image from "next/image";
import { Resizable } from "re-resizable";
import type { Direction } from "re-resizable/lib/resizer";
import React, { useState } from "react";

export default function ResizableImageWrapper(props: NodeViewProps) {
  const { selected, editor } = props;
  const defaultWidth = props.node.attrs.width;
  const defaultHeight = props.node.attrs.height;
  const isEditable = editor.isEditable;

  const [margin, setMargin] = useState(props.node.attrs?.alt.split("-")[1]);

  function handleAlign(align: "left" | "right" | "center") {
    const margin =
      align === "left"
        ? "0 auto 0 0"
        : align === "right"
          ? "0 0 0 auto"
          : "0 auto";


    // props.updateAttributes({
    //   alt: `${props.node.attrs.alt.split("-")[0]}-${margin}`,
    // });
    // setMargin(margin);
  }

  return (
    <NodeViewWrapper className="image-resizer">
      <div
        className={cn(
          "flex items-center justify-center bg-accent w-fit p-2 gap-2 rounded-md border opacity-0 mb-4",
          selected && "opacity-100",
          !isEditable && "hidden",
        )}
        style={{
          margin: margin,
        }}
      >
        <button
          className="arrow-button"
          onClick={() => handleAlign("left")}
          type="button"
        >
          <AlignLeftIcon size={16} />
        </button>

        <button
          className="arrow-button"
          onClick={() => handleAlign("center")}
          type="button"
        >
          <AlignCenterIcon size={16} />
        </button>
        <button
          className="arrow-button"
          onClick={() => handleAlign("right")}
          type="button"
        >
          <AlignRightIcon size={16} />
        </button>
      </div>
      <Resizable
        enable={
          isEditable
            ? {
                top: true,
                right: true,
                bottom: true,
                left: true,
                bottomLeft: true,
                bottomRight: true,
                topLeft: true,
                topRight: true,
              }
            : false
        }
        className={cn("resizable-image")}
        defaultSize={{
          width: defaultWidth ? defaultWidth : "300",
          height: defaultHeight ? defaultHeight : "300",
        }}
        onResize={(
          e: MouseEvent | TouchEvent,
          direction: Direction,
          ref: HTMLElement,
        ) => {
          props.updateAttributes({
            width: ref.style.width,
            height: ref.style.height,
          });
        }}
        maxWidth={"100%"}
        style={{
          margin: margin,
        }}
        lockAspectRatio={true}
        handleStyles={{
          left: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "1px",
          },
          top: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            height: "1px",
          },
          right: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "1px",
          },
          bottom: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            height: "1px",
          },
          bottomRight: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          },
          bottomLeft: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          },
          topRight: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          },
          topLeft: {
            display: selected ? "block" : "none",
            backgroundColor: "hsl(var(--primary)/0.5)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          },
        }}
      >
        <Image
          src={props.node.attrs.src}
          alt={props.node.attrs.alt}
          layout="fill"
          objectFit="contain"
          style={{
            margin: margin,
          }}
        />
      </Resizable>
    </NodeViewWrapper>
  );
}
