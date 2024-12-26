"use client";
import { Button } from "@optima/ui/button";

import { useStagesStore } from "@/stores/stages-pipeline";
import {
  Background,
  Controls,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnSelectionChangeFunc,
  Panel,
  PanelPosition,
  ReactFlow,
  type UseOnSelectionChangeOptions,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import { useCallback, useMemo, useState } from "react";
import { ActionPanel } from "./action-panel";
import { AddStage } from "./add-stage";
import { StageEdge } from "./stage-edge";
import { StageNode } from "./stage-node";

const initialNodes = [
  {
    id: "7b96d954-98cd-4da7-88dc-c1578dc1c7de",
    type: "stageNode",
    deletable: false,
    position: { x: 0, y: 0 },
    data: {
      title: "Application Review",
      description: "Initial screening of candidate applications and resumes",
      indicator_color: "#4F46E5",
      stage_order: 1,
      next_stage_id: "1b462a3b-b0ea-4e2d-95b1-e05af0e4bf94",
    },
  },
  {
    id: "1b462a3b-b0ea-4e2d-95b1-e05af0e4bf94",
    type: "stageNode",
    deletable: false,
    position: { x: 0, y: 250 },
    data: {
      title: "Phone Screen",
      description:
        "Brief phone interview to assess basic qualifications and interest",
      indicator_color: "#10B981",
      stage_order: 2,
      previous_stage_id: "7b96d954-98cd-4da7-88dc-c1578dc1c7de",
    },
  },
];

const initialEdges = [
  {
    id: "e7b96d954-98cd-4da7-88dc-c1578dc1c7de-1b462a3b-b0ea-4e2d-95b1-e05af0e4bf94",
    source: "7b96d954-98cd-4da7-88dc-c1578dc1c7de",
    target: "1b462a3b-b0ea-4e2d-95b1-e05af0e4bf94",
    animated: true,
    type: "stageEdge",
  },
];

export function StagesFlow() {
  const { resolvedTheme = "dark" } = useTheme();
  const setSelectedStage = useStagesStore((store) => store.setSelectedStage);
  const setSelectedEdges = useStagesStore((store) => store.setSelectedEdges);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ stageNode: StageNode }), []);

  // the passed handler has to be memoized, otherwise the hook will not work correctly
  const onChange: OnSelectionChangeFunc = useCallback(({ nodes, edges }) => {
    setSelectedStage(nodes[0] as Node);
    setSelectedEdges(edges[0] as Edge);
  }, []);
  useOnSelectionChange({
    onChange,
  });

  return (
    <>
      <ReactFlow
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        className="border rounded-md"
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        minZoom={0.5}
        maxZoom={1}
        defaultViewport={{
          x: 24,
          y: 24,
          zoom: 0.85,
        }}
      >
        <Background />
        <Controls showInteractive={false} className="react-flow_controls" />
        <ActionPanel />
      </ReactFlow>
    </>
  );
}
