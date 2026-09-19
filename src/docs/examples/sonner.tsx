import { toast } from "sonner";

import { Button } from "@/registry/base-nova/ui/button";
import { Toaster } from "@/registry/base-nova/ui/sonner";

export default function Example() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast.success("Your changes have been saved.")}>
        Show notification
      </Button>
    </>
  );
}
