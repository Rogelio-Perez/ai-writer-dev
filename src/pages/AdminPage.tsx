import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/i18n";
import SEOHead from "@/components/blog/SEOHead";
import BlogLayout from "@/components/blog/BlogLayout";
import { Sparkles, FileText, Languages, Eye, Send, Lightbulb, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminPage() {
  const { locale } = useLocale();
  const [keywords, setKeywords] = useState("");
  const [outline, setOutline] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"generate" | "ideas" | "seo">("generate");

  const handleGenerateOutline = () => {
    if (!keywords.trim()) {
      toast.error(locale === "es" ? "Ingresa palabras clave" : "Enter keywords");
      return;
    }
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setOutline(`## Introduction
What is ${keywords} and why developers should care.

## What is ${keywords}?
Definition and core concepts.

## Why It Matters
Impact on developer productivity and workflows.

## Step-by-Step Tutorial
1. Getting started
2. Configuration
3. Advanced usage

## Use Cases
- Web development
- Automation
- Data processing

## Pros and Cons
Balanced analysis of benefits and drawbacks.

## Conclusion
Summary and next steps.`);
      setSeoTitle(`${keywords} - Complete Guide for Developers`);
      setSeoDescription(`Learn everything about ${keywords}. Step-by-step tutorial, use cases, pros and cons. A complete guide for developers and builders.`);
      setIsGenerating(false);
      toast.success(locale === "es" ? "Esquema generado" : "Outline generated");
    }, 1500);
  };

  const handleGenerateArticle = () => {
    if (!outline.trim()) {
      toast.error(locale === "es" ? "Genera un esquema primero" : "Generate an outline first");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(`## Introduction

${keywords} is transforming how developers work. In this guide, we'll explore everything you need to know to get started.

## What is ${keywords}?

${keywords} refers to the latest tools and techniques that help developers write better code, faster. It encompasses a range of solutions from code completion to full application generation.

## Why It Matters

Developers who adopt ${keywords} report significant productivity gains. Here's a quick comparison:

| Metric | Without ${keywords} | With ${keywords} |
|--------|-------------------|-----------------|
| Code Speed | 1x | 3-5x |
| Bug Rate | Normal | -40% |
| Time to Ship | Weeks | Days |

## Step-by-Step Tutorial

### 1. Getting Started

\`\`\`bash
npm install ${keywords.toLowerCase().replace(/\s+/g, "-")}-toolkit
\`\`\`

### 2. Configuration

\`\`\`typescript
import { configure } from '${keywords.toLowerCase().replace(/\s+/g, "-")}';

configure({
  model: 'latest',
  output: './src',
});
\`\`\`

### 3. Advanced Usage

Once configured, you can leverage advanced features like auto-optimization and smart suggestions.

## Use Cases

- 🔧 **Web Development**: Build faster with AI-assisted coding
- ⚡ **Automation**: Automate repetitive tasks
- 📊 **Data Processing**: Handle data transformations efficiently
- 🧪 **Testing**: Generate comprehensive test suites

## Pros and Cons

**Pros:**
- ✅ Significant time savings
- ✅ Better code quality
- ✅ Lower barrier to entry
- ✅ Continuous improvement

**Cons:**
- ❌ Learning curve
- ❌ Potential over-reliance
- ❌ Cost considerations
- ❌ Privacy concerns

## Conclusion

${keywords} is a game-changer for modern development. Start with the basics, experiment, and gradually integrate it into your daily workflow. The productivity gains are real and measurable. 🚀`);
      setIsGenerating(false);
      toast.success(locale === "es" ? "Artículo generado" : "Article generated");
    }, 2500);
  };

  const handlePublish = () => {
    toast.info(locale === "es" ? "Conecta Lovable Cloud para publicar artículos" : "Connect Lovable Cloud to publish articles");
  };

  const tabs = [
    { id: "generate" as const, label: locale === "es" ? "Generar" : "Generate", icon: FileText },
    { id: "ideas" as const, label: locale === "es" ? "Ideas" : "Ideas", icon: Lightbulb },
    { id: "seo" as const, label: "SEO", icon: Eye },
  ];

  return (
    <BlogLayout>
      <SEOHead title={t(locale, "admin.title")} description="Admin panel" locale={locale} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t(locale, "admin.title")}</h1>
        <p className="text-muted-foreground mb-8">
          {locale === "es"
            ? "Genera artículos con IA, optimiza SEO y publica contenido."
            : "Generate articles with AI, optimize SEO, and publish content."}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "generate" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Input */}
            <div className="space-y-6">
              {/* Keywords */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t(locale, "admin.keywords")}
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder={locale === "es" ? "ej: mejores herramientas IA para developers" : "e.g: best AI tools for developers"}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Generate Outline */}
              <button
                onClick={handleGenerateOutline}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {t(locale, "admin.outline")}
              </button>

              {/* Outline */}
              {outline && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {locale === "es" ? "Esquema" : "Outline"}
                  </label>
                  <textarea
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                  />
                  <button
                    onClick={handleGenerateArticle}
                    disabled={isGenerating}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                    {t(locale, "admin.generate")}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
              {generatedContent && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {locale === "es" ? "Artículo Generado" : "Generated Article"}
                    </label>
                    <textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={20}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handlePublish}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                      {t(locale, "admin.publish")}
                    </button>
                    <button
                      onClick={() => toast.info(locale === "es" ? "Traducción coming soon" : "Translation feature coming soon")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Languages className="w-4 h-4" />
                      {t(locale, "admin.translate")}
                    </button>
                  </div>
                </>
              )}
              {!generatedContent && (
                <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-border text-muted-foreground text-sm">
                  {locale === "es" ? "El artículo generado aparecerá aquí" : "Generated article will appear here"}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "ideas" && (
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-6">
              {locale === "es"
                ? "Genera ideas de artículos basadas en tendencias actuales de IA y desarrollo."
                : "Generate article ideas based on current AI and development trends."}
            </p>
            <button
              onClick={() => toast.info(locale === "es" ? "Generación de ideas coming soon" : "Idea generation feature coming soon")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Lightbulb className="w-4 h-4" />
              {t(locale, "admin.ideas")}
            </button>
            <div className="mt-8 space-y-3">
              {[
                { en: "How to Use AI for Automated Code Reviews", es: "Cómo Usar IA para Code Reviews Automatizados" },
                { en: "Building AI-Powered CLI Tools with TypeScript", es: "Construyendo Herramientas CLI Potenciadas por IA con TypeScript" },
                { en: "Top 5 AI APIs for Indie Developers", es: "Top 5 APIs de IA para Developers Independientes" },
                { en: "Prompt Engineering Best Practices for Developers", es: "Mejores Prácticas de Prompt Engineering para Developers" },
                { en: "AI-Assisted Database Design Patterns", es: "Patrones de Diseño de Base de Datos Asistidos por IA" },
              ].map((idea, i) => (
                <div key={i} className="p-4 rounded-lg border border-border bg-card flex items-center justify-between group hover:border-primary/40 transition-colors">
                  <span className="text-sm text-card-foreground">{idea[locale]}</span>
                  <button
                    onClick={() => {
                      setKeywords(idea.en);
                      setActiveTab("generate");
                    }}
                    className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Use →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Enter SEO title..."
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span className={`text-xs mt-1 block ${seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                {seoTitle.length}/60
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Meta Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Enter meta description..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
              />
              <span className={`text-xs mt-1 block ${seoDescription.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>
                {seoDescription.length}/160
              </span>
            </div>

            {/* Preview */}
            {(seoTitle || seoDescription) && (
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-xs text-muted-foreground mb-2">{t(locale, "admin.seoPreview")}</p>
                <div className="space-y-1">
                  <p className="text-primary text-base font-medium truncate">{seoTitle || "Page Title"}</p>
                  <p className="text-xs text-primary/70 font-mono">devai.blog/blog/article-slug</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{seoDescription || "Page description..."}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
