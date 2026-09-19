import { Skeleton } from "@/registry/base-nova/ui/skeleton";

export default function Example() {
  return (
    <div className="grid w-64 gap-4">
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}
