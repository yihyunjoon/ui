import { Kbd, KbdGroup } from "@/registry/base-nova/ui/kbd";

export default function Example() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span>Move between controls</span>
      <KbdGroup>
        <Kbd>Shift</Kbd>
        <Kbd>Tab</Kbd>
      </KbdGroup>
    </div>
  );
}
