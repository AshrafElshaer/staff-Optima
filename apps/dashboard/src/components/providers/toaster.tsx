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
        closeButton: true,
        classNames: {
          closeButton:
            "[&_svg]:size-5 size-6 absolute top-1/2 transform -translate-y-1/2 right-2 lg:right-3 left-auto grid place-content-center rounded-md border-0 [&_svg]:text-foreground !bg-transparent",
        },
      }}
      expand={false}
      richColors
      {...props}
    />
  );
};
