# Skill Navigator workspace

This repository is a pnpm and Turborepo monorepo. Use the package manager and conventions already present in the target workspace.

## Workspaces

- `apps/service`: Next.js App Router service. Read its `AGENTS.md` for app-specific rules.
- `apps/updater`: React and Vite data updater. Read its `AGENTS.md` for app-specific rules.
- `packages/ui`: shared React component library and Storybook. Read its `AGENTS.md` before changing it.
- `packages/data`: shared non-UI data and utility package.
- `packages/tsconfig`: shared TypeScript configurations.

The root package manager is pinned to pnpm 11.8.0. Root scripts delegate `build`, `dev`, and `lint` through Turborepo. Check the target workspace's scripts before choosing a command; scripts and test runners differ between workspaces.

## Repository conventions

- Keep changes within the requested workspace and preserve established APIs used by sibling workspaces.
- Shared package imports use `workspace:*` dependencies. Check consumers before changing exported names or types.
- Follow the root Prettier settings: single quotes, four-space indentation, trailing commas, and semicolons.
- Keep secrets and local environment files out of source control. Do not print environment file contents.
- `.agents/skills/` is the source of truth for project skills. `.claude/skills/<skill>` entries should be relative symbolic links to the matching `.agents/skills/<skill>` directory; edit skill content only in `.agents/skills/`.
