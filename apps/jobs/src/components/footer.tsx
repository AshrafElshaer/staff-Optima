import { buttonVariants } from "@optima/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background w-full p-2 border-t flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Powerd By</p>
      <Link
        href="https://staffoptima.co"
        className={buttonVariants({ variant: "link", className: "font-bold" })}
        target="_blank"
      >
        Staff Optima
      </Link>
    </footer>
  );
}
