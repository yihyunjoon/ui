import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group";

export default function Example() {
  return (
    <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
