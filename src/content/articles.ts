import type { Locale } from "@/i18n/config";

export type ArticleCategoryKey =
  | "skin-care"
  | "aging-elasticity"
  | "delicate-areas"
  | "hair-scalp";

export interface ArticleRecord {
  slug: string;
  language: Locale;
  categoryKey: ArticleCategoryKey;
  title: string;
  summary: string;
  content: string[];
  coverImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  source: {
    label: string;
    url?: string;
  };
  publishedAt: string | null;
  status: "draft" | "approved";
  /**
   * Must ONLY be set to true when the article text has been explicitly
   * written or reviewed and signed off by Dr. Ghada Alotaibi.
   */
  reviewedByDoctor: boolean;
}

export const articleCategories: Record<
  ArticleCategoryKey,
  Record<Locale, string>
> = {
  "skin-care": {
    ar: "العناية بالبشرة",
    en: "Skin Care",
  },
  "aging-elasticity": {
    ar: "مرونة الجلد والتقدم في العمر",
    en: "Skin Aging & Elasticity",
  },
  "delicate-areas": {
    ar: "المناطق الدقيقة",
    en: "Delicate Areas",
  },
  "hair-scalp": {
    ar: "الشعر وفروة الرأس",
    en: "Hair & Scalp",
  },
};

/**
 * Internal article repository.
 *
 * STRICT EDITORIAL RULE:
 * Pre-seeded items below represent unpublished topic drafts (`status: "draft"`)
 * inspired solely by topic titles visible on Dr. Ghada's Instagram profile.
 * Zero AI-generated medical articles are marked `approved`, and draft items
 * are strictly excluded from all public queries and routes.
 */
const allArticles: ArticleRecord[] = [
  {
    slug: "eye-area-care-notes",
    language: "ar",
    categoryKey: "delicate-areas",
    title: "العناية بمنطقة حول العين",
    summary: "مسودة موضوعية قيد الإعداد والمراجعة من محتوى الحساب الرسمي.",
    content: [],
    source: {
      label: "حساب إنستغرام الرسمي (@dr.ghada.alotaibi)",
      url: "https://www.instagram.com/dr.ghada.alotaibi/",
    },
    publishedAt: null,
    status: "draft",
    reviewedByDoctor: false,
  },
  {
    slug: "neck-laxity-and-elasticity",
    language: "ar",
    categoryKey: "aging-elasticity",
    title: "ترهل الرقبة وفقدان المرونة",
    summary: "مسودة موضوعية قيد الإعداد والمراجعة من محتوى الحساب الرسمي.",
    content: [],
    source: {
      label: "حساب إنستغرام الرسمي (@dr.ghada.alotaibi)",
      url: "https://www.instagram.com/dr.ghada.alotaibi/",
    },
    publishedAt: null,
    status: "draft",
    reviewedByDoctor: false,
  },
  {
    slug: "pore-appearance-and-daily-care",
    language: "ar",
    categoryKey: "skin-care",
    title: "مظهر المسام والعناية بالبشرة",
    summary: "مسودة موضوعية قيد الإعداد والمراجعة من محتوى الحساب الرسمي.",
    content: [],
    source: {
      label: "حساب إنستغرام الرسمي (@dr.ghada.alotaibi)",
      url: "https://www.instagram.com/dr.ghada.alotaibi/",
    },
    publishedAt: null,
    status: "draft",
    reviewedByDoctor: false,
  },
];

export function getPublicArticles(locale: Locale): ArticleRecord[] {
  return allArticles.filter(
    (article) =>
      article.language === locale &&
      article.status === "approved" &&
      Boolean(article.publishedAt) &&
      article.content.length > 0
  );
}

export function getPublicArticleBySlug(
  locale: Locale,
  slug: string
): ArticleRecord | undefined {
  return getPublicArticles(locale).find((article) => article.slug === slug);
}

export function getRelatedPublicArticles(
  locale: Locale,
  currentSlug: string,
  categoryKey: ArticleCategoryKey,
  limit = 2
): ArticleRecord[] {
  const sameCategory = getPublicArticles(locale).filter(
    (item) => item.slug !== currentSlug && item.categoryKey === categoryKey
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const fallback = getPublicArticles(locale).filter(
    (item) => item.slug !== currentSlug && item.categoryKey !== categoryKey
  );
  return [...sameCategory, ...fallback].slice(0, limit);
}
