import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteUrl, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import {
  articleCategories,
  getPublicArticleBySlug,
  getRelatedPublicArticles,
} from "@/content/articles";
import { ArticleShareBar } from "@/components/ArticleShareBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "ar";
  const article = getPublicArticleBySlug(locale, slug);
  const dict = getDictionary(locale);

  if (!article) {
    return {
      title: dict.notFound.heading,
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    locale,
    path: `/articles/${article.slug}`,
    title: `${article.title} | ${dict.meta.siteName}`,
    description: article.summary,
  });
}

async function SingleArticleContent({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const article = getPublicArticleBySlug(locale, slug);

  // Strictly block draft or non-existent articles from public view
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedPublicArticles(
    locale,
    article.slug,
    article.categoryKey
  );
  const canonicalUrl = `${getSiteUrl()}/${locale}/articles/${article.slug}`;

  return (
    <article className="bg-canvas">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-24 lg:pt-20">
        <div className="mb-8">
          <Link
            href={`/${locale}/articles`}
            className="text-xs font-medium text-ink-muted hover:text-espresso underline underline-offset-4"
          >
            {dict.articles.backToArchive}
          </Link>
        </div>

        <header className="space-y-5 pb-10 border-b border-hairline">
          <div className="flex flex-wrap items-center gap-3 text-xs text-taupe">
            <span>{articleCategories[article.categoryKey][locale]}</span>
            {article.publishedAt && (
              <>
                <span>·</span>
                <span>
                  {dict.articles.publishedOn}:{" "}
                  <time dateTime={article.publishedAt}>
                    {article.publishedAt}
                  </time>
                </span>
              </>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl text-espresso leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-ink-muted">
            <span>
              {dict.articles.sourceLabel}:{" "}
              {article.source.url ? (
                <a
                  href={article.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-espresso"
                >
                  {article.source.label}
                </a>
              ) : (
                article.source.label
              )}
            </span>

            {/* Only displayed when explicitly signed off by Dr. Ghada */}
            {article.reviewedByDoctor && (
              <span className="bg-warm border border-sand px-3 py-1 rounded-[3px] text-espresso font-medium">
                {dict.articles.doctorApprovedBadge}
              </span>
            )}
          </div>
        </header>

        {article.coverImage && (
          <div className="my-10 overflow-hidden rounded-[3px] border border-hairline bg-warm">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              width={article.coverImage.width}
              height={article.coverImage.height}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="py-10 space-y-6 text-base sm:text-lg text-espresso leading-relaxed">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <ArticleShareBar
          title={article.title}
          url={canonicalUrl}
          dict={dict}
        />

        {relatedArticles.length > 0 && (
          <section className="pt-14 space-y-6">
            <h2 className="font-editorial text-2xl text-espresso">
              {dict.articles.relatedHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="p-6 bg-warm border border-hairline rounded-[3px] space-y-2"
                >
                  <span className="text-xs text-taupe">
                    {articleCategories[rel.categoryKey][locale]}
                  </span>
                  <h3 className="font-editorial text-xl text-espresso">
                    <Link
                      href={`/${locale}/articles/${rel.slug}`}
                      className="hover:text-taupe"
                    >
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-ink-soft">{rel.summary}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

export default function SingleArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-3xl px-5 sm:px-8 py-24 min-h-[50vh]" />}
    >
      <SingleArticleContent params={params} />
    </Suspense>
  );
}
