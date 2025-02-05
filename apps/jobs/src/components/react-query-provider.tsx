"use client";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error - Known type issue with React 18 types */}
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
}
