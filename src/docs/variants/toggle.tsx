import { Toggle } from "@/registry/base-nova/ui/toggle";

export default function Example() {
  return (
    <Toggle
      disabled
      defaultPressed
      variant="outline"
      aria-label="Toggle bold"
      className="font-bold"
    >
      B
    </Toggle>
  );
}
