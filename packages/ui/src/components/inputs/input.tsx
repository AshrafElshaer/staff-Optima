import type * as React from "react";

import { cn } from "../../utils";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
};

const Input = ({
  className,
  type,
  startIcon,
  endIcon,
  error,
  wrapperClassName,
  ...props
}: InputProps) => {
  return (
    <div className={cn(" space-y-2 w-full ")}>
      <div
        className={cn(
          "flex items-center rounded-md border relative overflow-hidden",
          error && "border-destructive",
          "focus-within:ring-1 focus-within:ring-ring/70 has-[input:focus-visible]:ring-1 has-[input:focus-visible]:ring-ring/70",
          wrapperClassName,
        )}
      >
        <input
          type={type}
          className={cn(
            "w-full h-9 rounded-md bg-secondary px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm peer/input",
            startIcon && "ps-10",
            endIcon && "pe-10",
            className,
          )}
          {...props}
        />
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50 peer-focus/input:text-foreground/70">
            {startIcon}
          </div>
        )}
        {endIcon && (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50 peer-focus/input:text-foreground/70">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { Input, type InputProps };
