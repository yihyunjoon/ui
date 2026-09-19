import { toast } from "sonner";

import { Button } from "@/registry/base-nova/ui/button";
import { Toaster } from "@/registry/base-nova/ui/sonner";

export default function Example() {
  return (
    <>
      <Toaster richColors />
      <Button onClick={() => toast.error("Could not save. Please try again.")}>
        Show notification
      </Button>
    </>
  );
}
