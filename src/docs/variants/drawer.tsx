import { Button } from "@/registry/base-nova/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/registry/base-nova/ui/drawer";

export default function Example() {
  return (
    <Drawer swipeDirection="up">
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Daily goal</DrawerTitle>
          <DrawerDescription>Adjust your target for tomorrow.</DrawerDescription>
        </DrawerHeader>
        <div className="p-6 text-center text-4xl font-semibold">8,000 steps</div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
