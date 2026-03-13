export interface Category {
  id: string;
  name: { en: string; es: string };
  slug: string;
  description: { en: string; es: string };
  icon: string;
  postCount: number;
}

export const categories: Category[] = [
  {
    id: "ai-tools",
    name: { en: "AI Tools", es: "Herramientas IA" },
    slug: "ai-tools",
    description: { en: "Best AI tools for developers", es: "Las mejores herramientas de IA para developers" },
    icon: "🤖",
    postCount: 3,
  },
  {
    id: "tutorials",
    name: { en: "Tutorials", es: "Tutoriales" },
    slug: "tutorials",
    description: { en: "Step-by-step programming tutorials", es: "Tutoriales de programación paso a paso" },
    icon: "📚",
    postCount: 2,
  },
  {
    id: "automation",
    name: { en: "Automation", es: "Automatización" },
    slug: "automation",
    description: { en: "Automate your workflows with AI", es: "Automatiza tus flujos de trabajo con IA" },
    icon: "⚡",
    postCount: 2,
  },
  {
    id: "productivity",
    name: { en: "Developer Productivity", es: "Productividad Developer" },
    slug: "productivity",
    description: { en: "Tips to boost developer productivity", es: "Tips para mejorar la productividad developer" },
    icon: "🚀",
    postCount: 2,
  },
  {
    id: "guides",
    name: { en: "Guides", es: "Guías" },
    slug: "guides",
    description: { en: "In-depth guides and comparisons", es: "Guías detalladas y comparativas" },
    icon: "📖",
    postCount: 1,
  },
];
