import { Button } from "@/registry/base-nova/ui/button";
import { Toaster, toast } from "@/registry/base-nova/ui/toast";

export default function Example() {
  return (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            title: "Upload failed",
            description: "Check your connection and try again.",
            type: "error",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  );
}
