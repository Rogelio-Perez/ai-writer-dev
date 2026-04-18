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
- AI article draft generation with matching hero images
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

# Generate an AI draft article + hero image
npm run generate:article -- --topic "Build a RAG chatbot with Next.js" --category tutorials
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

## Article Workflow

Branch model:

- `main`: production
- `dev`: implementation and workflow changes
- `articles`: AI-generated article review

Environment:

- Copy `.env.example` to `.env`
- Set `OPENAI_API_KEY`
- Optionally keep or tune `ARTICLE_IMAGE_STYLE_PRESET` to lock hero images to one brand-consistent design system
- If your company proxy intercepts HTTPS, set `NODE_EXTRA_CA_CERTS` to your local root CA certificate file
- Set `VITE_SITE_URL` so generated article images resolve correctly in social metadata

AI article generation:

```bash
npm run generate:article -- --topic "Automate release notes with GitHub Actions" --category tutorials --slug github-actions-ai-release-notes
```

What the script does:

- generates a bilingual article draft from OpenAI
- generates a related hero image from OpenAI using a fixed visual style preset
- saves the image to `public/articles/<slug>.png`
- writes the draft JSON to `content/drafts/<slug>.json`
- appends a new entry to `src/data/posts.ts` with `image` and `imagePrompt`

Review flow:

1. Run article generation on `articles`
2. Review the generated content and image in that branch
3. Approve and merge into `main`

## TLS and Proxy Note

If Node fails with `self-signed certificate in certificate chain`, your machine likely trusts a corporate or local proxy CA in Windows but Node does not.

Preferred fix:

1. Export that root certificate to a local file such as `certs/netskope-root.cer`
2. Set `NODE_EXTRA_CA_CERTS=./certs/netskope-root.cer` in `.env`
3. Retry `npm run generate:article`

Do not use `NODE_TLS_REJECT_UNAUTHORIZED=0` as a normal workflow.
