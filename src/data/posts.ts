import { Locale } from "@/lib/i18n";
import { getReadingTime } from "@/lib/utils";

export interface BlogPost {
  slug: string;
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  content: { en: string; es: string };
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime?: number;
  featured: boolean;
  image: string;
  imagePrompt?: string;
}

type DraftPost = BlogPost;

const draftModules = import.meta.glob("../../content/drafts/*.json", {
  eager: true,
  import: "default",
}) as Record<string, DraftPost>;

function sanitizeImagePrompt(prompt?: string) {
  if (!prompt) return prompt;
  return prompt.replace(/(?:\uFEFF|ï»¿)+/g, "").trim();
}

function sortByPublishedAtDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export const posts: BlogPost[] = Object.values(draftModules)
  .filter((post): post is DraftPost => Boolean(post?.slug))
  .map((post) => ({
    ...post,
    imagePrompt: sanitizeImagePrompt(post.imagePrompt),
  }))
  .sort(sortByPublishedAtDesc);

export function getPostsByLocale(locale: Locale) {
  return posts.map((post) => ({
    ...post,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    content: post.content[locale],
    readTime: getReadingTime(post.content[locale]),
  }));
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPosts() {
  const featured = posts.filter((p) => p.featured && p.image);
  if (featured.length >= 3) return featured.slice(0, 3);
  const withImage = posts.filter((p) => p.image);
  const byReadTime = posts.filter((p) => !p.image).sort((a, b) => (b.readTime || 0) - (a.readTime || 0));
  return [...withImage, ...byReadTime].slice(0, 3);
}
