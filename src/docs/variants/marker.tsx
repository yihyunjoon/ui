import { Marker, MarkerContent } from "@/registry/base-nova/ui/marker";

export default function Example() {
  return (
    <Marker variant="border" className="max-w-sm">
      <MarkerContent>Today</MarkerContent>
    </Marker>
  );
}
