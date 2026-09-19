import { useState } from "react";

import { Switch } from "@/registry/base-nova/ui/switch";

export default function Example() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="grid gap-3 text-sm">
      <label htmlFor="variant-notifications" className="flex items-center gap-3">
        <Switch id="variant-notifications" checked={enabled} onCheckedChange={setEnabled} />
        Enable notifications
      </label>
      <p role="status">Notifications are {enabled ? "on" : "off"}.</p>
      <label htmlFor="variant-policy" className="flex items-center gap-3">
        <Switch id="variant-policy" checked disabled />
        Required by policy
      </label>
    </div>
  );
}
