import {
  Message,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from "@/registry/base-nova/ui/message";

export default function Example() {
  return (
    <Message className="max-w-sm">
      <MessageContent>
        <MessageHeader>Alex</MessageHeader>
        <p className="rounded-lg bg-muted p-3">The new components are ready to review.</p>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  );
}
