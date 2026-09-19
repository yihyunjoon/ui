import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  return (
    <Input
      aria-label="Email address"
      type="email"
      placeholder="you@example.com"
      className="max-w-sm"
    />
  );
}
