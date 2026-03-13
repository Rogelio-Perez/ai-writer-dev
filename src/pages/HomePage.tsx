import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { t, localePath } from "@/lib/i18n";
import { posts, getFeaturedPosts } from "@/data/posts";
import { categories } from "@/data/categories";
import PostCard from "@/components/blog/PostCard";
import CategoryCard from "@/components/blog/CategoryCard";
import SEOHead from "@/components/blog/SEOHead";
import BlogLayout from "@/components/blog/BlogLayout";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { locale } = useLocale();
  const featured = getFeaturedPosts();
  const latest = posts.slice(0, 4);

  return (
    <BlogLayout>
      <SEOHead
        title={t(locale, "hero.tagline")}
        description={t(locale, "hero.subtitle")}
        locale={locale}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-primary/30 bg-accent/50 text-xs font-mono text-accent-foreground flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {locale === "es" ? "Blog para developers" : "Blog for developers"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6">
              <span className="gradient-text">{t(locale, "hero.tagline")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {t(locale, "hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={localePath(locale, "/blog")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                {t(locale, "hero.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={localePath(locale, "/categories")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
              >
                {t(locale, "hero.cta2")}
              </Link>
            </div>
          </motion.div>

          {/* Decorative icons */}
          <div className="absolute right-10 top-20 hidden lg:block opacity-10">
            <Code2 className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute right-40 bottom-10 hidden lg:block opacity-10">
            <Zap className="w-20 h-20 text-primary" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">{t(locale, "section.featured")}</h2>
          <Link to={localePath(locale, "/blog")} className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
            {t(locale, "blog.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.slice(0, 3).map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <h2 className="text-2xl font-display font-bold text-foreground mb-8">{t(locale, "section.latest")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <h2 className="text-2xl font-display font-bold text-foreground mb-8">{t(locale, "section.categories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>
    </BlogLayout>
  );
}
