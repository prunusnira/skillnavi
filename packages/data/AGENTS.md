# `packages/data`

This workspace contains shared non-UI code used by the applications. Read the root `AGENTS.md` for monorepo conventions.

- Check imports from both applications before changing an exported type, helper, or behavior.
- Keep browser and server assumptions explicit; the package is consumed by both a Next.js service and a Vite app.
- Follow the existing TypeScript and directory structure. This package does not currently declare package scripts, so inspect the root tooling before choosing validation commands.
