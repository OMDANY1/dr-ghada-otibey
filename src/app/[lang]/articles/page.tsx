import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicArticles } from "@/content/articles";
import { ArticlesExplorer } from "@/components/ArticlesExplorer";
import { LineReveal, Reveal } from "@/lib/motion";

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
      <section className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-14 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-3xl space-y-4">
          <span className="editorial-kicker">{dict.articles.kicker}</span>
          <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.8rem)] text-primary leading-[1.15]">
            <LineReveal immediate delay={0.05}>
              {dict.articles.heading}
            </LineReveal>
          </h1>
          <Reveal immediate delay={0.18}>
            <p className="text-base sm:text-[18px] text-on-surface-variant font-light leading-[1.9] max-w-[62ch]">
              {dict.articles.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-14 pb-24 sm:pb-32">
        <ArticlesExplorer
          locale={locale}
          dict={dict}
          articles={publicArticles}
        />
      </section>
    </div>
  );
}
