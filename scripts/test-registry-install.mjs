import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(await readFile("src/registry/registry.json", "utf8"));
const project = JSON.parse(await readFile("package.json", "utf8"));
const directory = await mkdtemp(path.join(tmpdir(), "ui-registry-consumer-"));
const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: directory,
      stdio: "inherit",
      env: { ...process.env, CI: "true" },
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} failed: ${code}`)),
    );
  });
const server = createServer(async (request, response) => {
  try {
    assert.match(request.url, /^\/r\/[a-z-]+\.json$/);
    const item = JSON.parse(await readFile(path.join(root, "dist/client", request.url), "utf8"));
    if (item.registryDependencies)
      item.registryDependencies = item.registryDependencies.map((url) =>
        url.replace(registry.homepage, baseUrl),
      );
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(item));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;
try {
  await mkdir(path.join(directory, "src"));
  await writeFile(
    path.join(directory, "package.json"),
    JSON.stringify({
      name: "registry-consumer-test",
      private: true,
      type: "module",
      packageManager: project.packageManager,
      dependencies: {
        react: project.dependencies.react,
        "react-dom": project.dependencies["react-dom"],
        tailwindcss: project.dependencies.tailwindcss,
      },
      devDependencies: {
        typescript: project.devDependencies.typescript,
        "@types/react": project.devDependencies["@types/react"],
        "@types/react-dom": project.devDependencies["@types/react-dom"],
      },
    }),
  );
  await writeFile(
    path.join(directory, "components.json"),
    JSON.stringify({
      $schema: "https://ui.shadcn.com/schema.json",
      style: "base-nova",
      rsc: false,
      tsx: true,
      tailwind: { css: "src/styles.css", baseColor: "neutral", cssVariables: true, prefix: "" },
      aliases: {
        components: "@/components",
        ui: "@/components/ui",
        lib: "@/lib",
        utils: "@/lib/utils",
        hooks: "@/hooks",
      },
      iconLibrary: "lucide",
    }),
  );
  await writeFile(path.join(directory, "src/styles.css"), '@import "tailwindcss";\n');
  await writeFile(
    path.join(directory, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        paths: { "@/*": ["./src/*"] },
        lib: ["ES2022", "DOM", "DOM.Iterable"],
      },
      include: ["src"],
    }),
  );
  await run("pnpm", ["install", "--no-frozen-lockfile"]);
  await run(process.execPath, [
    path.join(root, "node_modules/shadcn/dist/index.js"),
    "add",
    ...registry.items.map((item) => `${baseUrl}/r/${item.name}.json`),
    "--yes",
    "--overwrite",
  ]);
  for (const item of registry.items) {
    const target =
      item.type === "registry:ui"
        ? `src/components/ui/${item.name}.tsx`
        : item.name === "utils"
          ? "src/lib/utils.ts"
          : "src/hooks/use-mobile.ts";
    assert.ok(
      (await readFile(path.join(directory, target), "utf8")).length > 0,
      `Missing installed file: ${target}`,
    );
  }
  await run("pnpm", ["exec", "tsc", "--noEmit"]);
  console.log(
    `Installed and typechecked all ${registry.items.length} items in a clean consumer project.`,
  );
} finally {
  server.close();
  await rm(directory, { recursive: true, force: true });
}
