import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "#/components/ui/sidebar";
import { componentDocs } from "#/docs/catalog";

export function AppSidebar() {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();
  const visible = componentDocs.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  function closeMobile() {
    setOpenMobile(false);
  }
  return (
    <Sidebar>
      <SidebarHeader className="gap-4 p-4">
        <Link
          to="/docs"
          activeOptions={{ exact: true }}
          className="font-semibold tracking-tight"
          onClick={closeMobile}
        >
          yihyunjoon/ui
        </Link>
        <label className="sr-only" htmlFor="docs-search">
          Search components
        </label>
        <SidebarInput
          id="docs-search"
          placeholder="Search components…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Documentation navigation">
          <SidebarGroup>
            <SidebarGroupLabel>Getting started</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/docs" || pathname === "/docs/"}
                    render={
                      <Link to="/docs" activeOptions={{ exact: true }} onClick={closeMobile} />
                    }
                  >
                    Introduction
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/docs/installation"}
                    render={<Link to="/docs/installation" onClick={closeMobile} />}
                  >
                    Installation
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>
              Components <span className="ml-auto">{visible.length}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visible.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={pathname === `/docs/components/${item.name}`}
                      render={
                        <Link
                          to="/docs/components/$component"
                          params={{ component: item.name }}
                          onClick={closeMobile}
                        />
                      }
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              {visible.length === 0 && (
                <p className="p-2 text-sm text-muted-foreground" role="status">
                  No components found.
                </p>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
