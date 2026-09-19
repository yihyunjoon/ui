import { Alert, AlertTitle, AlertDescription } from "@/registry/base-nova/ui/alert";

export default function Example() {
  return (
    <Alert variant="destructive" className="max-w-sm">
      <AlertTitle>Upload failed</AlertTitle>
      <AlertDescription>Check your connection and try again.</AlertDescription>
    </Alert>
  );
}
