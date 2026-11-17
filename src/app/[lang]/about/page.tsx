import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { doctorProfile, type CredentialItem } from "@/content/doctor";
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
    path: "/about",
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
  });
}

function VerifiedCredentialSection({
  heading,
  items,
  locale,
}: {
  heading: string;
  items: CredentialItem[];
  locale: Locale;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-10 border-t border-surface-high grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4">
        <h2 className="font-editorial text-2xl text-primary">{heading}</h2>
      </div>
      <div className="md:col-span-8">
        <ul className="divide-y divide-surface-high">
          {items.map((item) => (
            <li
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div>
                <p className="text-sm font-medium text-primary">
                  {item.title[locale]}
                </p>
                {item.institution && (
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {item.institution[locale]}
                  </p>
                )}
              </div>
              {item.year && (
                <span className="text-xs text-secondary" dir="ltr">
                  {item.year}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function AboutDoctorPage({
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

  const hasAnyStructuredCredentials =
    doctorProfile.qualifications.length > 0 ||
    doctorProfile.certifications.length > 0 ||
    doctorProfile.experience.length > 0 ||
    doctorProfile.memberships.length > 0;

  const practicePillars =
    locale === "ar"
      ? [
          {
            num: "01",
            title: "الاستماع المتأني والفحص السريري",
            body: "تنطلق كل استشارة من فهم شكوى المراجعة وملاحظة حالة الجلد أو فروة الرأس بصورة مباشرة قبل مناقشة أي خطوة عناية.",
            tag: "تقييم فردي مباشر",
          },
          {
            num: "02",
            title: "ملاءمة العناية لطبيعة كل حالة",
            body: "تختلف احتياجات البشرة والشعر باختلاف العمر ونمط الحياة والعوامل البيئية، لذا تُناقش الخيارات المناسبة لكل حالة على حدة.",
            tag: "توجيه شخصي متوازن",
          },
          {
            num: "03",
            title: "احترام الملامح والتوازن الطبيعي",
            body: "يرتكز الاهتمام بتجميل الجلد وتجديده ومقاومة شيخوخة البشرة على العناية بجودة الجلد ونضارته بهدوء ودون مبالغة.",
            tag: "عناية هادئة وواقعية",
          },
        ]
      : [
          {
            num: "01",
            title: "Attentive Listening & Clinical Assessment",
            body: "Every visit begins with understanding individual concerns and examining skin or scalp condition in person before discussing options.",
            tag: "Direct Clinical Evaluation",
          },
          {
            num: "02",
            title: "Individualized Care Orientation",
            body: "Because skin and hair needs vary with age, lifestyle, and environment, guidance is tailored to each person rather than preset templates.",
            tag: "Tailored Discussion",
          },
          {
            num: "03",
            title: "Respecting Natural Harmony",
            body: "Cosmetic dermatology and skin rejuvenation focus on supporting skin quality and vitality with restraint and realistic expectations.",
            tag: "Measured Refinement",
          },
        ];

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. TOP ASYMMETRIC PROFILE & PORTRAIT SPREAD (Stitch Screen 1) */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Editorial Biography Column */}
            <div className="lg:col-span-7 flex flex-col gap-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-surface-high text-primary text-[11px] font-semibold rounded">
                  {dict.about.kicker}
                </span>
                <span
                  className="w-8 h-px bg-outline-variant"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-secondary">
                  {doctorProfile.title[locale]} ·{" "}
                  {doctorProfile.cityShort[locale]}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] text-primary leading-tight">
                  {dict.about.heading}
                </h1>
                <p>
                  <span
                    dir="ltr"
                    className="inline-block font-en-label text-[11px] font-medium text-secondary"
                  >
                    Dr. Ghada Alotaibi · Consultant Dermatologist
                  </span>
                </p>
              </div>

              {/* Verified Extended Biography */}
              <div className="space-y-4 text-base sm:text-[17px] text-on-surface leading-relaxed font-light max-w-2xl">
                {doctorProfile.extendedBio[locale].map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Structured Metadata Matrix (Strictly Verified Facts — Zero Fabricated Degrees/Years) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-surface-low border border-surface-high p-6 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-secondary">
                    {dict.about.roleLabel}
                  </span>
                  <span className="font-editorial text-[21px] text-primary">
                    {doctorProfile.title[locale]}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {locale === "ar"
                      ? "الأمراض الجلدية وتجميل الجلد"
                      : "Clinical & Cosmetic Dermatology"}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-secondary">
                    {dict.about.locationLabel}
                  </span>
                  <span className="font-editorial text-[21px] text-primary">
                    {doctorProfile.cityShort[locale]}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {locale === "ar"
                      ? "المملكة العربية السعودية"
                      : "Saudi Arabia"}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-secondary">
                    {dict.about.coordinationLabel}
                  </span>
                  <a
                    href={doctorProfile.contact.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-editorial text-[20px] text-primary hover:text-secondary underline underline-offset-4"
                  >
                    <span dir="ltr">
                      {doctorProfile.contact.whatsappDisplay}
                    </span>
                  </a>
                  <span className="text-xs text-on-surface-variant">
                    {locale === "ar"
                      ? "تنسيق المواعيد عبر واتساب"
                      : "WhatsApp Coordination"}
                  </span>
                </div>
              </div>

              {/* Specialization Highlight Card (Factual Summary — Not an invented personal quote) */}
              <div className="bg-surface-lowest border border-surface-high p-6 sm:p-7 rounded-lg shadow-xs space-y-3">
                <span className="editorial-kicker">
                  {dict.about.specializationHeading}
                </span>
                <p className="font-editorial text-xl sm:text-[25px] text-primary leading-snug">
                  {doctorProfile.specializationSummary[locale]}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href={`/${locale}/consultation`}
                  className="editorial-fade inline-flex items-center justify-center gap-2.5 bg-primary-container text-on-primary text-xs font-medium px-8 h-12 rounded hover:bg-primary-hover shadow-xs"
                >
                  <span>{dict.about.ctaButton}</span>
                  <StitchIcon name={dirArrow} size={15} />
                </Link>

                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-fade inline-flex items-center justify-center gap-2 bg-surface-high text-primary text-xs font-medium px-6 h-12 rounded hover:bg-surface-container"
                >
                  <StitchIcon name="chat" size={16} className="text-secondary" />
                  <span>
                    {locale === "ar"
                      ? "تواصل مباشر عبر واتساب"
                      : "Direct WhatsApp"}
                  </span>
                </a>
              </div>
            </div>

            {/* Original Studio Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-lg overflow-hidden bg-surface-high shadow-md border border-surface-high">
                <Image
                  src={doctorProfile.portraits.editorial.src}
                  alt={doctorProfile.portraits.editorial.alt[locale]}
                  width={doctorProfile.portraits.editorial.width}
                  height={doctorProfile.portraits.editorial.height}
                  priority
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="w-full h-[500px] sm:h-[560px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-7 text-on-primary">
                  <span
                    dir="ltr"
                    className="font-en-label text-[10px] opacity-85"
                  >
                    Consultant Dermatologist
                  </span>
                  <span className="font-editorial text-2xl mt-0.5">
                    {doctorProfile.shortSignature[locale]}
                  </span>
                  <p className="text-xs opacity-90 mt-1">
                    {doctorProfile.portraits.editorial.caption[locale]}
                  </p>
                </div>
              </div>

              {/* Official Account Reference Card */}
              <div className="bg-surface-low border border-surface-high p-4 rounded-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-tertiary-fixed flex items-center justify-center text-primary shrink-0">
                    <StitchIcon name="camera" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-primary">
                      {locale === "ar"
                        ? "الحساب الرسمي على إنستغرام"
                        : "Official Instagram Profile"}
                    </span>
                    <a
                      href={doctorProfile.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:text-primary underline underline-offset-4"
                    >
                      <span dir="ltr">
                        {doctorProfile.contact.instagramHandle}
                      </span>
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-medium bg-surface-lowest border border-surface-high text-secondary px-2.5 py-1 rounded">
                  {doctorProfile.cityShort[locale]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PRACTICE PRINCIPLES (Stitch Screen 1 Section 2) */}
      <section className="w-full bg-surface-low py-16 md:py-20 border-t border-b border-surface-high">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="editorial-kicker">
                {locale === "ar"
                  ? "ركائز العناية المهنية"
                  : "Care Orientation"}
              </span>
              <h2 className="font-editorial text-3xl sm:text-[38px] text-primary">
                {locale === "ar"
                  ? "منطلقات الاستشارة الجلدية والتجميلية"
                  : "Foundations of Clinical & Cosmetic Care"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {practicePillars.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-surface-lowest border border-surface-high/80 p-7 rounded-lg shadow-xs flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      dir="ltr"
                      className="font-editorial text-4xl text-outline-variant"
                    >
                      {pillar.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <StitchIcon name="verified" size={17} />
                    </div>
                  </div>

                  <h3 className="font-editorial text-[22px] text-primary mt-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-surface-high text-xs font-medium text-secondary">
                  {pillar.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SCOPE OF FOCUS AREAS + SECONDARY PORTRAIT */}
      <section className="w-full py-16 md:py-22">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden bg-surface-high border border-surface-high max-w-md mx-auto">
                <Image
                  src={doctorProfile.portraits.standing.src}
                  alt={doctorProfile.portraits.standing.alt[locale]}
                  width={doctorProfile.portraits.standing.width}
                  height={doctorProfile.portraits.standing.height}
                  sizes="(max-width: 1024px) 85vw, 36vw"
                  className="w-full h-auto aspect-[3/4] object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="editorial-kicker">
                {dict.about.focusListHeading}
              </span>
              <h2 className="font-editorial text-3xl sm:text-[38px] text-primary leading-tight">
                {doctorProfile.specializationSummary[locale]}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {doctorProfile.focusAreas[locale].map((focusItem) => (
                  <div
                    key={focusItem}
                    className="p-5 bg-surface-lowest border border-surface-high rounded-lg shadow-xs flex items-center gap-3.5"
                  >
                    <div className="w-8 h-8 rounded bg-surface-container shrink-0 flex items-center justify-center text-primary">
                      <StitchIcon name="dermatology" size={16} />
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {focusItem}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href={`/${locale}/areas-of-care`}
                  className="inline-flex items-center gap-2 text-xs font-medium text-primary underline underline-offset-4 hover:text-secondary"
                >
                  <span>{dict.home.areasViewAll}</span>
                  <StitchIcon name={dirArrow} size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Verified Credentials — Hidden automatically when arrays are empty */}
      {hasAnyStructuredCredentials && (
        <section className="mx-auto max-w-[1440px] w-full px-5 md:px-12 lg:px-16 pb-16">
          <VerifiedCredentialSection
            heading={dict.about.qualificationsHeading}
            items={doctorProfile.qualifications}
            locale={locale}
          />
          <VerifiedCredentialSection
            heading={dict.about.certificationsHeading}
            items={doctorProfile.certifications}
            locale={locale}
          />
          <VerifiedCredentialSection
            heading={dict.about.experienceHeading}
            items={doctorProfile.experience}
            locale={locale}
          />
          <VerifiedCredentialSection
            heading={dict.about.membershipsHeading}
            items={doctorProfile.memberships}
            locale={locale}
          />
        </section>
      )}

      {/* 4. TRANSPARENCY & APPOINTMENT COORDINATION FOOTER BAND */}
      <section className="w-full bg-surface-low border-t border-surface-high py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-12 text-center space-y-5">
          <h2 className="font-editorial text-3xl sm:text-4xl text-primary">
            {dict.about.ctaHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            {dict.about.ctaBody}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/consultation`}
              className="editorial-fade inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary text-xs font-medium px-8 h-12 rounded hover:bg-primary-hover shadow-xs"
            >
              <span>{dict.about.ctaButton}</span>
              <StitchIcon name={dirArrow} size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
