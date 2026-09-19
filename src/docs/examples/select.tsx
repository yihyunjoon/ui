import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/base-nova/ui/select";

export default function Example() {
  return (
    <Select defaultValue="design">
      <SelectTrigger className="w-56" aria-label="Team">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="product">Product</SelectItem>
      </SelectContent>
    </Select>
  );
}
