import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Home, Search, Terminal } from "lucide-react";
import { getLocaleFromPath, Locale, localePath } from "@/lib/i18n";

type NotFoundProps = {
  locale?: Locale;
};

const copy = {
  en: {
    badge: "Routing error",
    title: "This page does not exist.",
    description:
      "The link may be outdated, the article may have moved, or the URL may be incomplete. Use one of the valid entry points below.",
    primary: "Go to home",
    secondary: "Browse articles",
    helper: "Try these paths",
    blog: "Blog index",
    categories: "Categories",
    back: "Go back",
  },
  es: {
    badge: "Error de ruta",
    title: "Esta página no existe.",
    description:
      "El enlace puede estar desactualizado, el artículo pudo cambiar de ruta o la URL está incompleta. Usa uno de los accesos válidos de abajo.",
    primary: "Ir al inicio",
    secondary: "Ver artículos",
    helper: "Prueba estas rutas",
    blog: "Índice del blog",
    categories: "Categorías",
    back: "Volver",
  },
} as const;

export default function NotFound({ locale }: NotFoundProps) {
  const location = useLocation();
  const resolvedLocale = locale ?? getLocaleFromPath(location.pathname);
  const text = copy[resolvedLocale];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--accent-foreground)/0.10),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-3 py-1 text-xs font-mono text-accent-foreground">
              <Terminal className="h-3.5 w-3.5" />
              {text.badge}
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-3 font-mono text-sm uppercase tracking-[0.35em] text-primary/75">404</p>
                <h1 className="mb-5 max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
                  {text.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {text.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={localePath(resolvedLocale, "")}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Home className="h-4 w-4" />
                    {text.primary}
                  </Link>
                  <Link
                    to={localePath(resolvedLocale, "/blog")}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <BookOpen className="h-4 w-4" />
                    {text.secondary}
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {text.back}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Search className="h-4 w-4 text-primary" />
                  {text.helper}
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <Link
                    to={localePath(resolvedLocale, "/blog")}
                    className="block rounded-lg border border-border bg-background px-4 py-3 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    /{resolvedLocale}/blog
                    <span className="mt-1 block text-xs text-muted-foreground/80">{text.blog}</span>
                  </Link>
                  <Link
                    to={localePath(resolvedLocale, "/categories")}
                    className="block rounded-lg border border-border bg-background px-4 py-3 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    /{resolvedLocale}/categories
                    <span className="mt-1 block text-xs text-muted-foreground/80">{text.categories}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
