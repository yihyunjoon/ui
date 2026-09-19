import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

import { registryItemSchema, registrySchema } from "shadcn/schema";
import ts from "typescript";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const source = registrySchema.parse(await readJson("src/registry/registry.json"));
const catalog = registrySchema.parse(await readJson("dist/client/r/registry.json"));
assert.deepEqual(catalog, source, "The built catalog is stale.");

const coverage = await readJson("src/registry/upstream.json");
const requiredNames = [...coverage.components, ...coverage.composed, "use-mobile", "utils"].sort();
assert.deepEqual(
  source.items.map((item) => item.name).sort(),
  requiredNames,
  "Registry coverage differs from the official component inventory.",
);
const owners = new Map(
  source.items.flatMap((item) =>
    item.files.map((file) => [file.path.replace(/\.tsx?$/, ""), item.name]),
  ),
);
const packageName = (specifier) => specifier.match(/^(@[^/]+\/[^/@]+|[^/@]+)/)?.[0];
const packageJson = await readJson("package.json");
for (const item of source.items) {
  const packages = new Set((item.dependencies ?? []).map(packageName));
  const registryDependencies = new Set(item.registryDependencies ?? []);
  for (const dependency of registryDependencies) {
    const name = dependency.replace(`${source.homepage}/r/`, "").replace(/\.json$/, "");
    assert.ok(
      requiredNames.includes(name),
      `${item.name}: unknown registry dependency ${dependency}`,
    );
    assert.equal(
      dependency,
      `${source.homepage}/r/${name}.json`,
      `${item.name}: dependency must use this registry`,
    );
  }
  for (const file of item.files) {
    const content = await readFile(file.path, "utf8");
    assert.ok(!content.includes("IconPlaceholder"), `${file.path}: unresolved upstream icon`);
    for (const { fileName: specifier } of ts.preProcessFile(content).importedFiles) {
      if (specifier.startsWith("@/") || specifier.startsWith("#/")) {
        const owner = owners.get(`src/${specifier.slice(2).replace(/\.tsx?$/, "")}`);
        assert.ok(owner, `${file.path}: unregistered local import ${specifier}`);
        if (owner !== item.name)
          assert.ok(
            registryDependencies.has(`${source.homepage}/r/${owner}.json`),
            `${item.name}: missing registry dependency ${owner}`,
          );
      } else {
        assert.ok(
          !specifier.startsWith("."),
          `${file.path}: use a registry alias for portable imports`,
        );
        const name = packageName(specifier);
        if (["react", "react-dom"].includes(name)) continue;
        assert.ok(packages.has(name), `${item.name}: missing package dependency ${name}`);
        assert.ok(packageJson.dependencies[name], `${item.name}: package ${name} is not installed`);
      }
    }
  }
}

const expected = new Map([["/r/registry.json", catalog]]);
for (const definition of source.items) {
  const item = registryItemSchema.parse(await readJson(`dist/client/r/${definition.name}.json`));
  for (const [key, value] of Object.entries(definition)) {
    if (key !== "files") assert.deepEqual(item[key], value, `${definition.name}: stale ${key}`);
  }
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
