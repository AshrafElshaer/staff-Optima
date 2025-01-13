"use client";

import Link from "next/link";
import type * as React from "react";

import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";
import { useIsMobile } from "@optima/ui/hooks";
import { Icons } from "@optima/ui/icons";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row sm:items-center space-y-10 sm:space-y-0 fixed top-4 left-4 right-4 z-50  max-w-3xl mx-auto px-4 py-3 rounded-md border bg-accent transition-all duration-300 h-12",
        !isMobile && "divide-x",
        isMobileMenuOpen && "h-[95vh] ",
      )}
    >
      <div className="flex items-center justify-between w-full sm:w-fit">
        <Link href="/" className="cursor-pointer">
          <Icons.Logo />
        </Link>
        <MobileMenuOpen
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
        />
      </div>
      <div className="items-center w-full hidden sm:flex">
        <Button
          variant="ghost"
          onClick={() => {
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
          onClick={() => {
            if (pathname === "/") {
              scrollToSection("pricing");
            } else {
              router.push("/");
              setTimeout(() => {
                scrollToSection("pricing");
              }, 50);
            }
          }}
        >
          Pricing
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            router.push("/updates");
          }}
        >
          Updates
        </Button>
        <Separator orientation="vertical" className="ml-auto h-8" />
        <Button variant="ghost" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </div>

      <div
        className={cn(
          "opacity-0  flex flex-col sm:hidden flex-1 divide-y",
          isMobileMenuOpen && "opacity-100",
        )}
      >
        <Button
          variant="ghost"
          className="w-full justify-start text-lg py-8"
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
          className="w-full justify-start text-lg py-8"
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
        <Link href="/updates">
          <Button
            variant="ghost"
            className="w-full justify-start text-lg py-8"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/updates");
            }}
          >
            Updates
          </Button>
        </Link>

        <Button className="w-full justify-start mt-auto" size="lg">
          Sign In
        </Button>
      </div>
    </nav>
  );
}

import { scrollToSection } from "@/lib/scroll-to-section";
import { Separator } from "@optima/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function MobileMenuOpen({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="group ml-auto sm:hidden "
      onClick={() => setIsOpen((prevState) => !prevState)}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
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
