import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicArticles } from "@/content/articles";
import { ArticlesExplorer } from "@/components/ArticlesExplorer";
import { StitchIcon } from "@/components/StitchIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "ar";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/articles",
    title: dict.meta.articlesTitle,
    description: dict.meta.articlesDescription,
  });
}

export default async function ArticlesArchivePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const publicArticles = getPublicArticles(locale);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Archive Ribbon (Stitch Screen 3) */}
      <div className="w-full bg-surface-low border-b border-surface-high py-2.5">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-secondary">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
            <span>{dict.articles.kicker}</span>
          </div>
          <span className="text-on-surface-variant">
            {dict.articles.editorialStandardNote}
          </span>
        </div>
      </div>

      {/* Editorial Masthead */}
      <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 pt-12 pb-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-secondary text-xs font-medium">
            <StitchIcon name="book" size={16} />
            <span>{dict.articles.kicker}</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl text-primary leading-tight">
            {dict.articles.heading}
          </h1>
          <p className="text-base sm:text-[17px] text-on-surface-variant font-light leading-relaxed">
            {dict.articles.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 pb-20">
        <ArticlesExplorer
          locale={locale}
          dict={dict}
          articles={publicArticles}
        />
      </section>
    </div>
  );
}
