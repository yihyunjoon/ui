import { useState } from "react";

import { Checkbox } from "@/registry/base-nova/ui/checkbox";

export default function Example() {
  const [selected, setSelected] = useState<string[]>(["Design"]);
  const options = ["Design", "Engineering"];
  return (
    <div className="grid gap-3 text-sm">
      <label htmlFor="variant-all" className="flex items-center gap-2">
        <Checkbox
          id="variant-all"
          checked={selected.length === options.length}
          indeterminate={selected.length > 0 && selected.length < options.length}
          onCheckedChange={(checked) => setSelected(checked ? options : [])}
        />
        Select all
      </label>
      {options.map((option) => (
        <label key={option} htmlFor={`variant-${option}`} className="flex items-center gap-2">
          <Checkbox
            id={`variant-${option}`}
            checked={selected.includes(option)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked ? [...current, option] : current.filter((value) => value !== option),
              )
            }
          />
          {option}
        </label>
      ))}
      <label htmlFor="variant-locked" className="flex items-center gap-2">
        <Checkbox id="variant-locked" disabled />
        Unavailable team
      </label>
      <p role="status">{selected.length} teams selected</p>
    </div>
  );
}
