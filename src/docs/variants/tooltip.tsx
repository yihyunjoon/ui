import { Button } from "@/registry/base-nova/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/registry/base-nova/ui/tooltip";

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover or focus me</TooltipTrigger>
        <TooltipContent side="bottom">Helpful additional context</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
