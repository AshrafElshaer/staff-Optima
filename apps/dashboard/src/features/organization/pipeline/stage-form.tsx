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
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Loader } from "lucide-react";
import type { z } from "zod";
import {
  createApplicationStageAction,
  updateApplicationStageAction,
} from "../organization.actions";

const DEFAULT_STAGE_DATA = {
  title: "",
  description: "",
  indicator_color: "#FFFFFF",
  stage_order: "1",
};
export function StageForm() {
  const { addNodes, addEdges, getNodes, getEdges, updateNode, setNodes } =
    useReactFlow();

  const nodes = getNodes();
  const edges = getEdges();
  const selectedStage = useStagesStore((store) => store.selectedStage);
  const stageData = {
    ...selectedStage?.data,
    stage_order: selectedStage?.data?.stage_order,
  } as z.infer<typeof pipelineStageSchema>;

  const { execute: createApplicationStage, isExecuting: isCreating } =
    useAction(createApplicationStageAction, {
      onSuccess: ({ data }) => {
        if (!data?.id) return;
        const node = {
          id: data.id,
          type: "stageNode",
          position: { x: 0, y: (data.stage_order - 1) * 250 },
          data: data,
        };
        addNodes(node);
        toast.success("Stage created successfully");

        form.reset({
          ...DEFAULT_STAGE_DATA,
          stage_order: `${data.stage_order + 1}`,
        });

        const nodes = getNodes();
        const previousStage = nodes.at(-1);

        if (!previousStage) return;
        const edge = {
          id: `e${previousStage.id}-${data.id}`,
          source: previousStage.id,
          target: data.id,
          // type: "stageEdge",
        };
        addEdges(edge);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    });

  const { execute: updateApplicationStage, isExecuting: isUpdating } =
    useAction(updateApplicationStageAction, {
      onSuccess: ({ data }) => {
        toast.success("Stage updated successfully");
        if (!data?.id) return;
        updateNode(data.id!, {
          data: data,
        });
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    });

  const form = useForm<z.infer<typeof pipelineStageInsertSchema>>({
    resolver: zodResolver(pipelineStageInsertSchema),
    defaultValues: {
      ...stageData,
      stage_order: String(stageData?.stage_order) ?? `${nodes.length + 1}`,
    },
  });

  useEffect(() => {
    if (selectedStage) {
      form.reset({
        ...stageData,
        stage_order: String(stageData.stage_order),
      });
    } else {
      const nodes = getNodes();
      const nextStageOrder = nodes.length === 0 ? 1 : nodes.length + 1;
      form.reset({
        ...DEFAULT_STAGE_DATA,
        stage_order: `${nextStageOrder}`,
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
    if (selectedStage?.data.id) {
      updateApplicationStage({
        ...data,
        id: selectedStage.data.id as string,
      });
    }
  }

  async function handleAddStage({
    title,
    description,
    indicator_color,
    stage_order,
  }: z.infer<typeof pipelineStageInsertSchema>) {
    createApplicationStage({
      title,
      description,
      indicator_color,
      stage_order: stage_order,
    });
  }

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
      <Button
        type="submit"
        variant={"secondary"}
        disabled={isCreating || isUpdating}
        className="w-full mt-auto"
      >
        {isCreating || isUpdating ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : null}
        {selectedStage ? "Save" : "Create"}
      </Button>
    </form>
  );
}
