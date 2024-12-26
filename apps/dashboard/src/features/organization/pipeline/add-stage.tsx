"use client";
import { Button } from "@optima/ui/button";
import { useReactFlow } from "@xyflow/react";

export function AddStage() {
  const { addNodes, addEdges, getNodes, getEdges, fitView, setCenter } =
    useReactFlow();

  const nodes = getNodes();
  const edges = getEdges();
  const handleAddStage = () => {
    addNodes({
      id: `${nodes.length + 1}`,
      type: "stageNode",
      position: { x: 0, y: nodes.length * 200 },
      data: {
        title: "Stage 1",
        description: "Description 1",
        indicator: "#fff",
        stageOrder: nodes.length + 1,
      },
      deletable: false,
    });

    addEdges({
      id: `${nodes.length + 1}`,
      source: `${nodes.length}`,
      target: `${nodes.length + 1}`,
      animated: true,
      type: "stageEdge",
    });

  };
  return (
    <div className="flex justify-end">
      <Button onClick={handleAddStage}>Add Stage</Button>
    </div>
  );
}
