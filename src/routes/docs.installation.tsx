import { createFileRoute, Link } from "@tanstack/react-router";

import { CodeBlock } from "#/components/code-block";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({ meta: [{ title: "Installation — yihyunjoon/ui" }] }),
  component: Installation,
});
function Installation() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-10 px-6 py-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Add editable components to your React application.
        </p>
      </header>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Initialize shadcn</h2>
        <p>
          Start with a React project using Tailwind CSS 4, then initialize shadcn to configure your
          aliases and theme variables.
        </p>
        <CodeBlock code="pnpm dlx shadcn@latest init" />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Add a component</h2>
        <p>
          Use a component’s registry URL. Its package dependencies and related components are
          installed with it.
        </p>
        <CodeBlock code="pnpm dlx shadcn@latest add https://ui.hyunjoon.net/r/button.json" />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Use and customize</h2>
        <CodeBlock
          code={
            'import { Button } from "@/components/ui/button"\n\nexport function SaveButton() {\n  return <Button>Save changes</Button>\n}'
          }
        />
        <p>
          Change the installed source and shared CSS variables to match your design. This registry
          uses Base UI’s <code>render</code> composition API.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Provider setup</h2>
        <p>
          Tooltip, Sidebar, and Message Scroller need their respective providers. Toast and Sonner
          need a mounted toaster. Each component page includes the required setup in its usage
          example.
        </p>
        <Link
          to="/docs/components/$component"
          params={{ component: "button" }}
          className="underline"
        >
          Explore Button →
        </Link>
      </section>
    </main>
  );
}
