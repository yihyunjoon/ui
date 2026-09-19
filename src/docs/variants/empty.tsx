import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/registry/base-nova/ui/empty";

export default function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No matching projects</EmptyTitle>
        <EmptyDescription>Try a different search term or remove filters.</EmptyDescription>
      </EmptyHeader>
      <p className="text-sm text-muted-foreground">Search is limited to this workspace.</p>
    </Empty>
  );
}
