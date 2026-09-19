import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/registry/base-nova/ui/message-scroller";

export default function Example() {
  return (
    <div className="h-56 w-full max-w-sm rounded-lg border">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-4">
              {Array.from({ length: 8 }, (_, index) => (
                <MessageScrollerItem key={index} messageId={String(index)}>
                  <p className="rounded-lg bg-muted p-3 text-sm">
                    Message {index + 1}: your latest project update.
                  </p>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton aria-label="Scroll to latest message" />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}
