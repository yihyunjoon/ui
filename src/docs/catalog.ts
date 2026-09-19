import registry from "#/registry/registry.json";

import content from "./content.json";

export type ComponentName = keyof typeof content;
export const componentDocs = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => ({
    ...item,
    name: item.name as ComponentName,
    ...content[item.name as ComponentName],
  }));
export function findComponentDoc(name: string) {
  return componentDocs.find((item) => item.name === name);
}

const sources = import.meta.glob<string>("./examples/*.tsx", { query: "?raw", import: "default" });
export async function loadExampleSource(name: ComponentName) {
  const source = await sources[`./examples/${name}.tsx`]();
  return source.replaceAll("@/registry/base-nova/ui/", "@/components/ui/");
}

const apis = import.meta.glob<import("#/components/api-reference").ApiPart[]>("./api/*.json", {
  import: "default",
});
export async function loadApiReference(name: ComponentName) {
  return apis[`./api/${name}.json`]();
}
