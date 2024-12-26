import * as React from "react";

import { cn } from "../utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { error?: string }
>(({ className, error, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border  bg-secondary px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          error && "focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
