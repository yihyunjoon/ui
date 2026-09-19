import { Button } from "@/registry/base-nova/ui/button";
import { ButtonGroup } from "@/registry/base-nova/ui/button-group";

export default function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  );
}
