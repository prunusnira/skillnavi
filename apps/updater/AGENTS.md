# `apps/updater`

This workspace is a React 19 single-page app built with Vite 8. It crawls GITADORA data and uploads it to the service. Read the root `AGENTS.md` for monorepo conventions.

## Structure and conventions

- UI and app entry points live under `src/`; crawler workflows are in `src/crawl/`, domain screens in `src/feature/`, and shared helpers in `src/function/`, `src/lib/`, and `src/text/`.
- Existing state uses Jotai, server data uses TanStack Query, and HTTP requests use the existing fetch/axios helpers. Follow nearby code before introducing another state or request pattern.
- The app consumes `@skillnavi/data` and `@skillnavi/ui` workspace packages. Check their exported APIs before duplicating shared behavior.
- Vite config controls the deployed base path using `ENV`; preserve that behavior when editing the build configuration.
- `README.md` lists some libraries that may not match current dependencies. Use `package.json` and actual source imports as the current reference.

## Commands

- `pnpm --filter @skillnavi/updater dev`
- `pnpm --filter @skillnavi/updater build`

Before running or changing tests, inspect the package script and test setup: this workspace currently has a `vite test` script and a Jest DOM setup file, but no workspace-level Vitest config is present.
