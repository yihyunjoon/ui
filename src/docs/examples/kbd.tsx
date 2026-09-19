import { Kbd, KbdGroup } from "@/registry/base-nova/ui/kbd";

export default function Example() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span>Open search</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  );
}
