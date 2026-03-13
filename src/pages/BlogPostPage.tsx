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
import { AffiliateBlock } from "@/components/blog/MonetizationBlocks";
import { Clock, ArrowLeft, Tag } from "lucide-react";

export default function BlogPostPage() {
  const { locale } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Post not found</h1>
          <Link to={localePath(locale, "/blog")} className="text-primary mt-4 inline-block">
            ← Back to blog
          </Link>
        </div>
      </BlogLayout>
    );
  }

  const content = post.content[locale];
  const headings = extractHeadings(content);
  const category = categories.find((c) => c.id === post.category);
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <BlogLayout>
      <SEOHead
        title={post.title[locale]}
        description={post.excerpt[locale]}
        locale={locale}
        type="article"
        article={{
          publishedTime: post.publishedAt,
          author: post.author,
          tags: post.tags,
        }}
      />

      <article className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to={localePath(locale, "/blog")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {t(locale, "nav.blog")}
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mb-10">
          {category && (
            <Link
              to={localePath(locale, `/blog?category=${category.slug}`)}
              className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-tag text-tag-foreground mb-4"
            >
              {category.icon} {category.name[locale]}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground leading-tight mb-4">
            {post.title[locale]}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{post.excerpt[locale]}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} {t(locale, "blog.readTime")}
            </span>
          </div>
        </header>

        {/* Content + Sidebar */}
        <div className="flex gap-10 lg:flex-row flex-col-reverse">
          <div className="flex-1 max-w-3xl">
            <MarkdownRenderer content={content} />

            {/* Monetization example */}
            <AffiliateBlock
              title={locale === "es" ? "¿Quieres construir apps con IA?" : "Want to build apps with AI?"}
              description={locale === "es" ? "Prueba Lovable gratis y construye tu próximo proyecto en minutos." : "Try Lovable for free and build your next project in minutes."}
              link="https://lovable.dev"
              cta={locale === "es" ? "Probar Gratis" : "Try Free"}
            />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 lg:sticky lg:top-24 lg:self-start">
            <TableOfContents headings={headings} />
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-display font-bold text-foreground mb-6">{t(locale, "section.related")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
