import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { areasOfCare } from "@/content/areas";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";
import {
  CopperLeafDot,
  LineReveal,
  Magnetic,
  MaskReveal,
  ParallaxBox,
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
    path: "/areas-of-care",
    title: dict.meta.areasTitle,
    description: dict.meta.areasDescription,
  });
}

const areaVisualMap: Record<string, string> = {
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
  const dirArrow: StitchIconName =
    locale === "ar" ? "arrow-back" : "arrow-forward";

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Editorial Header */}
      <section className="w-full pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-copper-500/20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-kicker">{dict.areas.kicker}</span>
            <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.8rem)] text-primary leading-[1.15]">
              <LineReveal immediate delay={0.05}>
                {dict.areas.heading}
              </LineReveal>
            </h1>
            <Reveal immediate delay={0.18}>
              <p className="text-base sm:text-[18px] text-on-surface-variant font-light leading-[1.9] max-w-[64ch]">
                {dict.areas.lead}
              </p>
            </Reveal>
          </div>

          <Reveal immediate delay={0.26}>
            <p className="text-xs sm:text-sm text-on-surface-variant border-s border-copper-500/55 ps-4 py-1 max-w-[66ch] leading-[1.85]">
              {dict.areas.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Alternating Editorial Chapters */}
      <div className="divide-y divide-copper-500/20">
        {areasOfCare.map((area, index) => {
          const isEven = index % 2 === 1;
          const imgSrc =
            areaVisualMap[area.id] || "/images/editorial/care-skin-radiance.jpg";

          return (
            <section
              key={area.id}
              id={area.id}
              className={`w-full py-20 sm:py-28 lg:py-32 scroll-mt-24 ${
                isEven ? "bg-surface-low/50" : "bg-surface"
              }`}
            >
              <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Arched / Rounded Visual Frame */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative max-w-[400px] mx-auto">
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -top-3 ${
                        isEven
                          ? "-end-3"
                          : "-start-3"
                      } w-full h-full ${
                        index % 2 === 0
                          ? "rounded-t-full rounded-b-[22px]"
                          : "rounded-[26px]"
                      } border border-copper-500/40`}
                    />
                    <MaskReveal variant={index % 2 === 0 ? "arch" : "rounded"}>
                      <div
                        className={`overflow-hidden bg-surface-high aspect-[4/4.6] ${
                          index % 2 === 0
                            ? "rounded-t-full rounded-b-[22px]"
                            : "rounded-[26px]"
                        }`}
                      >
                        <ParallaxBox offsetPercent={5} className="w-full h-full">
                          <Image
                            src={imgSrc}
                            alt={area.title[locale]}
                            width={900}
                            height={900}
                            sizes="(max-width: 1024px) 88vw, 400px"
                            className="w-full h-full object-cover scale-[1.06]"
                          />
                        </ParallaxBox>
                      </div>
                    </MaskReveal>
                  </div>
                </div>

                {/* Editorial Chapter Text & Examples */}
                <Reveal
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      dir="ltr"
                      className="numeral-copper-outline text-5xl sm:text-6xl select-none"
                    >
                      {area.number}
                    </span>
                    <span className="editorial-kicker">
                      {area.kicker[locale]}
                    </span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-5xl text-primary leading-[1.2]">
                    {area.title[locale]}
                  </h2>

                  <p className="text-base sm:text-[17.5px] text-on-surface-variant font-light leading-[1.9] max-w-[62ch]">
                    {area.description[locale]}
                  </p>

                  <div className="pt-4 border-t border-copper-500/20 space-y-4">
                    <h3 className="text-xs text-copper-700">
                      {dict.areas.examplesHeading}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {area.consultationExamples[locale].map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-primary leading-[1.85]"
                        >
                          <CopperLeafDot delay={idx * 0.08} />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3">
                    <Magnetic strength={6}>
                      <Link
                        href={`/${locale}/consultation?area=${area.consultationTopicKey}`}
                        className="btn-pill-primary text-xs sm:text-sm"
                      >
                        <span>{dict.areas.inquireButton}</span>
                        <StitchIcon name={dirArrow} size={15} />
                      </Link>
                    </Magnetic>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Multi-Topic Closing Note */}
      <section className="w-full py-16 sm:py-20 bg-surface-low border-t border-copper-500/20 text-center">
        <Reveal className="mx-auto max-w-2xl px-5 space-y-4">
          <p className="text-sm sm:text-base text-on-surface-variant leading-[1.9]">
            {dict.areas.closingNote}
          </p>
          <Link
            href={`/${locale}/consultation`}
            className="copper-link text-sm text-primary hover:text-copper-700"
          >
            <span>{dict.nav.consultation}</span>
            <StitchIcon
              name={dirArrow}
              size={14}
              className="text-copper-500"
            />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
