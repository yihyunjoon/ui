import { Bar, BarChart, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/base-nova/ui/chart";

export default function Example() {
  return (
    <ChartContainer
      config={{ visits: { label: "Visits", color: "var(--chart-1)" } }}
      className="h-48 w-full max-w-sm"
    >
      <BarChart
        accessibilityLayer
        data={[
          { month: "Jan", visits: 120 },
          { month: "Feb", visits: 180 },
          { month: "Mar", visits: 140 },
        ]}
      >
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
