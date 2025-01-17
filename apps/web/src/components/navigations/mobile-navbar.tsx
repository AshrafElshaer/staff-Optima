import { scrollToSection } from "@/lib/scroll-to-section";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import { Icons } from "@optima/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@optima/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger>
        <MobileMenuOpen />
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
            className="w-full justify-start text-lg py-6"
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
            className="w-full justify-start text-lg py-6"
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
            className="w-full justify-start text-lg py-6"
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

function MobileMenuOpen() {
  return (
    <button type="button" className="group ml-auto sm:hidden ">
      <svg
        className="pointer-events-none"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </button>
  );
}
