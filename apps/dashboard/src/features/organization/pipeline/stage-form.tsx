import { useStagesStore } from "@/stores/stages-pipeline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  pipelineStageInsertSchema,
  type pipelineStageSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/button";
import { ColorPicker } from "@optima/ui/color-picker";
import { Input } from "@optima/ui/input";
import { Label } from "@optima/ui/label";
import { Textarea } from "@optima/ui/textarea";
import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { parseColor } from "react-stately";

import type { z } from "zod";

const DEFAULT_STAGE_DATA = {
  title: "",
  description: "",
  indicator_color: "#FFFFFF",
  stage_order: "1",
};

export function StageForm() {
  const { addNodes, addEdges, getNodes, getEdges, updateNode, setNodes } =
    useReactFlow();
  const selectedStage = useStagesStore((store) => store.selectedStage);
  const nodes = getNodes();
  const edges = getEdges();

  const stageData = {
    ...selectedStage?.data,
    stage_order: selectedStage?.data?.stage_order,
  } as z.infer<typeof pipelineStageSchema>;

  const form = useForm<z.infer<typeof pipelineStageInsertSchema>>({
    resolver: zodResolver(pipelineStageInsertSchema),
    defaultValues: stageData ?? {
      ...DEFAULT_STAGE_DATA,
      stage_order: `${nodes.length + 1}`,
    },
  });

  useEffect(() => {
    if (selectedStage) {
      form.reset(stageData);
    } else {
      form.reset({
        ...DEFAULT_STAGE_DATA,
        stage_order: `${nodes.length + 1}`,
      });
    }
  }, [selectedStage]);

  const onSubmit = (data: z.infer<typeof pipelineStageInsertSchema>) => {
    if (selectedStage?.id) {
      handleUpdate(data);
    } else {
      handleAddStage(data);
    }
  };

  function handleUpdate(data: z.infer<typeof pipelineStageInsertSchema>) {
    if (selectedStage?.id) {
      updateNode(selectedStage.id, {
        data: data,
      });

      console.log(nodes)
    }
  }

  const handleAddStage = ({
    title,
    description,
    indicator_color,
    stage_order,
    next_stage_id,
  }: z.infer<typeof pipelineStageInsertSchema>) => {
    const previous_stage_id = nodes.find(
      (stage) => stage.data.next_stage_id === undefined,
    )?.id;

    const newStageId = window.crypto.randomUUID();
    const newNode = {
      id: newStageId,
      type: "stageNode",
      position: { x: 0, y: nodes.length * 200 },
      data: {
        title,
        description,
        indicator_color,
        stage_order: Number(stage_order),
        next_stage_id,
        previous_stage_id,
      },
      deletable: false,
    };

    const updatedNodes = [...nodes, newNode];

    if (previous_stage_id) {
      // Update the previous node's next_stage_id
      const updatedNodesWithPrevious = updatedNodes.map((node) =>
        node.id === previous_stage_id
          ? {
              ...node,
              data: { ...node.data, next_stage_id: newStageId },
            }
          : node,
      );

      // Create the edge
      const newEdge = {
        id: `e${previous_stage_id}-${newStageId}`,
        source: previous_stage_id,
        target: newStageId,
        animated: true,
        type: "stageEdge",
      };
      setNodes(updatedNodesWithPrevious);
      // addNodes(newNode); // Add the new node
      addEdges(newEdge); // Add the edge
    } else {
      // If no previous stage, just add the node
      addNodes(newNode);
    }

    form.reset({
      ...DEFAULT_STAGE_DATA,
      stage_order: `${nodes.length + 1}`,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1  flex flex-col gap-4    "
    >
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          {...form.register("title")}
          // value={form.watch("title")}
          placeholder="Applied , Interviewed , etc"
          error={form.formState.errors.title?.message}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          {...form.register("description")}
          // value={form.watch("description")}
          placeholder="Small description about the stage"
          error={form.formState.errors.description?.message}
        />
      </div>

      <div className="space-y-2">
        <Label>Stage Order</Label>
        <Input
          {...form.register("stage_order")}
          type="number"
          placeholder="1, 2, 3, etc"
          error={form.formState.errors.stage_order?.message}
        />
      </div>

      <ColorPicker
        value={form.watch("indicator_color") ?? stageData?.indicator_color}
        onChange={(color) => {
          form.setValue("indicator_color", color);
        }}
        label="Indicator Color"
        className="justify-start"
      />
      {form.formState.errors.indicator_color && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.indicator_color.message}
        </p>
      )}
      <Button type="submit" variant={"secondary"} className="w-full mt-auto">
        {selectedStage ? "Save" : "Create"}
      </Button>
    </form>
  );
}
