"use client";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({
  children,
}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
      <>{children}</>
    </QueryClientProvider>
  );
}
