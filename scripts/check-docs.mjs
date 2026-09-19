import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const registry = JSON.parse(await readFile("src/registry/registry.json", "utf8"));
const content = JSON.parse(await readFile("src/docs/content.json", "utf8"));
const baseUrl = process.argv[process.argv.indexOf("--url") + 1];
assert.ok(process.argv.includes("--url") && baseUrl, "Usage: pnpm check:docs --url <origin>");
const components = registry.items.filter((item) => item.type === "registry:ui");
async function readPage(path, status = 200) {
  const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, status, `${path}: unexpected HTTP status`);
  const html = await response.text();
  assert.ok(!html.includes('data-msg="'), `${path}: server-side preview rendering failed`);
  return html;
}
const home = await readPage("/");
assert.match(home, /Introduction/);
const intro = await readPage("/docs");
for (const { name } of components)
  assert.ok(intro.includes(`/docs/components/${name}`), `Missing navigation link for ${name}`);
await readPage("/docs/installation");
for (let start = 0; start < components.length; start += 4) {
  await Promise.all(
    components.slice(start, start + 4).map(async (item) => {
      const html = await readPage(`/docs/components/${item.name}`);
      assert.ok(
        html.includes(`<title>${item.title} — yihyunjoon/ui</title>`),
        `${item.name}: wrong title`,
      );
      assert.ok(
        html.includes(content[item.name].description),
        `${item.name}: missing introduction`,
      );
      assert.ok(html.includes('data-testid="component-preview"'), `${item.name}: missing preview`);
      assert.ok(
        html.includes(`pnpm dlx shadcn@latest add https://ui.hyunjoon.net/r/${item.name}.json`),
        `${item.name}: missing install command`,
      );
      assert.ok(
        html.includes(`@/components/ui/${item.name}`),
        `${item.name}: missing usage example`,
      );
      assert.ok(html.includes('id="guidelines"'), `${item.name}: missing usage notes`);
    }),
  );
}
await readPage("/docs/components/not-a-component", 404);
console.log(
  `Verified navigation and all ${components.length} documentation URLs, including server-rendered previews and 404 handling.`,
);
