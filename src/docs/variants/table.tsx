import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/registry/base-nova/ui/table";

export default function Example() {
  return (
    <Table>
      <TableCaption>Recent projects in your workspace.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected" aria-selected>
          <TableCell>Design system</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Website</TableCell>
          <TableCell>Draft</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
