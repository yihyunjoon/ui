import { Button } from "@/registry/base-nova/ui/button";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/registry/base-nova/ui/empty";

export default function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Your projects will appear here when you create one.</EmptyDescription>
      </EmptyHeader>
      <Button>Create project</Button>
    </Empty>
  );
}
