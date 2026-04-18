import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { t, localePath, Locale } from "@/lib/i18n";
import { Search, Menu, X, Globe, Terminal } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogLayout({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const otherLocale: Locale = locale === "en" ? "es" : "en";

  const navItems = [
    { label: t(locale, "nav.home"), path: localePath(locale, "") },
    { label: t(locale, "nav.blog"), path: localePath(locale, "/blog") },
    { label: t(locale, "nav.categories"), path: localePath(locale, "/categories") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={localePath(locale, "")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Dev<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const currentPath = window.location.pathname.replace(/^\/(en|es)/, "");
                navigate(localePath(otherLocale, currentPath || ""));
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-mono text-xs">{otherLocale}</span>
            </button>

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                  <Terminal className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">
                  Dev<span className="text-primary">AI</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{t(locale, "footer.tagline")}</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Links</h4>
              <div className="flex flex-col gap-2">
                {navItems.slice(0, 3).map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">{t(locale, "section.categories")}</h4>
              <div className="flex flex-col gap-2">
                <Link to={localePath(locale, "/blog?category=ai-tools")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  🤖 AI Tools
                </Link>
                <Link to={localePath(locale, "/blog?category=tutorials")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  📚 Tutorials
                </Link>
                <Link to={localePath(locale, "/blog?category=automation")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ⚡ Automation
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevAI. {t(locale, "footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  );
}
