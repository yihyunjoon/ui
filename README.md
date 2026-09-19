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

Edit component sources in `src/registry/base-nova/ui/`. The registry contains all
63 entries in the official Base Nova catalog captured on September 20, 2026,
plus Data Table, Date Picker, and Typography compositions (66 UI components).
The shared `use-mobile` hook and `utils` bring the total to 68 installable items.
The complete inventory and provenance are recorded in `src/registry/upstream.json`.

Add distributable components to `src/registry/registry.json`. Declare all package
dependencies in each item. `pnpm build` generates `public/r` using the locked
shadcn CLI before Vite copies those files into `dist/client`.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check:registry
pnpm test:install
```

The registry check validates the built schemas and compares embedded component
sources against the current source files, catching stale build artifacts. It also
checks component coverage and package/local dependency declarations. The install
test serves the build locally, installs all items into a temporary React project
using a different import alias, and typechecks that project.

## Customization and composition

- Keep UI edits in `src/registry/base-nova/ui/`; `src/components/ui/` supports the documentation shell.
- Keep shared hooks in `src/registry/hooks/` and the class utility in `src/lib/utils.ts`.
- Internal component dependencies use this registry's URLs, so installing Calendar or Sidebar also installs your customized Button.
- The original Button styling is preserved. Other primitives use official Base Nova sources, adapted to the local class utility.
- Data Table is a minimal generic TanStack Table v9 composition. Extend its feature set for filtering, sorting, selection, or pagination.
- Date Picker is controlled through `value` and `onValueChange`. Typography exports semantic heading and text primitives.
- The official Form catalog entry is empty. This project supplies `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, and `FormMessage` using React Hook Form. Compose controls with `render`, for example `<FormControl render={<Input {...field} />} />`.
- Toast uses the current Base UI Toast implementation; Sonner is also included. Mount the appropriate provider/toaster in the consuming app. Theme-aware Sonner expects a `next-themes` provider.
- Wrap tooltip consumers in `TooltipProvider`.

Official components retain the [shadcn/ui MIT license](licenses/shadcn-ui.txt).

## Automatic deployment

GitHub Actions validates pull requests targeting `main`. A push to `main` runs
those checks, deploys the `yihyunjoon-ui` Worker, and verifies that the homepage
responds and every published registry JSON matches the build. Runs are serialized
per branch to avoid overlapping deployments. Manual runs are also available;
only `main` can deploy.

Before the first deployment, add the repository Actions secret
`CLOUDFLARE_API_TOKEN`. Use a Cloudflare Workers deployment API token scoped to
the deployment account, following Cloudflare's
[GitHub Actions setup](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/).
Do not use a local Wrangler OAuth session token as a CI secret.

The production custom domain `ui.hyunjoon.net` is already managed in Cloudflare.
The workflow deploys the existing Worker without changing its domain settings.

For a local deployment with Wrangler authentication configured:

```sh
pnpm deploy
pnpm check:registry --url https://ui.hyunjoon.net
```

## Documentation

The site starts at `/docs`. Every UI component has a page at
`/docs/components/<name>` with a description, live preview, install command,
complete usage example, and guidance. The sidebar supports search and active-page
navigation, with a collapsible drawer on mobile.

Edit descriptions and guidance in `src/docs/content.json`. Edit runnable examples
in `src/docs/examples/`; the documentation shows those same files as usage code,
rewriting only the consumer import prefix. Previews are loaded per component.
Tests require one working example and documentation entry for every UI component.

To validate all documentation URLs against a running preview or production:

```sh
pnpm check:docs --url http://localhost:3000
```

CI runs this check against production after deployment, including unknown-page
404 handling. The documentation source is separate from the distributable registry.

API reference tables are generated from the installed TypeScript component types and JSDoc.
Run `pnpm docs:api` after changing component props or dependency versions. CI runs
`pnpm check:api` to prevent stale reference tables. Native DOM props are summarized;
mode-specific props remain subject to their TypeScript discriminated unions.
