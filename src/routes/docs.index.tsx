import { createFileRoute, Link } from "@tanstack/react-router";

import { componentDocs } from "#/docs/catalog";

export const Route = createFileRoute("/docs/")({
  head: () => ({ meta: [{ title: "Introduction — yihyunjoon/ui" }] }),
  component: Introduction,
});
function Introduction() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-6 py-10 lg:px-12">
      <section className="max-w-2xl space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Documentation</p>
        <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          A collection of {componentDocs.length} editable React components built with Base UI and
          Tailwind CSS. Explore an example, install its source, and adapt it to your product.
        </p>
      </section>
      <section className="max-w-2xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Start building</h2>
        <p className="leading-7 text-muted-foreground">
          Choose a component in the sidebar to see its purpose, a live preview, installation
          command, and a working usage example. The files are installed into your project, so every
          detail can be changed.
        </p>
        <Link
          to="/docs/installation"
          className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Installation guide →
        </Link>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {componentDocs.map((item) => (
            <Link
              key={item.name}
              to="/docs/components/$component"
              params={{ component: item.name }}
              className="rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
