import { DirectionProvider } from "@/registry/base-nova/ui/direction";

export default function Example() {
  return (
    <DirectionProvider direction="ltr">
      <div dir="ltr" className="w-64 rounded-lg border p-5 text-start">
        <p className="font-medium">Hello, world</p>
        <p className="mt-2 text-sm text-muted-foreground">Left-to-right layout</p>
      </div>
    </DirectionProvider>
  );
}
