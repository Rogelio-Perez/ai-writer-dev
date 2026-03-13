import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/i18n";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";
import SEOHead from "@/components/blog/SEOHead";
import BlogLayout from "@/components/blog/BlogLayout";

export default function BlogListPage() {
  const { locale } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeCategory = searchParams.get("category") || "";

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title[locale].toLowerCase().includes(q) ||
          p.excerpt[locale].toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.includes(q))
      );
    }
    return result;
  }, [activeCategory, search, locale]);

  return (
    <BlogLayout>
      <SEOHead title={t(locale, "nav.blog")} description={t(locale, "hero.subtitle")} locale={locale} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">{t(locale, "nav.blog")}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {t(locale, "category.all")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.icon} {cat.name[locale]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">{t(locale, "search.noResults")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
