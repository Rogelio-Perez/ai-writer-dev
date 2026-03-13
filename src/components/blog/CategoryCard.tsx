import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { localePath } from "@/lib/i18n";
import { Category } from "@/data/categories";
import { motion } from "framer-motion";

export default function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  const { locale } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Link
        to={localePath(locale, `/blog?category=${category.slug}`)}
        className="block p-5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all duration-300 group"
      >
        <div className="text-3xl mb-3">{category.icon}</div>
        <h3 className="font-display font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {category.name[locale]}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{category.description[locale]}</p>
        <span className="text-xs font-mono text-muted-foreground mt-3 block">
          {category.postCount} posts
        </span>
      </Link>
    </motion.div>
  );
}
