import { Button } from "@/registry/base-nova/ui/button";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/registry/base-nova/ui/item";

export default function Example() {
  return (
    <Item variant="muted" size="sm" className="w-full max-w-sm">
      <ItemContent>
        <ItemTitle>Project notes</ItemTitle>
        <ItemDescription>Updated just now</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  );
}
