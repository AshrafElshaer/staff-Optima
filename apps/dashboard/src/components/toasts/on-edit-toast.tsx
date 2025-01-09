"use client";

import { Button } from "@optima/ui/button";
import { AlertDiamondIcon, CheckmarkCircle03Icon } from "hugeicons-react";
import { Check, Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { HookActionStatus } from "next-safe-action/hooks";

interface OnEditToastProps {
  toastId?: string | number;
  onAction: () => void;
  onReset: () => void;
  status: HookActionStatus;
  error?: string;
}

export function OnEditToast({
  onAction,
  onReset,
  status,
  error,
}: OnEditToastProps) {
  return (
    <div className="text-foreground bg-secondary w-[22rem] sm:min-w-[24rem] flex items-center gap-2 px-1 py-1 rounded-full border overflow-hidden">
      {status === "hasErrored" ? (
        <OnEditToastError error={error} />
      ) : status === "hasSucceeded" ? (
        <OnEditToastSuccess />
      ) : status === "executing" ? (
        <OnEditToastLoading />
      ) : (
        <div className="flex items-center gap-2 w-full">
          <AlertDiamondIcon
            size={20}
            strokeWidth={2}
            className="text-tag-warning-icon ml-2"
          />
          <span className="font-medium mr-auto">Unsaved changes! </span>

          <Button
            variant="destructive"
            onClick={onReset}
            className="rounded-full"
          >
            Reset
          </Button>
          <Button variant="success" onClick={onAction} className="rounded-full">
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

function OnEditToastSuccess() {
  return (
    <div className="py-1 flex items-center gap-2">
      <CheckmarkCircle03Icon className="ml-2 text-tag-success-icon" size={20} />
      <span className="font-medium mr-auto ">Changes saved successfully! </span>
    </div>
  );
}

function OnEditToastError({ error }: { error: string | undefined }) {
  return (
    <div className="py-1 flex items-center gap-2">
      <AlertDiamondIcon
        size={20}
        strokeWidth={2}
        className="text-tag-red-icon ml-2"
      />
      <span className="font-medium mr-auto ">{error}</span>
    </div>
  );
}

function OnEditToastLoading() {
  return (
    <div className="py-1 flex items-center gap-2">
      <Loader className="animate-spin ml-2" size={20} />
      <span className="font-medium mr-auto ">Saving changes ... </span>
    </div>
  );
}
