# AGENTS.md

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Build for production |
| `npm run lint` | ESLint |
| `npm run test` | Run tests once (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run preview` | Preview production build |

## Architecture

- **Path alias**: `@/` maps to `src/`
- **Bilingual routing**: Routes prefixed with `/:locale/` (en/es)
- **Entry point**: `src/main.tsx`
- **Routes**:
  - `/` → redirects to locale
  - `/:locale/` → home
  - `/:locale/blog` → blog list
  - `/:locale/blog/:slug` → blog post
  - `/:locale/categories` → categories
  - `/:locale/admin` → admin dashboard

## TypeScript

- `strictNullChecks: false` - null/undefined checks are not enforced
- `noImplicitAny: false` - implicit any is allowed
- Expect loose typing in this codebase

## UI Components

Uses shadcn/ui with Radix UI primitives in `src/components/ui/`. New components are added via shadcn CLI, not manually.

## Testing

Tests use Vitest + jsdom + @testing-library/react. Test files in `src/test/`.

## Article Workflow

- All new article generation work must happen on the `articles` branch.
- Never create or publish new article content directly on `main`.
- The expected article generation flow is:
  1. Switch to `articles`
  2. Generate the article draft and hero image
  3. Update `content/drafts/<slug>.json`
  4. Update `public/articles/<slug>.png`
  5. Update `src/data/posts.ts`
  6. Leave the result on `articles` for manual review
  7. Only merge to `main` after explicit user approval
- The article generation script must fail if it is run outside the `articles` branch.
- LinkedIn publication must be opt-in and explicitly requested.
- LinkedIn publication must not be treated as approval to merge into `main`.
- Dummy articles, draft-only experiments, and unused generated assets must not remain in production content.
- See `ARTICLES_WORKFLOW.md` for the full operational workflow.
