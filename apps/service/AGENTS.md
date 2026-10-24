# `apps/service`

This workspace is the Skill Navigator web service, built with Next.js 15 App Router and React 19. Read the root `AGENTS.md` for monorepo conventions.

## Structure and conventions

- Routes and layouts live under `app/`; localized pages are under `app/[lang]/(common)/`, and API Route Handlers are under `app/api/`.
- Locale configuration is in `i18n/`. Use the project's `@/i18n/routing` exports for localized links and navigation where applicable.
- Domain functionality is organized under `feature/<domain>/`; reusable UI and infrastructure live in `common/` and `lib/`.
- `@/*` resolves from this workspace root. Shared packages are imported through their `@skillnavi/*` names.
- The app uses `next-intl`, `next-auth` v4, Jotai, TanStack Query, Tailwind CSS 4, and Prisma 6 with a MySQL datasource. Check the existing layer and nearby code before adding another pattern.
- `next.config.js` wraps the config with the `next-intl` plugin and transpiles `@skillnavi/ui`; preserve these integrations when changing config.
- Environment-specific scripts load `.env.dev` or `.env.prd` through `env-cmd`. Never expose those files or assume their values.

## Commands

- `pnpm --filter @skillnavi/service dev`
- `pnpm --filter @skillnavi/service build:dev` or `build`
- `pnpm --filter @skillnavi/service lint`
- `pnpm --filter @skillnavi/service test`

Vitest is configured in `vitest.config.ts` with jsdom and `vitest.setup.ts`. Check the targeted test and its neighboring tests before changing test conventions.
