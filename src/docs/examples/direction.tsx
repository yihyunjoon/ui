import { DirectionProvider } from "@/registry/base-nova/ui/direction";

export default function Example() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-64 rounded-lg border p-5 text-start">
        <p className="font-medium">مرحبا بالعالم</p>
        <p className="mt-2 text-sm text-muted-foreground">Right-to-left layout</p>
      </div>
    </DirectionProvider>
  );
}
