import type { HookActionStatus } from "next-safe-action/hooks";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ToastConfig {
  position?: "bottom-center" | "top-center" | "top-right" | "bottom-right";
  duration?: number;
  dismissible?: boolean;
  unstyled?: boolean;
}

interface UseActionBarProps {
  show: boolean;
  ToastContent: (props: { toastId: string | number }) => ReactElement;
  toastConfig?: ToastConfig;
}

const DEFAULT_TOAST_CONFIG: ToastConfig = {
  position: "bottom-center",
  duration: Number.POSITIVE_INFINITY,
  dismissible: false,
  unstyled: true,
};

export function useActionBar({
  show,
  ToastContent,
  toastConfig = DEFAULT_TOAST_CONFIG,
}: UseActionBarProps) {
  const toastId = useRef<string | number>("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (show) {
      const renderToast = () => {
        if (!toastId.current) {
          toastId.current = crypto.randomUUID();
        }
        return <ToastContent toastId={toastId.current} />;
      };

      if (isFirstRender.current || !toastId.current) {
        toastId.current = toast.custom(renderToast, {
          ...DEFAULT_TOAST_CONFIG,
          ...toastConfig,
        });
        isFirstRender.current = false;
      } else {
        toast.custom(renderToast, {
          id: toastId.current,
          ...toastConfig,
        });
      }
    } else {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = "";
        isFirstRender.current = true;
      }
    }
  }, [show, ToastContent, toastConfig]);

  return {
    toastId: toastId.current,
    dismissToast: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = "";
        isFirstRender.current = true;
      }
    },
  };
}
