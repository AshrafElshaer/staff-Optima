"use client";
import { Button } from "@optima/ui/button";
import { Separator } from "@optima/ui/separator";
import { AlertDiamondIcon } from "hugeicons-react";
import type { HookActionStatus, UseActionHookReturn} from "next-safe-action/hooks";
type OnEditToastProps = {
  id: string | number;
  message: string;
  actionLabel: string;
  cancelLabel: string;
  action: () => void;
  cancel: () => void;
  status: HookActionStatus;

};
export function OnEditToast({
  id,
  message,
  action,
  cancel,
  actionLabel,
  cancelLabel,
  status,
}: OnEditToastProps) {


    return (
      <div className="text-foreground bg-secondary w-[22rem] sm:min-w-[24rem] flex items-center gap-2 px-1 py-1 rounded-full border">
        <AlertDiamondIcon
          size={20}
          strokeWidth={2}
          className="text-tag-warning-icon ml-2"
        />
        <span className="font-medium mr-auto">{message} </span>
        <Separator orientation="vertical" className="self-stretch" />

        <Button variant="success" onClick={action} className="rounded-full">
          {actionLabel}
        </Button>
        <Button variant="destructive" onClick={cancel} className="rounded-full">
          {cancelLabel}
        </Button>
      </div>
    );
  }

