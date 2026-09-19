import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/base-nova/ui/select";

export default function Example() {
  return (
    <Select
      defaultValue="design"
      items={[
        { value: "design", label: "Design" },
        { value: "engineering", label: "Engineering" },
        { value: "product", label: "Product" },
      ]}
    >
      <SelectTrigger className="w-56" aria-label="Team">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem disabled value="product">
          Product
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
