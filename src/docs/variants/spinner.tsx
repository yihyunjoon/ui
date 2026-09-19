import { Spinner } from "@/registry/base-nova/ui/spinner";

export default function Example() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Spinner className="size-3" />
      <Spinner className="size-8" />
      Loading your workspace…
    </div>
  );
}
