import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/i18n";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const { locale } = useLocale();

  if (headings.length === 0) return null;

  return (
    <nav className="p-4 rounded-lg border border-border bg-card">
      <h4 className="font-display font-semibold text-sm text-card-foreground mb-3">
        {t(locale, "blog.toc")}
      </h4>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
