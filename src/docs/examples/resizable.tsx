import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/registry/base-nova/ui/resizable";

export default function Example() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-40 max-w-sm rounded-lg border">
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-4">Left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-4">Right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
