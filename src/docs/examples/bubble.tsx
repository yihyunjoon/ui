import { BubbleGroup, Bubble, BubbleContent } from "@/registry/base-nova/ui/bubble";

export default function Example() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="secondary">
        <BubbleContent>Ready to start?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, let’s build something.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
