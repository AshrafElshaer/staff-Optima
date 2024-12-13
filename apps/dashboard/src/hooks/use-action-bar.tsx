import { AlertDiamondIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import type { HookActionStatus } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";
type Props = {
  description?: string;
  onAction: () => void;
  onReset: () => void;
  title?: string;
  isLoading: boolean;
  show: boolean;
  className?: string;
  status?: HookActionStatus;
};

import { Button } from "@optima/ui/button";

export const useActionBar = ({
  onAction,
  onReset,
  title = "Unsaved Changes",
  isLoading,
  show,
  description = "test",
  className,
  status,
}: Props) => {
  const toastId = React.useRef<string | number>("");

  React.useEffect(() => {
    const renderToastContent = (isLoading: boolean) => {
      const ToastContent = () => {
        return (
          <div className="text-foreground bg-secondary w-[22rem] sm:min-w-[24rem] flex items-center gap-2 px-1 py-1 rounded-full border">
            <AlertDiamondIcon
              size={20}
              strokeWidth={2}
              className="text-tag-warning-icon ml-2"
            />
            <span className="font-medium mr-auto">{title} </span>

            <Button
              variant="destructive"
              onClick={async () => {
                await onReset();
              }}
              disabled={isLoading}
              className="rounded-full"
            >
              Reset
            </Button>
            <Button
              variant="success"
              onClick={async () => {
                await onAction();
              }}
              disabled={isLoading}
              className="rounded-full"
            >
              Save
            </Button>
          </div>
        );
      };
      ToastContent.displayName = "ToastContent";
      return ToastContent;
    };

    if (show) {
      if (!toastId.current) {
        toastId.current = toast.custom(renderToastContent(isLoading), {
          position: "bottom-center",
          duration: Number.POSITIVE_INFINITY,
          dismissible: false,
          unstyled: true,
        });
      } else {
        toast.custom(renderToastContent(isLoading), {
          id: toastId.current,
        });
      }
    } else if (toastId.current) {
      toast.dismiss(toastId.current);
      toastId.current = "";
    }
  }, [
    show,
    isLoading,
    onAction,
    onReset,
    description,
    title,
    className,
    status,
  ]);
};
