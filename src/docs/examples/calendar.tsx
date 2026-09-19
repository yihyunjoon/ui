import { useState } from "react";

import { Calendar } from "@/registry/base-nova/ui/calendar";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 20));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 8, 1)}
      className="rounded-lg border"
    />
  );
}
