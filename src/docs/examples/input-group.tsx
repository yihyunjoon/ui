import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@/registry/base-nova/ui/input-group";

export default function Example() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="Website" placeholder="example.com" />
    </InputGroup>
  );
}
