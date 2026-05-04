import { useParams, Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { t, localePath } from "@/lib/i18n";
import { getPostBySlug, posts } from "@/data/posts";
import { categories } from "@/data/categories";
import MarkdownRenderer, { extractHeadings } from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import PostCard from "@/components/blog/PostCard";
import SEOHead from "@/components/blog/SEOHead";
import BlogLayout from "@/components/blog/BlogLayout";
import { resolveImageUrl } from "@/lib/site";
import { getReadingTime } from "@/lib/utils";
import { Clock, ArrowLeft, Tag } from "lucide-react";
import NotFound from "./NotFound";

export default function BlogPostPage() {
  const { locale } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return <NotFound locale={locale} />;
  }

  const content = post.content[locale];
  const headings = extractHeadings(content);
  const category = categories.find((c) => c.id === post.category);
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);
  const imageUrl = resolveImageUrl(post.image);
  const readTime = post.readTime ?? getReadingTime(content);

  return (
    <BlogLayout>
      <SEOHead
        title={post.title[locale]}
        description={post.excerpt[locale]}
        image={imageUrl}
        locale={locale}
        type="article"
        article={{
          publishedTime: post.publishedAt,
          author: post.author,
          tags: post.tags,
        }}
      />

      <article className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to={localePath(locale, "/blog")}
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t(locale, "nav.blog")}
          </Link>
        </div>

        <header className="mb-10 max-w-3xl">
          {category && (
            <Link
              to={localePath(locale, `/blog?category=${category.slug}`)}
              className="mb-4 inline-flex items-center gap-1 rounded bg-tag px-2.5 py-1 text-xs font-mono text-tag-foreground"
            >
              {category.icon} {category.name[locale]}
            </Link>
          )}

          <h1 className="mb-4 text-3xl font-display font-extrabold leading-tight text-foreground md:text-4xl">
            {post.title[locale]}
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">{post.excerpt[locale]}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime} {t(locale, "blog.readTime")}
            </span>
          </div>
        </header>

        <div className="flex flex-col-reverse gap-10 lg:flex-row">
          <div className="max-w-3xl flex-1">
            {post.image && (
              <div className="mb-8 overflow-hidden rounded-xl border border-border bg-surface">
                <img
                  src={post.image}
                  alt={post.title[locale]}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <MarkdownRenderer content={content} />

            <div className="mt-10 border-t border-border pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded bg-secondary px-2 py-1 text-xs font-mono text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="shrink-0 lg:sticky lg:top-24 lg:w-72 lg:self-start">
            <TableOfContents headings={headings} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 text-xl font-display font-bold text-foreground">{t(locale, "section.related")}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </BlogLayout>
  );
}
