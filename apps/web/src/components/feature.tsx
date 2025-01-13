import type { HugeiconsProps } from "hugeicons-react";
import type { FC, RefAttributes } from "react";


export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Feature({ title, description, icon }: FeatureProps) {
  const Icon = icon;
  return (
    <div className="space-y-8 py-12">
      <div className="flex items-center gap-2">
        {icon}

        <p className="text-3xl font-bold">{title}</p>
      </div>
      <p className="text-lg text-secondary-foreground">{description}</p>
    </div>
  );
}
