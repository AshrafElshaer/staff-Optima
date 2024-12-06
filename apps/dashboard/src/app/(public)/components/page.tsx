"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@optima/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@optima/ui/alert";
import { Avatar, AvatarGroup } from "@optima/ui/avatar";
import { Badge } from "@optima/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@optima/ui/breadcrumb";
import { Button } from "@optima/ui/button";
import { Checkbox } from "@optima/ui/checkbox";
import { Icons } from "@optima/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@optima/ui/sheet";
import { Home, User } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  return (
    <div className=" p-4 flex flex-col gap-4 pb-60 max-w-xl mx-auto">
      <ModeToggle />

      <Icons.Logo className="w-10 h-10" />

      <h1 className="text-base">Accordion</h1>
      <Accordion type="single" collapsible className="w-72">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h1 className="text-base">Avatar</h1>
      <section className="flex flex-wrap gap-4 w-fit">
        <Avatar initials="IR" size="large" status="online" />
        <Avatar
          initials="IR"
          src="https://github.com/irsyadadl.png"
          status="away"
        />
        <Avatar
          shape="square"
          initials="IR"
          alt="irsyadadl"
          src="https://github.com/irsyadadl.png"
        />
        <Avatar
          alt="irsyadadl small"
          size="small"
          src="https://github.com/irsyadadl.png"
        />
        <Avatar
          alt="irsyadadl medium"
          size="medium"
          src="https://github.com/irsyadadl.png"
        />
        <Avatar
          alt="irsyadadl large"
          size="large"
          src="https://github.com/irsyadadl.png"
        />
      </section>
      <h1 className="text-base">Badge</h1>
      <section className="flex flex-wrap gap-4 w-fit">
        <Badge>default</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="info">info</Badge>
        <Badge variant="feature">feature</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
      </section>
      <section className="flex flex-wrap gap-4 w-fit">
        <Badge size="sm">default</Badge>
        <Badge size="md" variant="destructive">
          destructive
        </Badge>
        <Badge size="lg" variant="info">
          info
        </Badge>
        <Badge size="lg" variant="feature">
          feature
        </Badge>
        <Badge size="lg" variant="success">
          success
        </Badge>
        <Badge size="lg" variant="warning">
          warning
        </Badge>
      </section>
      <h1 className="text-base">Breadcrumb</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-base">Buttons</h1>
      <section className="flex flex-wrap gap-4 w-fit">
        <Button className="w-fit">
          <Home className="w-4 h-4" />
          default
        </Button>
        <Button variant="destructive">
          <Home className="w-4 h-4" />
          destructive
        </Button>
        <Button variant="outline">
          <Home className="w-4 h-4" />
          outline
        </Button>
        <Button variant="secondary">
          <Home className="w-4 h-4" />
          secondary
        </Button>
        <Button variant="ghost">
          <Home className="w-4 h-4" />
          ghost
        </Button>
        <Button variant="success">
          <Home className="w-4 h-4" />
          success
        </Button>
        <Button variant="warning">
          <Home className="w-4 h-4" />
          warning
        </Button>

        <Button variant="link">
          <Home className="w-4 h-4" />
          link
        </Button>
      </section>
      <h1 className="text-base">Checkbox</h1>
      <section className="flex flex-wrap gap-4 w-fit">
        <Checkbox checked />
        <Checkbox />
      </section>
      <h1 className="text-base">Hover Card</h1>

      <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>

      <h1 className="text-base">Dropdown Menu</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit">Open</DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className="text-base">Dialog</h1>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-base">Alert Dialog</h1>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h1 className="text-base">Sheet</h1>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          <SheetFooter className="mt-auto">
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <h1 className="text-base">Tooltip</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <h1 className="text-base">Alert</h1>
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      <h1 className="text-base">Select</h1>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={() => toast.custom(CustomToast)}>Toast</Button>
    </div>
  );
}
function CustomToast(id: number | string): React.ReactElement {
  return <div >Custom Toast {id}</div>;
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optima/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@optima/ui/alert-dialog";
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
import { HoverCard, HoverCardContent } from "@optima/ui/hover-card";
import { HoverCardTrigger } from "@optima/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@optima/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@optima/ui/tooltip";
import { TooltipProvider } from "@optima/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type * as React from "react";

function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
