import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { DocsLayout } from "#/components/docs-layout";

export const Route = createFileRoute("/docs")({
  component: () => (
    <DocsLayout>
      <Outlet />
    </DocsLayout>
  ),
  notFoundComponent: () => (
    <main className="mx-auto w-full max-w-3xl space-y-4 p-8">
      <h1 className="text-3xl font-semibold">Component not found</h1>
      <p>This component is not part of the registry.</p>
      <Link to="/docs" className="underline">
        Browse the documentation
      </Link>
    </main>
  ),
});
