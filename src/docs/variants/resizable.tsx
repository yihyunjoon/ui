import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/registry/base-nova/ui/resizable";

export default function Example() {
  return (
    <ResizablePanelGroup orientation="vertical" className="h-56 max-w-sm rounded-lg border">
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-4">Top</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-4">Bottom</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
