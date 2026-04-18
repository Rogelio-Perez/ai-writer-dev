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