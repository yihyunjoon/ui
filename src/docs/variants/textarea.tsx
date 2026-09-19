import { useState } from "react";

import { Textarea } from "@/registry/base-nova/ui/textarea";

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <div className="grid w-full max-w-sm gap-3">
      <label htmlFor="variant-summary" className="text-sm">
        Summary
      </label>
      <Textarea
        id="variant-summary"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={140}
        aria-describedby="variant-count"
        placeholder="Up to 140 characters"
      />
      <p id="variant-count" role="status" className="text-sm text-muted-foreground">
        {value.length}/140 characters
      </p>
      <Textarea aria-label="Locked note" disabled defaultValue="This note is locked." />
    </div>
  );
}
