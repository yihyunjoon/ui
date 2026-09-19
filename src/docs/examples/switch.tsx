import { Switch } from "@/registry/base-nova/ui/switch";

export default function Example() {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked />
      Enable notifications
    </label>
  );
}
