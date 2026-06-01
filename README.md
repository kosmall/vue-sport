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
- EJS templating engine (Express SSR for landing page, asset injection for SPA)
- Vitest
- Playwright

## Architecture

The app splits rendering responsibilities between EJS and Vue based on content type:

- **Landing page** (`/`): server-rendered by EJS. No JavaScript required, fast load, crawler-friendly.
- **Browser app** (`/leagues` and deeper): a Vue 3 SPA. All data comes from TheSportsDB API
  client-side, where Vue's reactivity and TanStack Query caching add real value. SSR for
  these views would require duplicating API calls server-side with minimal gain, since the
  data is dynamic and user-driven.

Static presentational content lives in EJS, dynamic data-driven views live in Vue.

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

To run the full server (Express + EJS landing page):

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
