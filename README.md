# vue-sport

A small fotball team browser. Lets you browse sports leagues, filter them by
name, pick one, and explore the teams inside. Clicking a team opens a detail
page with a short description, stadium info, and social links - all pulled from
[TheSportsDB](https://www.thesportsdb.com/) free API.

Live: https://kosmall.github.io/vue-sport/

## Tech

- Vue 3 + TypeScript
- Vite
- Vue Router
- TanStack Query for data fetching and caching
- Tailwind CSS
- Axios
- EJS templating engine for the Express server entry point
- Vitest
- Playwright

## Getting started

Requires Node 22+.

```bash
npm install
npm run dev
```

By default the app uses API key `3` (TheSportsDB free tier). To use a different
(for eg. premium) key, set it before starting:

```bash
VITE_API_KEY=your_key
```

There is also an Express server that serves the built SPA using EJS to inject
the correct hashed asset paths from the Vite manifest:

```bash
npm run build
npm run server
```

## Tests

Unit tests (Vitest):

```bash
npm run test:unit
```

End-to-end tests (Playwright - install the browser once before first run):

```bash
npx playwright install chromium
npm run test:e2e
```

## CI/CD

Pull requests to `master` run unit and E2E tests automatically. On merge to
`master`, the app is built and deployed to GitHub Pages.
