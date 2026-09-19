import { Alert, AlertTitle, AlertDescription } from "@/registry/base-nova/ui/alert";

export default function Example() {
  return (
    <Alert className="max-w-sm">
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your preferences are ready for the next session.</AlertDescription>
    </Alert>
  );
}
