import type { pipelineStageSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
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
import { deleteApplicationStageAction } from "../organization.actions";

export type StageNode = Node<z.infer<typeof pipelineStageSchema>, "stageNode">;

export function StageNode(props: NodeProps<StageNode>) {
  const { data, selected } = props;
  const { title, description, indicator_color, stage_order, id } = data;
  const { setNodes, setEdges, addEdges } = useReactFlow();

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

  function handleDelete() {
    toast.promise(deleteApplicationStage({ id }), {
      loading: "Deleting stage...",
      success: "Stage deleted successfully",
      error: ({ error }) => error.serverError,
    });
  }

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
          <Button variant="icon" size="icon" disabled={isDeleting}>
            <ArrowUpDownIcon size={18} />
          </Button>
          <Button
            variant="icon"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
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
