import { Skeleton } from "@/registry/base-nova/ui/skeleton";

export default function Example() {
  return (
    <div className="flex w-64 items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}
