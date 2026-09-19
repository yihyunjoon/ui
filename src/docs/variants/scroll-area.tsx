import { ScrollArea, ScrollBar } from "@/registry/base-nova/ui/scroll-area";
export default function Example() {
  return (
    <ScrollArea className="w-64 rounded-lg border">
      <div className="flex w-max gap-4 p-4">
        {["Research", "Design", "Engineering", "Launch"].map((title) => (
          <div
            key={title}
            className="flex h-28 w-40 items-center justify-center rounded-lg bg-muted text-sm"
          >
            {title}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
