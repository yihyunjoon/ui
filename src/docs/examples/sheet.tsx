import { Button } from "@/registry/base-nova/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/registry/base-nova/ui/sheet";

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open panel</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Project details</SheetTitle>
          <SheetDescription>Manage the details of your current project.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <SheetClose render={<Button />}>Done</SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
