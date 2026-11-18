import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicReviews } from "@/content/reviews";
import { doctorProfile } from "@/content/doctor";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";
import {
  DelicateEditorialEmblem,
  DrawCopperFrame,
  LineReveal,
  Magnetic,
  Reveal,
} from "@/lib/motion";

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
  const dirArrow: StitchIconName =
    locale === "ar" ? "arrow-back" : "arrow-forward";

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Editorial Masthead */}
      <section className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-14 pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-copper-500/20">
        <div className="max-w-3xl space-y-4">
          <span className="editorial-kicker">{dict.reviews.kicker}</span>
          <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.8rem)] text-primary leading-[1.15]">
            <LineReveal immediate delay={0.05}>
              {dict.reviews.heading}
            </LineReveal>
          </h1>
          <Reveal immediate delay={0.18}>
            <p className="text-base sm:text-[18px] text-on-surface-variant font-light leading-[1.9] max-w-[62ch]">
              {dict.reviews.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intentional Centered Empty State + Hairline Ethical Index */}
      <section className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-14 py-20 sm:py-28 space-y-20">
        {publicReviews.length === 0 ? (
          <Reveal className="max-w-2xl mx-auto text-center space-y-5">
            <DelicateEditorialEmblem variant="seal" />
            <span className="editorial-kicker justify-center">
              {dict.reviews.kicker}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-primary leading-snug">
              {dict.reviews.emptyTitle}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-[1.95] max-w-[56ch] mx-auto">
              {dict.reviews.emptyBody}
            </p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {publicReviews.map((review) => (
              <blockquote
                key={review.id}
                className="py-8 border-t border-b border-copper-500/25 flex flex-col justify-between gap-5"
              >
                <p className="font-editorial text-2xl text-primary leading-relaxed">
                  {review.excerpt}
                </p>
                <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-outline">
                  <span className="text-primary font-medium">
                    {review.authorDisplay}
                  </span>
                  <span>
                    {dict.reviews.sourcePrefix} {review.sourceLabel}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {/* Hairline-Separated Publication Standards (01-03) */}
        <div className="pt-12 border-t border-copper-500/25 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {dict.reviews.policyPoints.map((point, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className={`space-y-3 ${index > 0 ? "md:ps-10" : ""} ${
                index < dict.reviews.policyPoints.length - 1
                  ? "md:pe-10 md:border-e border-copper-500/20"
                  : ""
              }`}
            >
              <span
                dir="ltr"
                className="numeral-copper-outline text-4xl block select-none"
              >
                0{index + 1}
              </span>
              <p className="text-sm sm:text-base text-primary leading-[1.9]">
                {point}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Dark Espresso Closing Section with Draw-On Copper Frame */}
      <section className="w-full pb-20 sm:pb-28 px-4 sm:px-8 lg:px-14">
        <div className="relative mx-auto max-w-[1360px] rounded-[30px] bg-primary text-on-primary px-6 py-16 sm:px-14 sm:py-22 overflow-hidden text-center">
          <DrawCopperFrame />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="font-editorial text-3xl sm:text-5xl text-on-primary leading-tight">
              {dict.home.closingHeading}
            </h2>
            <p className="text-sm sm:text-base text-on-primary/80 leading-[1.9] font-light">
              {dict.home.closingBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Magnetic strength={6}>
                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-copper-glow w-full sm:w-auto text-xs sm:text-sm font-medium"
                >
                  <StitchIcon
                    name="chat"
                    size={16}
                    className="text-copper-700"
                  />
                  <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
                </a>
              </Magnetic>
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full border border-copper-300/45 text-on-primary hover:border-copper-300 text-xs sm:text-sm w-full sm:w-auto"
              >
                <span>{dict.reviews.inquireCta}</span>
                <StitchIcon name={dirArrow} size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
