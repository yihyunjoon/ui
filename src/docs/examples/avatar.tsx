import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/base-nova/ui/avatar";

export default function Example() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SY</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
