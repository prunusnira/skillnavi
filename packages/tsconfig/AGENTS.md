# `packages/tsconfig`

This workspace contains shared TypeScript configuration bases. Read the root `AGENTS.md` for monorepo conventions.

- Inspect every workspace that extends a config before changing shared compiler options.
- Keep framework-specific options in the matching config (`for-next.json`, `for-react.json`, or `for-library.json`) instead of copying them into consumers without need.
- Check the affected workspace's type-check or build command after config changes; this package does not declare its own scripts.
