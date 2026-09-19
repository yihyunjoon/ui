import { Field, FieldLabel, FieldDescription } from "@/registry/base-nova/ui/field";
import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="example-email">Email address</FieldLabel>
      <Input id="example-email" type="email" placeholder="you@example.com" />
      <FieldDescription>We’ll only use this for account updates.</FieldDescription>
    </Field>
  );
}
