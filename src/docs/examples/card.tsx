import { Button } from "@/registry/base-nova/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/base-nova/ui/card";

export default function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Your workspace</CardTitle>
        <CardDescription>A place to collect your next ideas.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Invite your team and start a new project.</p>
      </CardContent>
      <CardFooter>
        <Button>Create project</Button>
      </CardFooter>
    </Card>
  );
}
