import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicReviews } from "@/content/reviews";

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
    path: "/reviews",
    title: dict.meta.reviewsTitle,
    description: dict.meta.reviewsDescription,
  });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const publicReviews = getPublicReviews(locale);

  return (
    <div className="bg-canvas">
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-12 pb-12 lg:pt-18 lg:pb-14 border-b border-hairline">
        <div className="max-w-3xl space-y-3.5">
          <p className="editorial-kicker">{dict.reviews.kicker}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
            {dict.reviews.heading}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {dict.reviews.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-14 lg:py-22">
        {publicReviews.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 bg-warm border border-hairline p-8 sm:p-11 rounded-[8px] space-y-5">
              <p className="editorial-kicker">{dict.reviews.kicker}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-espresso leading-snug">
                {dict.reviews.emptyTitle}
              </h2>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                {dict.reviews.emptyBody}
              </p>
              <div className="pt-2">
                <Link
                  href={`/${locale}/consultation`}
                  className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a1f19] px-7 py-3.5 text-sm font-medium rounded-[6px]"
                >
                  {dict.reviews.inquireCta}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 pt-1">
              <ul className="divide-y divide-hairline border-t border-b border-hairline">
                {dict.reviews.policyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="py-5 flex items-start gap-3.5 text-sm text-espresso leading-relaxed"
                  >
                    <span
                      className="text-sm font-medium text-taupe shrink-0"
                      dir="ltr"
                    >
                      0{index + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicReviews.map((review) => (
              <blockquote
                key={review.id}
                className="p-7 bg-warm border border-hairline rounded-[8px] flex flex-col justify-between gap-6"
              >
                <p className="text-base sm:text-lg font-medium text-espresso leading-relaxed">
                  {review.excerpt}
                </p>
                <footer className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
                  <span className="font-medium text-espresso">
                    {review.authorDisplay}
                  </span>
                  <span>
                    {dict.reviews.sourcePrefix}{" "}
                    {review.sourceUrl ? (
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 text-espresso"
                      >
                        {review.sourceLabel}
                      </a>
                    ) : (
                      review.sourceLabel
                    )}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
