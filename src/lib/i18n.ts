export type Locale = "en" | "es";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["en", "es"];

const translations = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.categories": "Categories",
    "nav.search": "Search...",
    "hero.tagline": "AI for Developers & Builders",
    "hero.subtitle": "Learn to use AI tools to boost your productivity, automate workflows, and build better software.",
    "hero.cta": "Explore Articles",
    "hero.cta2": "Browse Categories",
    "section.featured": "Featured Posts",
    "section.latest": "Latest Posts",
    "section.categories": "Categories",
    "section.related": "Related Posts",
    "blog.readTime": "min read",
    "blog.toc": "Table of Contents",
    "blog.share": "Share",
    "blog.viewAll": "View All",
    "footer.tagline": "AI for developers and builders.",
    "footer.rights": "All rights reserved.",
    "search.placeholder": "Search articles...",
    "search.noResults": "No articles found.",
    "category.all": "All",
  },
  es: {
    "nav.home": "Inicio",
    "nav.blog": "Blog",
    "nav.categories": "Categorías",
    "nav.search": "Buscar...",
    "hero.tagline": "IA para Developers y Builders",
    "hero.subtitle": "Aprende a usar herramientas de IA para aumentar tu productividad, automatizar flujos de trabajo y construir mejor software.",
    "hero.cta": "Explorar Artículos",
    "hero.cta2": "Ver Categorías",
    "section.featured": "Posts Destacados",
    "section.latest": "Últimos Posts",
    "section.categories": "Categorías",
    "section.related": "Posts Relacionados",
    "blog.readTime": "min lectura",
    "blog.toc": "Tabla de Contenidos",
    "blog.share": "Compartir",
    "blog.viewAll": "Ver Todos",
    "footer.tagline": "IA para developers y builders.",
    "footer.rights": "Todos los derechos reservados.",
    "search.placeholder": "Buscar artículos...",
    "search.noResults": "No se encontraron artículos.",
    "category.all": "Todos",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(en|es)/);
  return (match?.[1] as Locale) ?? defaultLocale;
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}
