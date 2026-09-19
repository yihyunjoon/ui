import { useState } from "react";

import { Input } from "#/components/ui/input";
import { Button } from "#/registry/base-nova/ui/button";
import registry from "#/registry/registry.json";

const components = registry.items.filter((item) => item.type === "registry:ui");

export function RegistryCatalog() {
  const [query, setQuery] = useState("");
  const visible = components.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="mx-auto w-full max-w-6xl space-y-10 p-6 md:p-10">
      <section className="space-y-4" id="components">
        <p className="text-sm font-medium text-muted-foreground">
          Base UI · Tailwind CSS · Source included
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Your components. Your design.</h1>
        <p className="max-w-2xl text-muted-foreground">
          {components.length} customizable components, from buttons and forms to charts and
          conversations. Install the source, then make it yours.
        </p>
        <div className="flex items-center gap-3">
          <Button>Button preview</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>
      <section id="installation" className="space-y-3 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Install a component</h2>
        <p className="text-sm text-muted-foreground">
          Start with a React project initialized with shadcn and Tailwind CSS 4. Dependencies from
          this registry are installed alongside your selected component.
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted p-3 text-sm">
          <code>pnpm dlx shadcn@latest add https://ui.hyunjoon.net/r/button.json</code>
        </pre>
      </section>
      <section className="space-y-4" aria-label="Component catalog">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="w-full max-w-sm space-y-2">
            <label htmlFor="component-search" className="text-sm font-medium">
              Find a component
            </label>
            <Input
              id="component-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components…"
            />
          </div>
          <p className="text-sm text-muted-foreground" role="status">
            {visible.length} of {components.length} components
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <article key={item.name} className="flex flex-col gap-3 rounded-xl border p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="grow text-sm text-muted-foreground">{item.description}</p>
              <div className="flex gap-4 text-sm">
                <a className="underline" href={`/r/${item.name}.json`}>
                  Registry JSON
                </a>
                <a
                  className="underline"
                  href={`https://github.com/yihyunjoon/ui/blob/main/${item.files[0].path}`}
                >
                  Source
                </a>
              </div>
              <code className="overflow-x-auto text-xs whitespace-nowrap">/r/{item.name}.json</code>
            </article>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No components match your search.</p>
        )}
      </section>
      <section id="customization" className="space-y-3 border-t pt-8">
        <h2 className="text-lg font-semibold">Customize the source</h2>
        <p className="text-sm text-muted-foreground">
          Edit the installed files in your project. Data Table, Date Picker, Typography, and Form
          are editable compositions; all other UI sources follow the official Base Nova registry.
          The original Button styling is preserved.
        </p>
        <a className="text-sm underline" href="https://ui.shadcn.com/docs/components">
          shadcn/ui component documentation
        </a>
      </section>
    </main>
  );
}
