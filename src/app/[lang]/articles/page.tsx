import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicArticles } from "@/content/articles";
import { ArticlesExplorer } from "@/components/ArticlesExplorer";

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
    <div className="bg-canvas">
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-12 pb-10 lg:pt-18 lg:pb-14 border-b border-hairline">
        <div className="max-w-3xl space-y-3.5">
          <p className="editorial-kicker">{dict.articles.kicker}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
            {dict.articles.heading}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {dict.articles.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-14 lg:py-20">
        <ArticlesExplorer
          locale={locale}
          dict={dict}
          articles={publicArticles}
        />
      </section>
    </div>
  );
}
