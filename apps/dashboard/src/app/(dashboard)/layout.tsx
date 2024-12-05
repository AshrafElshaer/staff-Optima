import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@optima/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4 overflow-x-hidden">
      <SidebarTrigger className="-ml-1 md:hidden " />
        {children}</SidebarInset>
    </SidebarProvider>
  );
}
