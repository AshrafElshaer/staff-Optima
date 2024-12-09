"use client";

import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { OrganizationSidebar } from "@/components/sidebars/organization-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@optima/ui/sidebar";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  const pathname = usePathname();
  const isOrganization = pathname.includes("/organization");
  return (
    <SidebarProvider>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isOrganization ? "organization" : "app"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {isOrganization ? <OrganizationSidebar /> : <AppSidebar />}
        </motion.div>
      </AnimatePresence>
      <SidebarInset className="overflow-x-hidden p-4">
        <SidebarTrigger className="-ml-1 md:hidden" />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
