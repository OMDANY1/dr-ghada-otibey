import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { areasOfCare } from "@/content/areas";

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
    path: "/areas-of-care",
    title: dict.meta.areasTitle,
    description: dict.meta.areasDescription,
  });
}

const areaEditorialImageMap: Record<string, string> = {
  "skin-health": "/images/editorial/care-skin-radiance.jpg",
  "hair-scalp": "/images/editorial/care-hair-waves.jpg",
  "skin-aging": "/images/editorial/cream-jar-shadow.jpg",
  "cosmetic-rejuvenation": "/images/editorial/care-serum-dropper.jpg",
};

export default async function AreasOfCarePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <div className="bg-canvas">
      {/* Editorial Header */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-12 pb-12 lg:pt-18 lg:pb-16 border-b border-hairline">
        <div className="max-w-3xl space-y-4">
          <p className="editorial-kicker">{dict.areas.kicker}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
            {dict.areas.heading}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {dict.areas.lead}
          </p>
        </div>

        <div className="mt-7 bg-warm border-s-2 border-taupe px-5 py-4 max-w-3xl rounded-e-[6px]">
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            {dict.areas.disclaimer}
          </p>
        </div>
      </section>

      {/* Four Confirmed Areas of Care — Alternating Editorial Spreads */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 divide-y divide-hairline">
        {areasOfCare.map((area, index) => (
          <article
            key={area.id}
            id={area.id}
            className="py-14 lg:py-20 scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Visual Editorial Accent */}
            <div
              className={`lg:col-span-4 ${
                index % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div className="overflow-hidden bg-card-bar">
                <Image
                  src={
                    areaEditorialImageMap[area.id] ||
                    "/images/editorial/care-skin-radiance.jpg"
                  }
                  alt={area.title[locale]}
                  width={900}
                  height={900}
                  sizes="(max-width: 1024px) 90vw, 340px"
                  className="w-full h-auto aspect-[4/3.6] object-cover"
                />
                <div className="bg-card-bar py-3 px-4 flex items-center justify-between text-xs text-ink-muted">
                  <span>{area.kicker[locale]}</span>
                  <span dir="ltr" className="font-medium text-taupe">
                    {area.number}
                  </span>
                </div>
              </div>
            </div>

            {/* Area Details & Consultation Pre-selection CTA */}
            <div
              className={`lg:col-span-8 space-y-5 ${
                index % 2 === 1 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-espresso leading-snug">
                {area.title[locale]}
              </h2>

              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                {area.description[locale]}
              </p>

              <div className="bg-warm border border-hairline p-5 sm:p-6 rounded-[6px] space-y-3.5">
                <h3 className="editorial-kicker">
                  {dict.areas.examplesHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {area.consultationExamples[locale].map((example, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-espresso leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-taupe shrink-0"
                        aria-hidden="true"
                      />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <Link
                  href={`/${locale}/consultation?area=${area.consultationTopicKey}`}
                  className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a1f19] px-6 py-3 text-xs sm:text-sm font-medium rounded-[6px]"
                >
                  {dict.areas.inquireButton}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Multi-Topic Note */}
      <section className="border-t border-hairline bg-warm">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-14 text-center space-y-4">
          <p className="text-sm sm:text-base text-ink-soft">
            {dict.areas.closingNote}
          </p>
          <Link
            href={`/${locale}/consultation`}
            className="inline-block text-sm font-medium text-espresso underline underline-offset-4 hover:text-taupe"
          >
            {dict.nav.consultation}
          </Link>
        </div>
      </section>
    </div>
  );
}
