import { cn } from "@optima/ui/cn";

export function PageTitle({
  title,
  className,
}: { title: string; className?: string }) {
  return (
    <h4 className={cn("font-semibold w-full lg:w-3/5 ", className)}>{title}</h4>
  );
}
