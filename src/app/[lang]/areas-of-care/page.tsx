import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { areasOfCare } from "@/content/areas";
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
    path: "/areas-of-care",
    title: dict.meta.areasTitle,
    description: dict.meta.areasDescription,
  });
}

const areaVisualMap: Record<
  string,
  { src: string; icon: StitchIconName; fieldCode: string }
> = {
  "skin-health": {
    src: "/images/editorial/care-skin-radiance.jpg",
    icon: "shield",
    fieldCode: "FIELD 01 · SKIN HEALTH",
  },
  "hair-scalp": {
    src: "/images/editorial/care-hair-waves.jpg",
    icon: "hair",
    fieldCode: "FIELD 02 · SCALP & HAIR",
  },
  "skin-aging": {
    src: "/images/editorial/cream-jar-shadow.jpg",
    icon: "hourglass",
    fieldCode: "FIELD 03 · WELL-AGING",
  },
  "cosmetic-rejuvenation": {
    src: "/images/editorial/care-serum-dropper.jpg",
    icon: "sparkle",
    fieldCode: "FIELD 04 · REJUVENATION",
  },
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
      {/* 1. TOP CURATORIAL HEADER (Stitch Screen 2 Header — Verified Metrics Only) */}
      <section className="w-full py-12 md:py-16 bg-surface-low/70 border-b border-surface-high">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2 text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="editorial-kicker">{dict.areas.kicker}</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-primary leading-tight">
              {dict.areas.heading}
            </h1>
            <p className="text-base sm:text-[17px] text-on-surface-variant font-light leading-relaxed">
              {dict.areas.lead}
            </p>
          </div>

          {/* Factual Quick Overview Box */}
          <div className="flex items-center gap-6 bg-surface-lowest border border-surface-high p-5 rounded-xl shadow-xs self-start lg:self-auto">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl text-primary" dir="ltr">
                04
              </span>
              <span className="text-[11px] text-secondary font-medium">
                {locale === "ar" ? "مجالات عناية رئيسية" : "Core Care Pillars"}
              </span>
            </div>
            <div className="w-px h-9 bg-surface-high" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl text-primary">
                {doctorProfile.cityShort[locale]}
              </span>
              <span className="text-[11px] text-secondary font-medium">
                {doctorProfile.title[locale]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY AREA ANCHOR PILL BAR (Stitch Screen 2 Sticky Bar) */}
      <section className="w-full bg-surface-bright border-b border-surface-high sticky top-20 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            {areasOfCare.map((area) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                className="editorial-fade px-4 py-1.5 rounded-full text-xs font-medium text-on-surface-variant bg-surface-low hover:bg-secondary-container hover:text-primary border border-surface-high/70"
              >
                <span dir="ltr" className="me-1.5 text-secondary">
                  {area.number}.
                </span>
                {area.title[locale]}
              </a>
            ))}
          </div>

          <span className="hidden xl:flex items-center gap-1.5 text-[11px] text-outline shrink-0">
            <StitchIcon name="verified" size={15} className="text-secondary" />
            <span>
              {doctorProfile.shortSignature[locale]} ·{" "}
              {doctorProfile.cityShort[locale]}
            </span>
          </span>
        </div>
      </section>

      {/* 3. ALTERNATING 12-COL EDITORIAL CHAPTERS FOR ALL 4 CONFIRMED AREAS */}
      <div className="divide-y divide-surface-high">
        {areasOfCare.map((area, index) => {
          const visual = areaVisualMap[area.id] || areaVisualMap["skin-health"];
          const isEven = index % 2 === 1;

          return (
            <section
              key={area.id}
              id={area.id}
              className={`w-full py-14 md:py-20 scroll-mt-32 ${
                isEven ? "bg-surface-low/45" : "bg-surface"
              }`}
            >
              <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Editorial Visual Frame with Stitch Floating Field Labels */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-xl bg-surface-low shadow-xs border border-surface-high">
                    <Image
                      src={visual.src}
                      alt={area.title[locale]}
                      width={900}
                      height={900}
                      sizes="(max-width: 1024px) 92vw, 46vw"
                      className="w-full h-[360px] sm:h-[440px] object-cover hover:scale-103 editorial-fade"
                    />

                    <div className="absolute top-3.5 start-3.5 bg-surface-lowest/95 px-3.5 py-1.5 rounded-lg shadow-xs">
                      <span
                        dir="ltr"
                        className="font-en-label text-[10px] font-semibold text-secondary"
                      >
                        {visual.fieldCode}
                      </span>
                    </div>

                    <div className="absolute bottom-4 inset-x-4 bg-surface-lowest/95 p-4 rounded-lg shadow-xs flex items-center justify-between gap-3 border border-surface-high/80">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-secondary">
                          {area.kicker[locale]}
                        </span>
                        <span className="font-editorial text-lg sm:text-xl text-primary">
                          {area.title[locale]}
                        </span>
                      </div>
                      <StitchIcon
                        name={visual.icon}
                        size={22}
                        className="text-secondary shrink-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Area Description, Examples Cards & Pre-selected Consultation CTA */}
                <div
                  className={`lg:col-span-6 flex flex-col gap-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      dir="ltr"
                      className="text-[11px] font-semibold bg-tertiary-fixed text-primary px-2.5 py-1 rounded"
                    >
                      {area.number}
                    </span>
                    <span className="editorial-kicker">
                      {area.kicker[locale]}
                    </span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-[40px] text-primary leading-tight">
                    {area.title[locale]}
                  </h2>

                  <p className="text-base sm:text-[17px] text-on-surface-variant font-light leading-relaxed">
                    {area.description[locale]}
                  </p>

                  {/* Consultation Reasons Sub-Cards */}
                  <div className="bg-surface-lowest border border-surface-high p-5 sm:p-6 rounded-xl shadow-xs space-y-3.5">
                    <div className="flex items-center gap-2 text-primary">
                      <StitchIcon
                        name="support"
                        size={17}
                        className="text-secondary"
                      />
                      <h3 className="font-editorial text-lg font-medium">
                        {dict.areas.examplesHeading}
                      </h3>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {area.consultationExamples[locale].map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-[13.5px] text-on-surface-variant leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/${locale}/consultation?area=${area.consultationTopicKey}`}
                      className="editorial-fade inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary text-xs font-medium px-7 h-12 rounded hover:bg-primary-hover shadow-xs"
                    >
                      <span>{dict.areas.inquireButton}</span>
                      <StitchIcon name={dirArrow} size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. MEDICAL DISCLAIMER & DIRECT CONSULTATION FOOTER CARD (Stitch Screen 2 Bottom) */}
      <section className="w-full py-14 md:py-18 bg-surface-low border-t border-surface-high">
        <div className="mx-auto max-w-5xl px-5 md:px-12">
          <div className="bg-surface-lowest border border-surface-high p-6 sm:p-9 rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-primary">
                <StitchIcon
                  name="info"
                  size={18}
                  className="text-secondary shrink-0"
                />
                <h2 className="font-editorial text-xl font-medium">
                  {locale === "ar"
                    ? "تنويه مهني حول مجالات العناية"
                    : "Clinical Orientation Note"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {dict.areas.disclaimer} {dict.areas.closingNote}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              <Link
                href={`/${locale}/consultation`}
                className="editorial-fade inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary text-xs font-medium px-6 h-11 rounded hover:bg-primary-hover"
              >
                <StitchIcon name="calendar" size={16} />
                <span>{dict.nav.consultation}</span>
              </Link>
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade inline-flex items-center justify-center gap-2 bg-surface-low border border-surface-high text-primary text-xs font-medium px-6 h-11 rounded hover:bg-surface-container"
              >
                <StitchIcon name="chat" size={15} className="text-secondary" />
                <span>{dict.home.closingWhatsappCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
