import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/registry/base-nova/ui/hover-card";

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<a href="/docs" className="underline underline-offset-4" />}>
        @yihyunjoon/ui
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="font-semibold">Open source components</p>
        <p className="text-sm text-muted-foreground">A customizable registry built on Base UI.</p>
      </HoverCardContent>
    </HoverCard>
  );
}
