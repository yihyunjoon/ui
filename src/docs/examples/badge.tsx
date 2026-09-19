import { Badge } from "@/registry/base-nova/ui/badge";

export default function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Archived</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  );
}
