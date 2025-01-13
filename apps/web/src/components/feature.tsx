import type { HugeiconsProps } from "hugeicons-react";
import type { FC, RefAttributes } from "react";
import { TextAnimate } from "./text-animation";

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

        <TextAnimate
          animation="blurInUp"
          by="character"
          className="text-3xl font-bold"
          once
        >
          {title}
        </TextAnimate>
      </div>
      <p className="text-lg text-secondary-foreground">
        <TextAnimate animation="fadeIn" by="word" delay={2} once>
          {description}
        </TextAnimate>
      </p>
    </div>
  );
}
