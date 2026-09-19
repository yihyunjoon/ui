import { useId, useState } from "react";

import type { ComponentName } from "#/docs/catalog";
import { ComponentPreview } from "#/docs/preview";
import variants from "#/docs/variant-content.json";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "#/registry/base-nova/ui/tabs";

import { CodeBlock } from "./code-block";

export function ExampleViewer({
  name,
  code,
  variantCode,
}: {
  name: ComponentName;
  code: string;
  variantCode?: string;
}) {
  const [variant, setVariant] = useState(false);
  const selectId = useId();
  return (
    <div className="space-y-4">
      {variantCode && (
        <div className="space-y-2">
          <label htmlFor={selectId} className="mr-3 text-sm font-medium">
            Example
          </label>
          <select
            id={selectId}
            value={variant ? "variant" : "basic"}
            onChange={(event) => setVariant(event.target.value === "variant")}
            className="max-w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="basic">Basic</option>
            <option value="variant">{variants[name].title}</option>
          </select>
          <p className="text-sm text-muted-foreground">
            {variant ? variants[name].description : "A minimal example to get started."}
          </p>
        </div>
      )}
      <Tabs defaultValue="preview">
        <TabsList aria-label="Example view">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" keepMounted>
          <ComponentPreview name={name} variant={variant} />
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={variant && variantCode ? variantCode : code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
