"use client";

import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useForwardedRef } from "../hooks/use-forward-ref";
import { cn } from "../utils";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> &
    ColorPickerProps & {
      label: string;
    }
>(
  (
    { disabled, value, onChange, onBlur, name, className, label, ...props },
    forwardedRef,
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <button
            {...props}
            className={cn(" w-full flex items-center gap-2 ", className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
          >
            <div
              className={"size-5 rounded-sm"}
              style={{
                backgroundColor: parsedValue,
              }}
            />
            <p>{label}</p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-48">
          <HexColorPicker
            color={parsedValue}
            onChange={onChange}
            className="p-0 !w-48"
          />
          <Input
            maxLength={7}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
