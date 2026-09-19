import { useState } from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/registry/base-nova/ui/sidebar";

export default function Example() {
  const [page, setPage] = useState("Projects");
  return (
    <SidebarProvider className="min-h-56 w-full overflow-hidden rounded-lg border">
      <Sidebar collapsible="none" className="w-40">
        <SidebarHeader className="font-semibold">Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={page === "Projects"} onClick={() => setPage("Projects")}>
                Projects
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={page === "Settings"} onClick={() => setPage("Settings")}>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="justify-center p-4 text-sm text-muted-foreground">
        {page} content
      </SidebarInset>
    </SidebarProvider>
  );
}
