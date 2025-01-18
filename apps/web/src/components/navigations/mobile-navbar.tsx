import { scrollToSection } from "@/lib/scroll-to-section";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import { Icons } from "@optima/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@optima/ui/sheet";

import { Menu03Icon } from "hugeicons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger className=" ml-auto sm:hidden">
        <Menu03Icon size={20} />
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-4">
            <Icons.Logo /> Staff Optima
          </SheetTitle>
        </SheetHeader>
        <div className={cn("  flex flex-col flex-1 divide-y")}>
          <Button
            variant="ghost"
            className="w-full justify-start text-lg py-6 rounded-none"
            size="lg"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (pathname === "/") {
                scrollToSection("features");
              } else {
                router.push("/");
                setTimeout(() => {
                  scrollToSection("features");
                }, 50);
              }
            }}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-lg py-6 rounded-none"
            size="lg"
            onClick={() => {
              if (pathname === "/") {
                scrollToSection("pricing");
              } else {
                router.push("/");
                setTimeout(() => {
                  scrollToSection("pricing");
                }, 50);
              }
              setIsMobileMenuOpen(false);
            }}
          >
            Pricing
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-lg py-6 rounded-none"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/updates");
            }}
          >
            Updates
          </Button>
          <div className="p-4 mt-auto">
            <Button
              className="w-full justify-start mt-auto"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                const emailInput = document.getElementById("waitlist-email");
                if (emailInput) {
                  scrollToSection("hero").then(() => {
                    setTimeout(() => {
                      emailInput.focus();
                    }, 100);
                  });
                }
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
