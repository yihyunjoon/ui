import type { ComponentName } from "#/docs/catalog";
import { ComponentPreview } from "#/docs/preview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "#/registry/base-nova/ui/tabs";

import { CodeBlock } from "./code-block";

export function ExampleViewer({ name, code }: { name: ComponentName; code: string }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList aria-label="Example view">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" keepMounted>
        <ComponentPreview name={name} />
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  );
}
