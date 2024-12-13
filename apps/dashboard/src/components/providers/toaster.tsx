"use client";

import React from "react";

import { useTheme } from "next-themes";
import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner";
import { twJoin } from "tailwind-merge";

import { buttonVariants } from "@optima/ui/button";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

import { Check, Info, Loader, TriangleAlert } from "lucide-react";

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <ToasterPrimitive
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={5000}
      position="top-right"
      // icons={{
        // info: <MdOutlineError size={16} />,
        // success: <Check size={16} strokeWidth={2} />,
        // warning: <FaExclamationTriangle size={14} />,
        // error: <FaExclamationTriangle size={14} />,
        // loading: <Loader size={16} className="animate-spin" />,
      // }}
      toastOptions={{
        // unstyled: true,
        closeButton: true,
        classNames: {
          // toast: twJoin(
          //   // " min-w-fit bg-secondary ring-1 ring-border dark:ring-inset rounded-md text-foreground overflow-hidden text-[0.925rem] backdrop-blur-xl px-4 py-3  ",

          //   "[&:has([data-icon])_[data-content]]:ml-5",
          //   '[&:has([data-button])_[data-close-button="true"]]:hidden',
          //   "[&:not([data-description])_[data-title]]:font-normal",
          //   "[&:has([data-description])_[data-title]]:!font-medium ",
          //   "[&>[data-button]]:absolute [&>[data-button=true]]:bottom-4",
          //   "[&>[data-action=true]]:right-4",
          //   "[&>[data-cancel=true]]:left-4",
          //   "[&>[data-close-button=true]]:hover:bg-transparent [&>[data-close-button=true]]:!bg-transparent",
          // ),
          // description: "text-sm",
          // title: "font-semibold",

          // icon: "absolute top-[1rem] ",
          // content:
          //   "[&:not(:has(+button))]:pr-10 [&:has(+button)]:pb-11 md:[&:has(+button)]:pb-9 px-4 py-3",
          // loading:
          //   "bg-background ring-border text-foreground ring-inset shadow-md  [&>[data-close-button=true]>svg]:text-foreground [&>[data-close-button=true]:hover]:bg-transparent [&>[data-close-button=true]]:!bg-transparent",
          // error:
          //   "bg-destructive/75 ring-destructive text-white ring-inset shadow-md shadow-destructive/50 [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]]:!bg-transparent [&>[data-close-button=true]:not(:hover)]:!bg-transparent",
          // info: "bg-blue/80 !ring-blue text-white ring-inset shadow-md shadow-blue [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-transparent [&>[data-close-button=true]]:!bg-transparent",
          // warning:
          //   "bg-warning/75 text-warning-foreground ring-warning ring-inset shadow-md shadow-warning/50 [&>[data-close-button=true]>svg]:text-warning-foreground [&>[data-close-button=true]:hover]:bg-transparent [&>[data-close-button=true]]:!bg-transparent",
          // loader: "bg-blue-500",
          // success:
          //   "bg-success ring-success text-success-foreground ring-inset shadow-md shadow-success/50 [&>[data-close-button=true]>svg]:text-success-foreground [&>[data-close-button=true]:hover]:bg-transparent [&>[data-close-button=true]]:!bg-transparent",
          // cancelButton: buttonVariants({
          //   className: "",
          //   size: "sm",
          //   variant: "outline",
          // }),
          // actionButton: buttonVariants({
          //   className: "self-end justify-self-end",
          //   size: "sm",
          //   variant: "secondary",
          // }),
          closeButton:
            "[&_svg]:size-5 size-6 absolute top-1/2 transform -translate-y-1/2 right-2 lg:right-3 left-auto grid place-content-center rounded-md border-0 [&_svg]:text-foreground bg-transparent",
        },
      }}
      richColors
      {...props}
    />
  );
};
