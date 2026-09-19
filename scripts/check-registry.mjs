import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

import { registryItemSchema, registrySchema } from "shadcn/schema";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const source = registrySchema.parse(await readJson("src/registry/registry.json"));
const catalog = registrySchema.parse(await readJson("dist/client/r/registry.json"));
assert.deepEqual(catalog, source, "The built catalog is stale.");

const expected = new Map([["/r/registry.json", catalog]]);
for (const definition of source.items) {
  const item = registryItemSchema.parse(await readJson(`dist/client/r/${definition.name}.json`));
  assert.equal(item.name, definition.name);
  assert.deepEqual(item.dependencies, definition.dependencies);
  assert.equal(item.files.length, definition.files.length);
  for (const file of definition.files) {
    const built = item.files.find((candidate) => candidate.path === file.path);
    assert.ok(built, `Missing file: ${file.path}`);
    assert.equal(built.content, await readFile(file.path, "utf8"), `Stale file: ${file.path}`);
  }
  expected.set(`/r/${definition.name}.json`, item);
}

const urlIndex = process.argv.indexOf("--url");
if (urlIndex !== -1) {
  const baseUrl = new URL(process.argv[urlIndex + 1]);
  for (let attempt = 1; ; attempt++) {
    try {
      const home = await fetch(baseUrl, { signal: AbortSignal.timeout(15000) });
      assert.equal(home.status, 200, "The homepage is unavailable.");
      await home.body?.cancel();
      for (const [path, json] of expected) {
        const response = await fetch(new URL(path, baseUrl), {
          signal: AbortSignal.timeout(15000),
          headers: { "Cache-Control": "no-cache" },
        });
        assert.equal(response.status, 200, `${path} is unavailable.`);
        const schema = path === "/r/registry.json" ? registrySchema : registryItemSchema;
        assert.deepEqual(
          schema.parse(await response.json()),
          json,
          `${path} does not match this build.`,
        );
      }
      break;
    } catch (error) {
      if (attempt === 12) throw error;
      console.log(`Waiting for the deployment to propagate (${attempt}/12).`);
      await setTimeout(5000);
    }
  }
}

console.log(
  `Verified ${source.items.length} registry item(s)${urlIndex === -1 ? " in dist/client" : " on the deployed site"}.`,
);
