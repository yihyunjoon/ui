import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@/registry/base-nova/ui/input-group";

export default function Example() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="Amount" type="number" placeholder="0.00" />
    </InputGroup>
  );
}
