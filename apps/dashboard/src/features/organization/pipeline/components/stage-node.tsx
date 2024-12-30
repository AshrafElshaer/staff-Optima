import type { ApplicationStage } from "@optima/supabase/types";
import type { pipelineStageSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";
import {
  Handle,
  type Node,
  type NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Delete01Icon } from "hugeicons-react";
import { ArrowUpDownIcon, Sparkle, Sparkles, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import type { z } from "zod";
import {
  deleteApplicationStageAction,
  reorderApplicationStagesAction,
} from "../stages-pipeline.actions";
import { DeleteStage } from "./delete-stage";
import { ReorderStages } from "./reorder-stages";

export type StageNode = Node<z.infer<typeof pipelineStageSchema>, "stageNode">;

export function StageNode(props: NodeProps<StageNode>) {
  const { data, selected } = props;
  const { title, description, indicator_color, stage_order, id } = data;
  const { setNodes, setEdges, getNodes } = useReactFlow();

  const { executeAsync: deleteApplicationStage, isExecuting: isDeleting } =
    useAction(deleteApplicationStageAction, {
      onSuccess: ({ data }) => {
        setNodes((nodes) =>
          nodes
            .filter((node) => node.id !== id)
            .map((node, idx) => ({
              ...node,
              position: { x: 0, y: idx * 250 },
            })),
        );
        if (data) {
          setEdges(
            data.map((stage, idx) => ({
              id: `e${stage.id}-${data[idx + 1]?.id}`,
              source: stage.id,
              target: data[idx + 1]?.id ?? "rejected",
              // animated: true,
              // type: "stageEdge",
            })),
          );
        }
      },
    });







  return (
    <>
      <div
        className={cn(
          "p-4 space-y-2 w-[30rem]   outline outline-1 outline-border rounded-md bg-background nodrag relative",
          selected && "outline-primary/70",
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
          <ReorderStages stage_order={stage_order} id={id} />
          <DeleteStage stage={data as unknown as ApplicationStage} />
        </div>

        <p className=" text-secondary-foreground">{description}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </>
  );
}
