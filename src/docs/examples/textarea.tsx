import { Textarea } from "@/registry/base-nova/ui/textarea";

export default function Example() {
  return (
    <Textarea
      aria-label="Project description"
      placeholder="Describe your project…"
      className="max-w-sm"
    />
  );
}
