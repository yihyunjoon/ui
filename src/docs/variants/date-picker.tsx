import { useState } from "react";

import { DatePicker } from "@/registry/base-nova/ui/date-picker";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <DatePicker disabled placeholder="Choose a start date" value={date} onValueChange={setDate} />
  );
}
