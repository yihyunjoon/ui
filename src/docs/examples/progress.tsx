import { Progress } from "@/registry/base-nova/ui/progress";

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Progress value={65} aria-label="Upload progress" />
      <p className="text-sm text-muted-foreground">65% uploaded</p>
    </div>
  );
}
