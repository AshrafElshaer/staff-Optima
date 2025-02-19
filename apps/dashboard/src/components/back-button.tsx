"use client";

import { Button } from "@optima/ui/button";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
export function BackButton({
  className,
  href,
}: {
  className?: string;
  href?: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => (href ? router.push(href) : router.back())}
      variant="outline"
      className={className}
      type="button"
    >
      <ArrowLeft01Icon strokeWidth={2} size={16} /> <span>Back</span>
    </Button>
  );
}
