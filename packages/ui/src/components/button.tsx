import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive/80 border border-destructive text-destructive-foreground hover:bg-destructive ",
        warning:
          " bg-tag-warning-bg text-tag-warning-text border border-tag-warning-border  hover:bg-tag-warning-bgHover",
        outline:
          "border bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-accent border text-accent-foreground hover:bg-accent/80 ",
        ghost:
          "text-accent-foreground/70 hover:bg-accent hover:text-accent-foreground",
        link: "text-primary/70 underline-offset-4 hover:text-primary  hover:underline",
        success:
          " bg-success/80 hover:bg-success/90 border border-success text-success-foreground ",
        icon: "text-secondary-foreground hover:text-foreground transition-colors bg-transparent",
      },
      size: {
        default: " px-4 py-2 ",
        xs: "h-6 rounded-md px-2 text-xs",
        sm: "h-7 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        iconMd: "h-8 w-8",
        iconSm: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
