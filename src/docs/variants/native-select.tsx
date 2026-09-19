import { NativeSelect, NativeSelectOption } from "@/registry/base-nova/ui/native-select";

export default function Example() {
  return (
    <NativeSelect disabled aria-label="Choose a region" defaultValue="asia">
      <NativeSelectOption value="asia">Asia</NativeSelectOption>
      <NativeSelectOption value="europe">Europe</NativeSelectOption>
      <NativeSelectOption value="americas">Americas</NativeSelectOption>
    </NativeSelect>
  );
}
