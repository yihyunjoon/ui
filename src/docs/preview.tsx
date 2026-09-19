import {
  Component,
  lazy,
  Suspense,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import type { ComponentName } from "./catalog";

type PreviewLoader = () => Promise<{ default: ComponentType }>;
const modules = import.meta.glob<{ default: ComponentType }>("./examples/*.tsx");

class PreviewBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div role="alert" className="max-w-sm space-y-3 text-center">
          <p className="font-medium">This preview could not be loaded.</p>
          <p className="text-sm text-muted-foreground">
            You can still read the documentation and copy the example below.
          </p>
          <button
            type="button"
            onClick={this.props.onRetry}
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          >
            Retry preview
          </button>
        </div>
      );
    return this.props.children;
  }
}

export function RecoverablePreview({ load }: { load: PreviewLoader }) {
  const [attempt, setAttempt] = useState(0);
  const Preview = useMemo(() => lazy(() => load()), [load, attempt]);
  return (
    <PreviewBoundary key={attempt} onRetry={() => setAttempt((value) => value + 1)}>
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground" role="status">
            Loading preview…
          </p>
        }
      >
        <Preview />
      </Suspense>
    </PreviewBoundary>
  );
}

export function ComponentPreview({ name }: { name: ComponentName }) {
  return (
    <div
      className="flex min-h-64 w-full items-center justify-center overflow-x-auto rounded-xl border bg-background p-6 sm:p-10"
      data-testid="component-preview"
    >
      <RecoverablePreview key={name} load={modules[`./examples/${name}.tsx`]} />
    </div>
  );
}
