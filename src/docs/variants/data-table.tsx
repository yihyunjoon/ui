import { createColumnHelper } from "@tanstack/react-table";

import { DataTable, dataTableFeatures } from "@/registry/base-nova/ui/data-table";

export default function Example() {
  const helper = createColumnHelper<typeof dataTableFeatures, { name: string; status: string }>();
  const columns = helper.columns([
    helper.accessor("name", { header: "Project" }),
    helper.accessor("status", { header: "Status" }),
  ]);
  return <DataTable columns={columns} data={[]} emptyMessage="No projects match your filters." />;
}
