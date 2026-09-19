import { useState } from "react";

import { DatePicker } from "@/registry/base-nova/ui/date-picker";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 20));
  return <DatePicker value={date} onValueChange={setDate} />;
}
