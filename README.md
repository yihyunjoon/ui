# yihyunjoon/ui

A React component registry and documentation site built with TanStack Start,
Tailwind CSS 4, and Base UI, hosted on Cloudflare Workers.

## Install a component

Initialize shadcn in the consuming project first. The components expect Tailwind
CSS 4, shadcn theme variables, and the `cn` utility created by shadcn initialization.
The CLI adapts the utility import to the consuming project's configured alias.

```sh
pnpm dlx shadcn@latest add https://ui.hyunjoon.net/r/button.json
```

The catalog is available at https://ui.hyunjoon.net/r/registry.json.

## Development

Use Node.js 22.12+ and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Add distributable components to `src/registry/registry.json`. Declare all package
dependencies in each item. `pnpm build` generates `public/r` using the locked
shadcn CLI before Vite copies those files into `dist/client`.

```sh
pnpm lint
pnpm build
pnpm check:registry
```

The registry check validates the built schemas and compares embedded component
sources against the current source files, catching stale build artifacts.

## Automatic deployment

GitHub Actions validates pull requests targeting `main`. A push to `main` runs
those checks, deploys the `yihyunjoon-ui` Worker, and verifies that the homepage
responds and every published registry JSON matches the build. Runs are serialized
per branch to avoid overlapping deployments. Manual runs are also available;
only `main` can deploy.

Before the first deployment, add the repository Actions secret
`CLOUDFLARE_API_TOKEN`. Use a Cloudflare Workers deployment API token scoped to
account `af3fc0a284268b9d46b0db62c32980c9`, following Cloudflare's
[GitHub Actions setup](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/).
Do not use a local Wrangler OAuth session token as a CI secret.

The production custom domain `ui.hyunjoon.net` is already managed in Cloudflare.
The workflow deploys the existing Worker without changing its domain settings.

For a local deployment with Wrangler authentication configured:

```sh
pnpm deploy
pnpm check:registry --url https://ui.hyunjoon.net
```
