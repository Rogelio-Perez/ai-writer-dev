# Articles Workflow

This file defines the required workflow for generating, reviewing, and publishing blog articles in this repository.

## Branch Policy

- All article work must be created on the `articles` branch.
- Never generate or publish new article content directly on `main`.
- `main` is production-ready content only.

## Default Article Flow

When asked to create an article, the expected flow is:

1. Checkout the `articles` branch.
2. Make sure article generation happens there, not on `main`.
3. Generate the article content using the repository workflow and prompt constraints.
4. Generate the hero image using the configured GPT image workflow.
5. Save or update:
   - `content/drafts/<slug>.json`
   - `public/articles/<slug>.png`
   - `src/data/posts.ts`
6. Keep the result in `articles` for review.
7. Wait for explicit user validation before merging to `main`.

## Approval Rule

- Every article requires manual user approval before it can go to `main`.
- User approval is required even if:
  - the article was generated successfully
  - the image looks correct
  - the article was published to LinkedIn

## LinkedIn Rule

- LinkedIn publication is separate from merge approval.
- Publishing to LinkedIn does not mean the article is approved for `main`.
- Default behavior: do not publish to LinkedIn automatically.
- LinkedIn publication should happen only after approval.
- To publish to LinkedIn intentionally, the generation command must include `--publish-linkedin`.

## Script Safety Rules

- The article generation script must fail if it is run outside the `articles` branch.
- The default required branch is `articles`.
- The script must not publish to LinkedIn unless explicitly requested.

## Content Quality Expectations

- Articles must be bilingual (`en` and `es`) when generated through the current workflow.
- Articles must be useful, technical, and suitable for a production developer blog.
- Dummy content, weak experiments, and disposable test articles must not remain in production content.
- Generated assets and drafts that are rejected must be removed before final cleanup.

## Safe Operational Defaults

If the user says only “create an article about X”, assume the following unless they say otherwise:

- Work on `articles`
- Generate the article draft
- Generate the hero image
- Update the repository files
- Do not merge to `main`
- Leave the result ready for review

## Suggested User Commands

Examples of short requests that should still follow this workflow:

- `Create an article about RAG evaluation`
- `Generate a new article for the blog`
- `Write an article about AI agents`
- `Create and prepare an article, but wait for my approval`

In all of those cases, the branch policy and approval rule still apply.
