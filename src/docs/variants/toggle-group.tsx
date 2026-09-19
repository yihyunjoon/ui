import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group";

export default function Example() {
  return (
    <ToggleGroup
      multiple
      variant="outline"
      defaultValue={["bold", "italic"]}
      aria-label="Text formatting"
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
