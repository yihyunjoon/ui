import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/registry/base-nova/ui/calendar";

export default function Example() {
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <div className="space-y-3">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 8, 1)}
        disabled={{ dayOfWeek: [0, 6] }}
        className="rounded-lg border"
      />
      <p className="text-sm" role="status">
        {range?.from
          ? `${range.from.toLocaleDateString("en-US")} — ${range.to?.toLocaleDateString("en-US") ?? "Choose an end date"}`
          : "Choose a weekday range"}
      </p>
    </div>
  );
}
