import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/base-nova/ui/tabs";

export default function Example() {
  return (
    <Tabs orientation="vertical" defaultValue="overview" className="w-full max-w-sm">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-lg border p-4 text-sm">
        Your project is ready to share.
      </TabsContent>
      <TabsContent value="activity" className="rounded-lg border p-4 text-sm">
        No new activity today.
      </TabsContent>
    </Tabs>
  );
}
