"use client";
import { Label } from "@optima/ui/label";
import { Switch } from "@optima/ui/switch";
import { useId, useState } from "react";

type IntegrationSwitchProps = {
  name: string;
  description: string;
  status: "connected" | "disconnected";
  icon: React.ReactNode;
};

export default function IntegrationSwitch({
  name,
  description,
  status,
  icon,
}: IntegrationSwitchProps) {
  const id = useId();
  const [isChecked, setIsChecked] = useState(status === "connected");
  return (
    <div className="relative flex w-full items-start gap-2 rounded-lg border  p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring/50">
      <Switch
        id={id}
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
        aria-describedby={`${id}-description`}
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
      <div className="flex grow items-start gap-3">
        {icon}
        <div className="grid grow gap-2">
          <Label htmlFor={id} className="text-lg font-semibold">
            {name}
            {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
              (Sublabel)
            </span> */}
          </Label>
          <p
            id={`${id}-description`}
            className="text text-secondary-foreground"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
