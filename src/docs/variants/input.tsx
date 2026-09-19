import { useState } from "react";

import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  const [value, setValue] = useState("");
  const invalid = value.length > 0 && value.length < 3;
  return (
    <div className="grid w-full max-w-sm gap-3">
      <label htmlFor="variant-username" className="text-sm">
        Username
      </label>
      <Input
        id="variant-username"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-invalid={invalid}
        aria-describedby="variant-username-help"
        placeholder="At least 3 characters"
      />
      <p id="variant-username-help" role="status" className="text-sm">
        {invalid ? "Use at least three characters." : "Choose a public username."}
      </p>
      <Input aria-label="Locked account" value="Account locked" disabled />
      <Input aria-label="Read-only identifier" value="user_123" readOnly />
    </div>
  );
}
