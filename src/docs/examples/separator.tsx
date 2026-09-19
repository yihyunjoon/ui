import { Separator } from "@/registry/base-nova/ui/separator";

export default function Example() {
  return (
    <div className="w-64 space-y-3">
      <p className="text-sm font-medium">Project settings</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Manage your workspace preferences.</p>
    </div>
  );
}
