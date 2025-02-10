import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../utils";

const badgeVariants = cva(
  "flex items-center rounded-full w-fit border   font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border bg-secondary !text-foreground hover:bg-secondary/80",
        destructive:
          "border-tag-red-border bg-tag-red-bg !text-tag-red-text hover:bg-tag-red-bgHover",
        info: "border-tag-blue-border bg-tag-blue-bg !text-tag-blue-text hover:bg-tag-blue-bgHover",
        feature:
          "border-tag-purple-border bg-tag-purple-bg !text-tag-purple-text hover:bg-tag-purple-bgHover",
        success:
          "border-tag-success-border bg-tag-success-bg !text-tag-success-text hover:bg-tag-success-bgHover",
        warning:
          "border-tag-warning-border bg-tag-warning-bg !text-tag-warning-text hover:bg-tag-warning-bgHover",
      },
      size: {
        sm: " text-compact-xsmall px-2 py-1",
        default: "text-compact-small px-2.5 py-1",
        md: "text-compact-medium px-3 py-1.5",
        lg: " text-compact-xlarge px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
