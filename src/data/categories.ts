import { posts } from "./posts";

export interface Category {
  id: string;
  name: { en: string; es: string };
  slug: string;
  description: { en: string; es: string };
  icon: string;
  postCount: number;
}

function getPostCount(slug: string): number {
  return posts.filter((p) => p.category === slug).length;
}

export const categories: Category[] = [
  {
    id: "ai-tools",
    name: { en: "AI Tools", es: "Herramientas IA" },
    slug: "ai-tools",
    description: { en: "Best AI tools for developers", es: "Las mejores herramientas de IA para developers" },
    icon: "🤖",
    postCount: getPostCount("ai-tools"),
  },
  {
    id: "tutorials",
    name: { en: "Tutorials", es: "Tutoriales" },
    slug: "tutorials",
    description: { en: "Step-by-step programming tutorials", es: "Tutoriales de programación paso a paso" },
    icon: "📚",
    postCount: getPostCount("tutorials"),
  },
  {
    id: "automation",
    name: { en: "Automation", es: "Automatización" },
    slug: "automation",
    description: { en: "Automate your workflows with AI", es: "Automatiza tus flujos de trabajo con IA" },
    icon: "⚡",
    postCount: getPostCount("automation"),
  },
  {
    id: "productivity",
    name: { en: "Developer Productivity", es: "Productividad Developer" },
    slug: "productivity",
    description: { en: "Tips to boost developer productivity", es: "Tips para mejorar la productividad developer" },
    icon: "🚀",
    postCount: getPostCount("productivity"),
  },
  {
    id: "guides",
    name: { en: "Guides", es: "Guías" },
    slug: "guides",
    description: { en: "In-depth guides and comparisons", es: "Guías detalladas y comparativas" },
    icon: "📖",
    postCount: getPostCount("guides"),
  },
  {
    id: "machine-learning",
    name: { en: "Machine Learning", es: "Machine Learning" },
    slug: "machine-learning",
    description: { en: "ML concepts, models, and implementations", es: "Conceptos de ML, modelos e implementaciones" },
    icon: "🧠",
    postCount: getPostCount("machine-learning"),
  },
  {
    id: "apis",
    name: { en: "AI APIs", es: "APIs de IA" },
    slug: "apis",
    description: { en: "AI API integrations and implementations", es: "Integraciones e implementaciones de APIs de IA" },
    icon: "🔌",
    postCount: getPostCount("apis"),
  },
];
