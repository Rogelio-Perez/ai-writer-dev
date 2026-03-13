import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { localePath, t } from "@/lib/i18n";
import { BlogPost } from "@/data/posts";
import { categories } from "@/data/categories";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PostCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export default function PostCard({ post, index = 0, featured }: PostCardProps) {
  const { locale } = useLocale();
  const category = categories.find((c) => c.id === post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`group rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300 overflow-hidden ${featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
    >
      <div className={`bg-surface aspect-video flex items-center justify-center text-4xl ${featured ? "md:aspect-auto md:min-h-[280px]" : ""}`}>
        {category?.icon ?? "📝"}
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {category && (
            <span className="text-xs font-mono px-2 py-1 rounded bg-tag text-tag-foreground">
              {category.name[locale]}
            </span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} {t(locale, "blog.readTime")}
          </span>
        </div>
        <h3 className={`font-display font-bold text-card-foreground group-hover:text-primary transition-colors ${featured ? "text-xl" : "text-lg"}`}>
          <Link to={localePath(locale, `/blog/${post.slug}`)}>
            {post.title[locale]}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt[locale]}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
          <Link
            to={localePath(locale, `/blog/${post.slug}`)}
            className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
