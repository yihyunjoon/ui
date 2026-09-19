import { Field, FieldLabel, FieldDescription } from "@/registry/base-nova/ui/field";
import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  return (
    <Field data-invalid className="max-w-sm">
      <FieldLabel htmlFor="variant-email">Email address</FieldLabel>
      <Input
        id="variant-email"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="variant-email-error"
      />
      <FieldDescription id="variant-email-error" role="alert">
        Enter a valid email address.
      </FieldDescription>
    </Field>
  );
}
