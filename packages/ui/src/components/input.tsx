import type * as React from "react";

import { cn } from "../utils";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
};

const Input = ({
  className,
  type,
  startIcon,
  endIcon,
  error,
  ...props
}: InputProps) => {
  return (
    <div className=" space-y-2 w-full ">
      <div
        className={cn(
          "flex items-center rounded-md border relative ",
          error && "border-destructive",
        )}
      >
        <input
          type={type}
          className={cn(
            "w-full h-9 rounded-md bg-secondary px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm peer/input",
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

const UrlInput = ({ error, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input {...props} className="peer ps-16" type="text" />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-secondary-foreground peer-disabled:opacity-50">
          https://
        </span>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export { Input, UrlInput };
