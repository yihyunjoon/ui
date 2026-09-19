import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/base-nova/ui/avatar";

export default function Example() {
  return (
    <AvatarGroup>
      <Avatar size="sm">
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>SY</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
