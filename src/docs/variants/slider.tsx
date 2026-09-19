import { useState } from "react";

import { Slider } from "@/registry/base-nova/ui/slider";

export default function Example() {
  const [value, setValue] = useState([20, 80]);
  return (
    <div className="w-64 space-y-4">
      <Slider
        value={value}
        onValueChange={(next) => setValue(typeof next === "number" ? [next] : [...next])}
        max={100}
        aria-label="Price range"
      />
      <p className="text-sm text-muted-foreground">
        Range: {value[0]}–{value[1]}
      </p>
    </div>
  );
}
