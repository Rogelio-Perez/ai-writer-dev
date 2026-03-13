import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/i18n";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/blog/CategoryCard";
import SEOHead from "@/components/blog/SEOHead";
import BlogLayout from "@/components/blog/BlogLayout";

export default function CategoriesPage() {
  const { locale } = useLocale();

  return (
    <BlogLayout>
      <SEOHead title={t(locale, "nav.categories")} description={t(locale, "hero.subtitle")} locale={locale} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">{t(locale, "section.categories")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </BlogLayout>
  );
}
