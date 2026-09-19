import { Button } from "@/registry/base-nova/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/registry/base-nova/ui/collapsible";

export default function Example() {
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger render={<Button variant="outline" />}>
        Show project details
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 text-sm">
        Created today · 3 collaborators · Private workspace
      </CollapsibleContent>
    </Collapsible>
  );
}
