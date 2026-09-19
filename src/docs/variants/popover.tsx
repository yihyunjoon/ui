import { Button } from "@/registry/base-nova/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/registry/base-nova/ui/popover";

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Details</PopoverTrigger>
      <PopoverContent align="start" side="top">
        <PopoverTitle>Workspace settings</PopoverTitle>
        <PopoverDescription>Only invited members can view this workspace.</PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
