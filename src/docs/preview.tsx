import { lazy, Suspense, type ComponentType } from "react";

import type { ComponentName } from "./catalog";

const modules = import.meta.glob<{ default: ComponentType }>("./examples/*.tsx");
const previews = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => [
    path.split("/").pop()!.replace(".tsx", ""),
    lazy(load),
  ]),
);

export function ComponentPreview({ name }: { name: ComponentName }) {
  const Preview = previews[name];
  return (
    <div
      className="flex min-h-64 w-full items-center justify-center overflow-x-auto rounded-xl border bg-background p-6 sm:p-10"
      data-testid="component-preview"
    >
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground" role="status">
            Loading preview…
          </p>
        }
      >
        <Preview />
      </Suspense>
    </div>
  );
}
