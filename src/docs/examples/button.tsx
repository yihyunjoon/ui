import { Button } from "@/registry/base-nova/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="secondary">Save draft</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
