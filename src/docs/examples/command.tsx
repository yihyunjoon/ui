import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/registry/base-nova/ui/command";

export default function Example() {
  return (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Open calendar</CommandItem>
          <CommandItem>Search projects</CommandItem>
          <CommandItem>View settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
