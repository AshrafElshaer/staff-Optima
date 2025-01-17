"use client";

import Link from "next/link";
import type * as React from "react";

import { scrollToSection } from "@/lib/scroll-to-section";
import { Button } from "@optima/ui/button";
import { cn } from "@optima/ui/cn";

import { Icons } from "@optima/ui/icons";
import { Separator } from "@optima/ui/separator";
import { usePathname, useRouter } from "next/navigation";

import { MobileNavbar } from "./mobile-navbar";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row sm:items-center space-y-10 sm:space-y-0 fixed top-4 left-4 right-4 z-50  max-w-3xl mx-auto px-4 py-3 rounded-md border bg-accent transition-all duration-300 h-12",
      )}
    >
      <div className="flex items-center justify-between w-full sm:w-fit">
        <Link href="/" className="cursor-pointer">
          <Icons.Logo />
        </Link>
        <MobileNavbar />
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
        <Button
          variant="ghost"
          onClick={() => {
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
    </nav>
  );
}
