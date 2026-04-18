# AI Article Generation Prompts

This file contains prompt templates for generating blog articles about AI tools and developer productivity.

---

## Prompt Template: Full Article Generation

Generate a complete blog article in **{{LANGUAGE}}** about **{{TOPIC}}**.

### Requirements:

1. **Title**: Create an engaging, SEO-friendly title (50-60 chars)
2. **Excerpt**: 150-160 character summary for meta description
3. **Content Structure**:
   - Introduction (hook + context)
   - What is [topic]?
   - Why it matters (with stats/data if possible)
   - Step-by-step tutorial or how-to guide
   - Use cases (bullet points with emojis)
   - Pros and Cons (balanced)
   - Conclusion (call to action)

4. **Technical Details**:
   - Include code examples where relevant
   - Use proper markdown formatting
   - Include tables for comparisons when applicable
   - Add relevant tags for categorization

5. **Tone**: Professional but approachable, developer-focused

### Output Format:
Return JSON with:
- title: { en: "...", es: "..." }
- excerpt: { en: "...", es: "..." }
- content: { en: "...", es: "..." }
- tags: [...]
- category: "..."

**Note**: Do not include `readTime` - it will be calculated automatically based on the content length (approximately 200 words per minute).

---

## Prompt Template: Article Outline

Generate a detailed outline for a blog article about **{{TOPIC}}** targeting developers.

Include:

- Main sections with 2-3 subsections each
- Key points to cover in each section
- Suggested code examples or demos
- Potential SEO keywords to include

---

## Prompt Template: SEO Optimization

For the article: **{{ARTICLE_TITLE}}**

Generate:

1. SEO title (under 60 characters)
2. Meta description (150-160 characters)
3. 5-7 relevant tags
4. Suggested internal links to existing articles

---

## Example: Best AI Tools for Developers

```
Write a comprehensive article comparing the top AI coding assistants for developers in 2025.

Target audience: Software developers, tech leads, bootcamp students
Language: English (also provide Spanish translation)
Tone: Practical, hands-on

Include:
- Feature comparison table
- Pricing comparison
- Pros/cons for each tool
- Use case recommendations
- Code snippet examples
- Real-world productivity stats

Tools to cover: GitHub Copilot, Cursor, Claude Code, Windsurf

Make it actionable - readers should know which tool fits their needs.
```

---

## Categories

- `ai-tools` - AI development tools and assistants
- `tutorials` - Step-by-step how-to guides
- `productivity` - Developer productivity tips
- `automation` - Workflow automation
- `guides` - Comparison and recommendation articles
- `news` - Industry news and updates
- `machine-learning` - ML concepts, models, and implementations
- `apis` - AI API integrations and implementations

---

## Tags Guidelines

Use 3-6 relevant tags per article:

- Tool names (e.g., "copilot", "cursor", "claude")
- Topics (e.g., "productivity", "automation", "tutorial")
- Categories (e.g., "ai", "beginner", "advanced")
- Use cases (e.g., "code-review", "debugging", "learning")
