import { useState } from "react";

import { Button } from "@/registry/base-nova/ui/button";
import { Spinner } from "@/registry/base-nova/ui/spinner";

export default function Example() {
  const [saving, setSaving] = useState(false);
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {(["xs", "sm", "default", "lg"] as const).map((size) => (
          <Button key={size} size={size} variant="outline">
            {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map(
          (variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ),
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button disabled={saving} aria-busy={saving} onClick={() => setSaving(true)}>
          {saving && <Spinner aria-hidden="true" />}
          {saving ? "Saving…" : "Simulate save"}
        </Button>
        {saving && (
          <Button variant="outline" onClick={() => setSaving(false)}>
            Complete preview
          </Button>
        )}
      </div>
    </div>
  );
}
