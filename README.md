# Telegram Mini App — Frontend Portfolio Demo

A **sanitized educational portfolio sample** illustrating the frontend architecture of a Telegram Mini App with a racing-predictions user experience. Prepared for public GitHub sharing and Upwork portfolio review.

> **Portfolio disclaimer:** This is a demonstration derived from a larger private application, not a production-ready product. All known client-specific endpoints, tracking scripts, wallet destination, bot identifiers and branded illustrations have been removed or replaced. Original third-party services and backend are **not included**. Do not use real funds. Before publishing, confirm you have permission to share the underlying source code and design.

## Tech stack

- **Frontend:** React 18, TypeScript 5, Vite 6, React Router 6
- **State and API:** Redux Toolkit, React Redux, RTK Query
- **UI and styling:** SCSS/Sass, CSS Modules, Telegram UI, Radix UI, Swiper, Vaul, React Toastify
- **Telegram and Web3:** Telegram Mini Apps SDK, TON SDK, TON Connect
- **Testing and component docs:** Jest, Vitest, React Testing Library, Storybook 8, Loki, Playwright
- **Tooling and deployment examples:** ESLint, Stylelint, Prettier, Docker, Nginx
- **Other packages:** AWS SDK (DynamoDB/S3, listed as development dependencies)

## What the sample demonstrates

- Feature-oriented React application organization, reusable components and responsive UI
- Telegram Mini App initialization and development-only Telegram environment mocking
- Redux state management and API integration patterns
- TON Connect wallet connection and transaction UI integration
- Routing, onboarding, modal flows, loading and error states
- Storybook stories and automated test configuration

## Getting started

Requires **Node.js 20+** and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:3005` in a browser. Telegram environment mocking is enabled in development. Some screens and actions require the original private backend and will not work end-to-end. Configure `VITE_API_URL` to point to your own compatible mock server if needed.

### Environment configuration

| Variable | Purpose | Demo default |
| --- | --- | --- |
| `VITE_APP_PORT` | Local dev server port | `3005` |
| `VITE_ALLOWED_HOSTS` | Allowed development hostnames | `localhost` |
| `VITE_API_URL` | Compatible backend URL | `http://localhost:8000` |
| `VITE_TMA_URL` | Example Telegram Mini App link | `https://t.me/example_bot/example_app` |
| `VITE_TON_RECEIVER` | Test-only destination wallet address | empty |
| `VITE_IS_DEV` | Development diagnostics | `true` |
| `VITE_IS_STORYBOOK` | Storybook flag | `false` |
| `VITE_LOCAL_TELEGRAM_ID` | Optional local test ID | empty |

**Security:** Vite `VITE_` variables are exposed to the browser; never put API secrets, bot tokens or private keys in them. The TON receiver is intentionally unset. Do not attempt real payments using this demo.

## Commands

```bash
npm run dev            # Vite development server
npm run build          # TypeScript check and production build
npm run preview        # Preview production build
npm run lint:ts        # ESLint
npm run lint:scss      # Stylelint
npm run test:unit      # Jest unit tests
npm run storybook      # Storybook on port 6006
npm run storybook:build
```

## Project structure

```text
src/
  app/        # App bootstrap, providers, global styles
  pages/      # Route-level screens
  widgets/    # Composed interface sections
  features/   # User-facing interactions
  entities/   # Domain state and API modules
  shared/     # Reusable components, helpers and assets
config/       # Jest and Storybook configuration
public/       # Public manifest
```

## Public-release changes

- Removed original analytics and tag-manager integrations.
- Removed private GitLab-to-Harbor deployment pipeline.
- Replaced original bot, host, wallet and manifest URLs with safe placeholders.
- Replaced original raster illustrations and SVG artwork with neutral placeholders.
- Removed project-specific editor instructions and sample personal names.
- Expanded `.gitignore` to protect local secrets and environment files.

## Limitations and publishing rights

This archive is a **code portfolio sample**, not a fully independent application. It still illustrates domain-specific workflows and UI structures. Automated replacement does not prove legal ownership or permission to publish the original source. Review any employer/client agreement and remove any additional confidential business logic before making the repository public. No license is granted by this sample; add a license only if you own the code or have authorization.
