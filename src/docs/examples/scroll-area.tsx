import { ScrollArea } from "@/registry/base-nova/ui/scroll-area";

export default function Example() {
  return (
    <ScrollArea className="h-48 w-64 rounded-lg border">
      <div className="p-4">
        {Array.from({ length: 20 }, (_, index) => (
          <p className="border-b py-2 text-sm" key={index}>
            Project {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}
