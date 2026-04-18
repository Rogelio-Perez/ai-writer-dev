import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { localePath, t } from "@/lib/i18n";
import { BlogPost } from "@/data/posts";
import { categories } from "@/data/categories";
import { getReadingTime } from "@/lib/utils";
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
  const readTime = post.readTime ?? getReadingTime(post.content[locale]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 ${featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
    >
      <div className={`bg-surface aspect-video overflow-hidden ${featured ? "md:aspect-auto md:min-h-[280px]" : ""}`}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title[locale]}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            {category?.icon ?? "Post"}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="rounded bg-tag px-2 py-1 text-xs font-mono text-tag-foreground">
              {category.name[locale]}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {readTime} {t(locale, "blog.readTime")}
          </span>
        </div>

        <h3 className={`font-display font-bold text-card-foreground transition-colors group-hover:text-primary ${featured ? "text-xl" : "text-lg"}`}>
          <Link to={localePath(locale, `/blog/${post.slug}`)}>{post.title[locale]}</Link>
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt[locale]}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
          <Link
            to={localePath(locale, `/blog/${post.slug}`)}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            Read <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
