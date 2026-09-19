import { Separator } from "@/registry/base-nova/ui/separator";

export default function Example() {
  return (
    <div className="flex h-20 w-64 items-center gap-3">
      <p className="text-sm font-medium">Project settings</p>
      <Separator orientation="vertical" />
      <p className="text-sm text-muted-foreground">Manage your workspace preferences.</p>
    </div>
  );
}
