import type { MetadataRoute } from "next";
import { getSiteUrl, locales } from "@/i18n/config";
import { getPublicArticles } from "@/content/articles";

const staticRoutes = [
  "",
  "/about",
  "/areas-of-care",
  "/articles",
  "/reviews",
  "/consultation",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/consultation" ? 0.9 : 0.8,
        alternates: {
          languages: {
            ar: `${siteUrl}/ar${route}`,
            en: `${siteUrl}/en${route}`,
          },
        },
      });
    }
  }

  // Only approved public articles are ever included in sitemap
  for (const locale of locales) {
    const publicArticles = getPublicArticles(locale);
    for (const article of publicArticles) {
      entries.push({
        url: `${siteUrl}/${locale}/articles/${article.slug}`,
        ...(article.publishedAt
          ? { lastModified: new Date(article.publishedAt) }
          : {}),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
