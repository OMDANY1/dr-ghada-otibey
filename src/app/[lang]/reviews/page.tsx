import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicReviews } from "@/content/reviews";
import { doctorProfile } from "@/content/doctor";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";

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

  const ethicalBento =
    locale === "ar"
      ? [
          {
            kicker: "المبدأ الأول · الخصوصية",
            title: "حماية خصوصية المراجعات",
            body: dict.reviews.policyPoints[0],
            icon: "lock" as StitchIconName,
          },
          {
            kicker: "المبدأ الثاني · المصداقية",
            title: "عدم عرض تقييمات غير موثقة",
            body: dict.reviews.policyPoints[1],
            icon: "verified" as StitchIconName,
          },
          {
            kicker: "المبدأ الثالث · السرية الطبية",
            title: "صون الهوية والتفاصيل الصحية",
            body: dict.reviews.policyPoints[2],
            icon: "shield" as StitchIconName,
          },
        ]
      : [
          {
            kicker: "Pillar 01 · Discretion",
            title: "Safeguarding Patient Privacy",
            body: dict.reviews.policyPoints[0],
            icon: "lock" as StitchIconName,
          },
          {
            kicker: "Pillar 02 · Integrity",
            title: "Zero Unverified Ratings",
            body: dict.reviews.policyPoints[1],
            icon: "verified" as StitchIconName,
          },
          {
            kicker: "Pillar 03 · Confidentiality",
            title: "Clinical Record Protection",
            body: dict.reviews.policyPoints[2],
            icon: "shield" as StitchIconName,
          },
        ];

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Ethics Notice Ribbon (Stitch Screen 4) */}
      <div className="w-full bg-surface-high py-2.5 px-5 md:px-12 text-center">
        <p className="text-xs font-medium text-on-surface-variant inline-flex items-center justify-center gap-2">
          <StitchIcon name="verified" size={15} className="text-secondary" />
          <span>
            {locale === "ar"
              ? "معايير الخصوصية والشفافية المهنية في نشر التجارب — الرياض"
              : "Privacy & Verification Standards for Published Testimonials — Riyadh"}
          </span>
        </p>
      </div>

      {/* Editorial Hero Section (Stitch Screen 4 Split Header + Policy Card) */}
      <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="editorial-kicker bg-surface-container px-3 py-1 rounded">
                {dict.reviews.kicker}
              </span>
              <span className="w-8 h-px bg-outline-variant" />
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl text-primary leading-tight">
              {dict.reviews.heading}
            </h1>

            <p className="text-base sm:text-[17px] text-on-surface-variant font-light max-w-2xl leading-relaxed">
              {dict.reviews.lead}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface-low border border-surface-high p-6 sm:p-7 rounded-lg shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-primary">
                <StitchIcon name="shield" size={20} className="text-secondary" />
                <span className="font-editorial text-xl">
                  {dict.reviews.emptyTitle}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {dict.reviews.emptyBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Testimonials (When Available) + Ethical Bento Grid */}
      <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 py-10 md:py-14 space-y-12">
        {publicReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicReviews.map((review) => (
              <blockquote
                key={review.id}
                className="p-7 bg-surface-lowest border border-surface-high rounded-lg shadow-xs flex flex-col justify-between gap-5"
              >
                <p className="font-editorial text-xl text-primary leading-relaxed">
                  {review.excerpt}
                </p>
                <footer className="pt-4 border-t border-surface-high flex flex-wrap items-center justify-between gap-2 text-xs text-outline">
                  <span className="font-medium text-primary">
                    {review.authorDisplay}
                  </span>
                  <span>
                    {dict.reviews.sourcePrefix}{" "}
                    {review.sourceUrl ? (
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 text-primary"
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

        {/* Stitch 3-Column Values Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {ethicalBento.map((pillar) => (
            <div
              key={pillar.title}
              className="md:col-span-4 bg-surface-lowest border border-surface-high p-7 rounded-lg shadow-xs flex flex-col justify-between group hover:bg-surface-low editorial-fade"
            >
              <div>
                <div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary mb-5 group-hover:bg-primary-container group-hover:text-on-primary editorial-fade">
                  <StitchIcon name={pillar.icon} size={20} />
                </div>
                <span className="editorial-kicker block mb-1.5">
                  {pillar.kicker}
                </span>
                <h2 className="font-editorial text-[22px] text-primary mb-2.5">
                  {pillar.title}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Primary Closing Consultation Banner (Stitch Screen 4 Bottom) */}
      <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 pb-20 pt-4">
        <div className="bg-primary-container text-on-primary rounded-lg p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <span
                dir="ltr"
                className="inline-block font-en-label text-[10px] text-secondary-dim"
              >
                Consultation Coordination · Riyadh
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl text-on-primary leading-snug">
                {dict.home.closingHeading}
              </h2>
              <p className="text-sm text-on-primary/80 max-w-xl leading-relaxed">
                {dict.home.closingBody}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/${locale}/consultation`}
                className="editorial-fade inline-flex items-center justify-center gap-2 bg-surface-lowest text-primary text-xs font-semibold px-6 h-12 rounded hover:bg-surface-low"
              >
                <span>{dict.reviews.inquireCta}</span>
                <StitchIcon name={dirArrow} size={15} />
              </Link>
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade inline-flex items-center justify-center gap-2 border border-on-primary/30 text-on-primary text-xs font-medium px-6 h-12 rounded hover:bg-on-primary/10"
              >
                <StitchIcon name="chat" size={15} />
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
