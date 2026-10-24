# `packages/ui`

This workspace is the shared React 19 component library, built with Vite and documented with Storybook. Read the root `AGENTS.md` for monorepo conventions.

## Structure and conventions

- Public exports are collected in `src/index.tsx`; components are grouped under `src/<component>/`.
- Keep this package usable by both `apps/service` and `apps/updater`. Check both consumers before changing exports, props, CSS, or runtime dependencies.
- React and React DOM are external library dependencies. Preserve the current library build output and avoid bundling them into the package.
- Storybook uses the React Vite framework. Stories live beside their components in `src/` and use the existing story file naming convention.
- Vitest runs Storybook stories in a headless Chromium browser through the Storybook Vitest addon. Check `.storybook/` and `vite.config.ts` before adding a separate test environment.

## Commands

- `pnpm --filter @skillnavi/ui build`
- `pnpm --filter @skillnavi/ui storybook`
- `pnpm --filter @skillnavi/ui build-storybook`

The Vite config defines a Vitest Storybook browser project, but the package currently has no `test` script. Check package scripts before choosing a test command.
