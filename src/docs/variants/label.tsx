import { Input } from "@/registry/base-nova/ui/input";
import { Label } from "@/registry/base-nova/ui/label";

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="variant-name">Name</Label>
      <Input disabled id="variant-name" placeholder="Alex Jordan" />
    </div>
  );
}
