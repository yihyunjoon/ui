import { RadioGroup, RadioGroupItem } from "@/registry/base-nova/ui/radio-group";

export default function Example() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </label>
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="compact" />
        Compact
      </label>
    </RadioGroup>
  );
}
