# AI Writer Dev Blog

A bilingual (English/Spanish) blog application for developers built with React, TypeScript, and shadcn-ui.

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **SEO**: React Helmet Async
- **Data**: TanStack React Query
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Playwright

## Features

- Bilingual support (English/Spanish) with locale routing
- Blog posts with markdown rendering
- Category-based content organization
- Featured and latest posts sections
- SEO meta tags per page
- Responsive design
- Admin dashboard page

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

```
src/
├── components/
│   ├── blog/      # Blog-specific components
│   └── ui/        # shadcn/ui components
├── contexts/      # React contexts
├── data/          # Static data (posts, categories)
├── hooks/         # Custom hooks
├── lib/           # Utilities and i18n
├── pages/         # Route pages
└── main.tsx       # App entry point
```

## Routes

- `/` - Redirects to locale (en/es)
- `/:locale/` - Home page
- `/:locale/blog` - Blog list
- `/:locale/blog/:slug` - Blog post
- `/:locale/categories` - Categories page
- `/:locale/categories` - Categories page