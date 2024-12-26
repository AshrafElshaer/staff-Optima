import type { pipelineStageSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import {
  Handle,
  type Node,
  type NodeProps,
  NodeToolbar,
  Position,
} from "@xyflow/react";
import { Delete01Icon } from "hugeicons-react";
import { ArrowUpDownIcon, Sparkle, Sparkles, Trash } from "lucide-react";
import type { z } from "zod";

export type StageNode = Node<z.infer<typeof pipelineStageSchema>, "stageNode">;

export function StageNode(props: NodeProps<StageNode>) {
  const { data, selected } = props;
  const { title, description, indicator_color, stage_order, id } = data;

  return (
    <>
      <div
        className={cn(
          "p-4 space-y-2 w-[30rem]   border rounded-md bg-background nodrag relative",
          selected && "border-primary/70",
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-5 rounded-sm bg-[${indicator_color}]`}
            style={{
              backgroundColor: indicator_color,
            }}
          />
          <p className="font-semibold flex-1">{title}</p>
          <Button
            variant="icon"
            size="icon"

          >
            <ArrowUpDownIcon size={18} />
          </Button>
          <Button
            variant="icon"
            size="icon"

          >
            <Delete01Icon size={18} />
          </Button>
        </div>

        <p className=" text-secondary-foreground">{description}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </>
  );
}
