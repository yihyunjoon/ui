import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AppSidebar } from "#/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { findComponentDoc } from "#/docs/catalog";

import { DocsSearch } from "./docs-search";

export function DocsLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const name = pathname.split("/").pop() ?? "";
  const title =
    findComponentDoc(name)?.title ?? (name === "installation" ? "Installation" : "Introduction");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger aria-label="Toggle documentation sidebar" />
          <span className="h-4 w-px bg-border" />
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link to="/docs" activeOptions={{ exact: true }} className="text-muted-foreground">
              Docs
            </Link>
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
            <span aria-current="page">{title}</span>
          </nav>
          <DocsSearch />
          <a
            href="https://github.com/yihyunjoon/ui"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub ↗
          </a>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
