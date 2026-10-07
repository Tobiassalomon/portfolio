# Portfolio

This is an assignment for Distributed Systems, following a guest lecture.

My personal portfolio: a one-page site in TypeScript and Vite, deployed on Vercel. It started as the Launch night CI
kit from the guest lecture **CI/CD in the age of AI agents** (AAU CPH, October 2026), and keeps its CI steps.

## Edit the content

Everything the site says is in [`src/content.ts`](src/content.ts): your name, intro, about text, email, GitHub link,
projects and the list of checks. Make a branch, edit it, open a pull request, and the checks run.

## The checks

Every pull request and every push to `main` runs these workflows from `.github/workflows/`:

| Workflow               | What it checks                                | Run it locally                          |
| ---------------------- | --------------------------------------------- | --------------------------------------- |
| `01-lint.yml`          | Lint and formatting                           | `npm run lint` · `npm run format:check` |
| `02-typecheck.yml`     | TypeScript types                              | `npm run typecheck`                     |
| `03-unit-tests.yml`    | Project filter and text escaping (`src/lib/`) | `npm test`                              |
| `04-build.yml`         | The production build Vercel runs              | `npm run build`                         |
| `06-audit.yml`         | Known high-severity vulnerabilities           | `npm run audit`                         |
| `07-secret-scan.yml`   | Committed keys and passwords (gitleaks)       | needs Docker or gitleaks                |
| `08-bundle-budget.yml` | JavaScript under 10 kB gzipped                | `npm run build && npm run size`         |
| `09-a11y.yml`          | axe-core WCAG 2 AA scan, light and dark mode  | `npm run a11y`                          |

Not switched on yet, because they need setup first (see [`docs/ci-steps.md`](docs/ci-steps.md)):

- `recipes/deterministic/05-e2e-on-preview.yml` runs `tests/e2e` against each Vercel preview. Needs Vercel's
  deployment protection off or a bypass secret.
- `recipes/probabilistic/` holds the AI review steps. They need `ANTHROPIC_API_KEY` (or `AI_API_KEY`) as a repository
  secret. The spec check reads [`docs/spec.md`](docs/spec.md), which describes this portfolio.

To make the checks a gate: Settings > Rules > Rulesets > New branch ruleset > target `main` > **Require a pull request
before merging** and **Require status checks to pass** > add the checks.

## What changed from the CI kit

The ticket shop became the portfolio, and the planted problems were fixed rather than the checks removed:

- The analytics API key in `src/config.ts` is gone, and so is the beacon that sent data off the page.
- `lodash` 4.17.20 (a high-severity vulnerability, and 26 kB of the bundle) is replaced by a small tested
  `escapeHtml`.
- The logo now has alt text, and the page passes axe in light and dark mode.
- The year type error and the group discount bug went with the ticket logic.

The old key is still in the git history. It was a placeholder for the workshop, but a real key in that position should
be revoked: removing it from the files doesn't remove it from history.

## Scripts

| Script                              | What it does                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                       | Run the site on your machine                                  |
| `npm run build` · `npm run preview` | Build it like Vercel does and serve the build                 |
| `npm run test:e2e` · `npm run a11y` | Browser tests (first time: `npx playwright install chromium`) |
