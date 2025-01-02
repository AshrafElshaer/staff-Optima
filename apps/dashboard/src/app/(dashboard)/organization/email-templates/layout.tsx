"use client";
import { Button } from "@optima/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optima/ui/dialog";
import { useMediaQuery } from "usehooks-ts";

export default function EmailTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      {(isMobile || isTablet) && (
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Desktop View Recommended</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              The email template editor works best on desktop devices for
              optimal editing experience. While you can continue on your current
              device, some features may be limited or harder to use.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default">Continue Anyway</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {children}
    </>
  );
}
