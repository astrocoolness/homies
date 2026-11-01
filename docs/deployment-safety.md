# Deployment safety — HOMIES / CLIQUE

## Observed configuration incident (2026-11-01)

Vercel project `homies` (`prj_b2jrvjY82Z4Uc7ksmjgQWsTtxdfB`) recently built the **wrong source repository**, `astrocoolness/rva-guru-full-stack-platform`, at commit `92bbe122`. That app's build failed with `Cannot find module '@tailwindcss/postcss'` after Vercel executed `npm install --omit=dev`. The core project's production deployment is separate and must not be repointed to fix Homies.

**This PR modifies the `astrocoolness/homies` repository only.** A repo change alone does not fix a Vercel project linked to another repo; the Vercel Git connection still needs a separately approved project-settings change.

## Approval-gated recovery

1. Confirm who owns `homies`, `homies1`, and the `homies-delta-ten` / CLIQUE aliases. Preserve any active app and media URLs.
2. Inspect the **exact** Git repository, root directory, framework, install command, build command, output, environment targets, and production branch of each intended Vercel project.
3. For `homies`, request approval to connect to `astrocoolness/homies` at its reviewed main commit, rather than `astrocoolness/rva-guru-full-stack-platform`. Record the old connection and last known good deployment for rollback.
4. On a preview, run `npm ci --include=dev --no-audit --no-fund`, `npm run typecheck`, `npm test`, and `npm run build`; confirm the resulting TanStack Start pages, API routes, images, photo-upload behavior, and CLIQUE account linking.
5. Confirm the Vercel preview uses **this** project's `package-lock.json`, `vite.config.ts`, and `vercel.json`. A Next.js `next build` log means the wrong project is still being built.
6. Only after review, configure the intended production branch and release. Keep production promotion, aliases, environment variables, schema changes, and credential changes behind explicit approval.

## Migration separation

`npm run build` now builds assets and server code only. It no longer executes `scripts/migrate.mjs`; this prevents previews and builds from silently writing a production database.

A planned migration requires an approved database target, backup, maintenance/rollback procedure, and a separately executed `npm run db:migrate` with scoped credentials. The migrator is transaction-aware and stores applied versions, but that is not permission to run it during every build. Applications using local PGLite continue to use their existing startup fallback.

## Regression checks

Run `npm test` (includes `scripts/deployment-safety.test.mjs`), `npm run typecheck`, `npm run build` in a clean environment. Separately test the production/preview browser journeys before changing aliases.

## Current limits

No Vercel project setting, domain, database, secret, or production deployment is changed by this branch. It does not claim that existing network image providers or all CLIQUE/Homies features are healthy.
