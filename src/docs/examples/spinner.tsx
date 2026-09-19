import { Spinner } from "@/registry/base-nova/ui/spinner";

export default function Example() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Spinner />
      Loading your workspace…
    </div>
  );
}
