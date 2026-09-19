import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CodeBlock } from "#/components/code-block";
import { componentDocs, findComponentDoc, loadExampleSource } from "#/docs/catalog";
import { ComponentPreview } from "#/docs/preview";

export const Route = createFileRoute("/docs/components/$component")({
  loader: async ({ params }) => {
    const doc = findComponentDoc(params.component);
    if (!doc) throw notFound();
    return { doc, code: await loadExampleSource(doc.name) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.doc.title ?? "Component"} — yihyunjoon/ui` },
      { name: "description", content: loaderData?.doc.description },
    ],
  }),
  component: ComponentPage,
});
function ComponentPage() {
  const { doc, code } = Route.useLoaderData();
  const index = componentDocs.findIndex((item) => item.name === doc.name);
  const previous = componentDocs[index - 1];
  const next = componentDocs[index + 1];
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-12 px-6 py-10 lg:px-12">
      <main className="min-w-0 flex-1 space-y-10">
        <header className="space-y-3">
          <p className="text-sm text-muted-foreground">Components</p>
          <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {doc.description}
          </p>
          <a
            href={`https://github.com/yihyunjoon/ui/blob/main/${doc.files[0].path}`}
            className="inline-block text-sm underline underline-offset-4"
          >
            View component source ↗
          </a>
        </header>
        <section id="preview" className="scroll-mt-20 space-y-4">
          <h2 className="text-xl font-semibold">Preview</h2>
          <ComponentPreview key={doc.name} name={doc.name} />
        </section>
        <section id="installation" className="scroll-mt-20 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <p className="text-sm text-muted-foreground">
            Install this component and its dependencies in a project initialized with shadcn.
          </p>
          <CodeBlock
            key={`install-${doc.name}`}
            code={`pnpm dlx shadcn@latest add https://ui.hyunjoon.net/r/${doc.name}.json`}
          />
        </section>
        <section id="usage" className="scroll-mt-20 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
          <p className="text-sm text-muted-foreground">
            This is the complete example shown above. Adjust import aliases to match your project.
          </p>
          <CodeBlock key={`usage-${doc.name}`} code={code} />
        </section>
        <section id="guidelines" className="scroll-mt-20 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Usage notes</h2>
          <p className="leading-7 text-muted-foreground">{doc.guidance}</p>
        </section>
        <nav aria-label="Adjacent components" className="flex justify-between gap-4 border-t pt-6">
          {previous ? (
            <Link
              to="/docs/components/$component"
              params={{ component: previous.name }}
              className="text-sm"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to="/docs/components/$component"
              params={{ component: next.name }}
              className="text-sm"
            >
              {next.title} →
            </Link>
          )}
        </nav>
      </main>
      <aside className="hidden w-36 shrink-0 xl:block">
        <nav aria-label="On this page" className="sticky top-24 space-y-3 text-sm">
          <p className="font-medium">On this page</p>
          {["Preview", "Installation", "Usage", "Guidelines"].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="block text-muted-foreground hover:text-foreground"
            >
              {section === "Guidelines" ? "Usage notes" : section}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
