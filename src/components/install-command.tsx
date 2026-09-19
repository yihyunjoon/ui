import { Tabs, TabsList, TabsTrigger, TabsContent } from "#/registry/base-nova/ui/tabs";

import { CodeBlock } from "./code-block";

const runners = { pnpm: "pnpm dlx", npm: "npx", yarn: "yarn dlx", bun: "bunx" };
export function InstallCommand({ command }: { command: string }) {
  return (
    <Tabs defaultValue="pnpm">
      <TabsList aria-label="Package manager">
        {Object.keys(runners).map((name) => (
          <TabsTrigger key={name} value={name}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(runners).map(([name, runner]) => (
        <TabsContent key={name} value={name}>
          <CodeBlock language="shellscript" code={`${runner} shadcn@latest ${command}`} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
