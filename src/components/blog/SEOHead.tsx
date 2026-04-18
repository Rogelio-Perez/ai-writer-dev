import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  locale?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export default function SEOHead({ title, description, url, image, type = "website", locale = "es", article }: SEOHeadProps) {
  const fullTitle = `${title} | DevAI Blog`;

  const structuredData = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished: article.publishedTime,
        author: { "@type": "Person", name: article.author },
        keywords: article.tags?.join(", "),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DevAI Blog",
        description,
        url,
      };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:locale" content={locale === "es" ? "es_ES" : "en_US"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
      <html lang={locale} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
