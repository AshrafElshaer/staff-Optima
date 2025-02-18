"use client";
import type { CandidateWithApplication } from "@optima/supabase/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@optima/ui/sheet";
import { CandidateCard } from "./candidate-card";
import { useState } from "react";

export function CandidateSheet({
  candidate,
}: { candidate: CandidateWithApplication }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <CandidateCard candidate={candidate} setOpen={setOpen} />
      </SheetTrigger>
      <SheetContent className="max-w-[800px]">
        <SheetHeader>
          <SheetTitle>{candidate.first_name}</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
