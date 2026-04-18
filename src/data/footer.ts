import { Locale } from "@/lib/i18n";
import { categories } from "./categories";

export interface FooterLink {
  label: { en: string; es: string };
  path: string;
}

export interface FooterCategory {
  name: { en: string; es: string };
  slug: string;
  icon: string;
}

export function getFooterLinks(): FooterLink[] {
  return [
    { label: { en: "Home", es: "Inicio" }, path: "/" },
    { label: { en: "Blog", es: "Blog" }, path: "/blog" },
    { label: { en: "Categories", es: "Categorías" }, path: "/categories" },
  ];
}

export function getFooterCategories(locale: Locale): FooterCategory[] {
  return categories.slice(0, 3).map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
  }));
}