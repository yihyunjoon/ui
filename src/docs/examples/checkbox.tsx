import { Checkbox } from "@/registry/base-nova/ui/checkbox";

export default function Example() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox defaultChecked />
      Email me product updates
    </label>
  );
}
