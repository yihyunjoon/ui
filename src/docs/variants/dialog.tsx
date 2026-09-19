import { Button } from "@/registry/base-nova/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/base-nova/ui/dialog";
import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Your profile</DialogTitle>
          <DialogDescription>Update how your name appears to teammates.</DialogDescription>
        </DialogHeader>
        <label className="grid gap-2 text-sm">
          Display name
          <Input defaultValue="Alex Jordan" />
        </label>
        <DialogFooter>
          <DialogClose render={<Button />}>Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
