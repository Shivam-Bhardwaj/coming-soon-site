# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js routes and UI components for the coming-soon experience; collocate shared hooks in `app/(components)` directories.
- `lib/`: Environment-agnostic helpers for telemetry, genetics, and nutrient logic; keep new domain modules here.
- `tests/`: Jest specs mirroring lib modules (e.g., `genetics.test.ts`); use `__mocks__/` for complex data fixtures.
- `deploy.sh` and `vercel.json`: Reference deployment workflow; update both when changing runtime settings or headers.

## Build, Test, and Development Commands
- `npm run dev`: Launches the Next dev server on localhost with hot reload; watch console for ESLint hints.
- `npm run build`: Production bundle plus type checks—run before pushing to ensure CI parity.
- `npm run start`: Serves the optimized build; use for smoke tests that mimic Vercel.
- `npm run lint`: Runs `next lint` with the repo ESLint config to catch stylistic drift.
- `npm test`: Executes the Jest suite defined in `jest.config.js` against `tests/`.

## Coding Style & Naming Conventions
- TypeScript everywhere; prefer explicit types on exported functions and public props.
- 2-space indentation, single quotes in TS/JS, and kebab-case for file names inside `app/` route segments.
- Components live with their styles; use descriptive PascalCase names (e.g., `TelemetryPanel`).
- Run `npm run lint` before committing; fix violations rather than suppressing unless documented.

## Testing Guidelines
- Jest + jsdom environment; add new specs beside the module under test within `tests/` and mirror filenames.
- Name tests after scenarios (`describe('mutation spread')`).
- Include regression cases when changing telemetry math; mock network calls via `tests/__mocks__`.
- Aim for coverage on all exported helpers; reject PRs when new code lacks tests.

## Commit & Pull Request Guidelines
- Follow the existing imperative style (`Refactor telemetry cache`) and keep messages under ~72 chars.
- Each PR should describe the change, link to tracking issues, and include before/after screenshots for UI tweaks.
- Mention any config or migration steps explicitly (env vars, Vercel settings) and note manual verification steps.

## Deployment & Configuration Notes
- Use `deploy.sh` locally to reproduce the Vercel build (Next + static export checks).
- Update `vercel.json` when introducing new routes or headers; document required secrets in the PR description.
