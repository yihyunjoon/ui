import { Input } from "@/registry/base-nova/ui/input";
import { Label } from "@/registry/base-nova/ui/label";

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="example-name">Name</Label>
      <Input id="example-name" placeholder="Alex Jordan" />
    </div>
  );
}
