import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio";

export default function Example() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio
        ratio={1}
        className="flex items-center justify-center rounded-lg bg-muted text-muted-foreground"
      >
        1 : 1
      </AspectRatio>
    </div>
  );
}
