import { Button } from "@/registry/base-nova/ui/button";
import { Toaster, toast } from "@/registry/base-nova/ui/toast";

export default function Example() {
  return (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            title: "Saved",
            description: "Your preferences were updated.",
            type: "success",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  );
}
