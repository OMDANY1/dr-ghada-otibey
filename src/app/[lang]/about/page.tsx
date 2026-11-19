import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { doctorProfile, type CredentialItem } from "@/content/doctor";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";
import {
  BotanicalCopperOrnament,
  CopperLeafDot,
  DrawLine,
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
    <div className="py-12 border-t border-copper-500/20 grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4">
        <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
          {heading}
        </h2>
      </div>
      <div className="md:col-span-8">
        <ul className="divide-y divide-copper-500/15">
          {items.map((item) => (
            <li
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
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
                <span className="font-latin-italic text-sm text-copper-700" dir="ltr">
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

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. EDITORIAL PROFILE & ARCHED PORTRAIT SPREAD */}
      <section className="w-full pt-5 pb-16 sm:pt-8 sm:pb-22 lg:pt-6 lg:pb-24 overflow-x-clip">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Editorial Biography Column (7 cols) */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="editorial-kicker">{dict.about.kicker}</span>
                <h1 className="font-editorial text-[clamp(2.2rem,4.1vw,4rem)] text-primary leading-[1.15]">
                  <LineReveal immediate delay={0.05}>
                    {dict.about.heading}
                  </LineReveal>
                </h1>
                <p>
                  <span
                    dir="ltr"
                    className="inline-block font-latin-italic text-sm sm:text-base text-copper-700"
                  >
                    Dr. Ghada Alotaibi, Consultant Dermatologist — Riyadh
                  </span>
                </p>
              </div>

              <Reveal immediate delay={0.2} className="space-y-4 max-w-[64ch]">
                {doctorProfile.extendedBio[locale].map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-[16.5px] text-on-surface-variant font-light leading-[1.85]"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              {/* Hairline-Divided Verified Facts Row (Zero Boxy Cards) */}
              <Reveal immediate delay={0.3} className="pt-2">
                <DrawLine className="mb-7" />
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
                  <div className="sm:pe-6 sm:border-e border-copper-500/30">
                    <dt className="text-xs text-copper-700">
                      {dict.about.roleLabel}
                    </dt>
                    <dd className="font-editorial text-2xl text-primary mt-1">
                      {doctorProfile.title[locale]}
                    </dd>
                  </div>
                  <div className="sm:px-6 sm:border-e border-copper-500/30">
                    <dt className="text-xs text-copper-700">
                      {dict.about.locationLabel}
                    </dt>
                    <dd className="font-editorial text-2xl text-primary mt-1">
                      {doctorProfile.city[locale]}
                    </dd>
                  </div>
                  <div className="sm:ps-6">
                    <dt className="text-xs text-copper-700">
                      {dict.about.coordinationLabel}
                    </dt>
                    <dd className="font-editorial text-2xl text-primary mt-1">
                      <a
                        href={doctorProfile.contact.whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-copper-700 transition-colors"
                      >
                        <span dir="ltr">
                          {doctorProfile.contact.whatsappDisplay}
                        </span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal
                immediate
                delay={0.38}
                className="flex flex-wrap items-center gap-6 pt-2"
              >
                <Magnetic strength={7}>
                  <Link
                    href={`/${locale}/consultation`}
                    className="btn-pill-primary text-xs sm:text-sm"
                  >
                    <span>{dict.about.ctaButton}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </Link>
                </Magnetic>

                <a
                  href={doctorProfile.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="copper-link text-xs sm:text-sm text-primary hover:text-copper-700"
                >
                  <StitchIcon
                    name="camera"
                    size={15}
                    className="text-copper-500"
                  />
                  <span dir="ltr">{doctorProfile.contact.instagramHandle}</span>
                </a>
              </Reveal>
            </div>

            {/* Arched Original Portrait + Offset Copper Frame (5 cols) */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="relative mx-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[345px] xl:max-w-[380px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-3 -top-3 w-full h-full rounded-t-full rounded-b-[20px] border border-copper-500/45"
                />
                <MaskReveal variant="arch" immediate delay={0.1}>
                  <div className="overflow-hidden rounded-t-full rounded-b-[20px] bg-surface-high aspect-[4/4.85]">
                    <ParallaxBox offsetPercent={4} className="w-full h-full">
                      <Image
                        src={doctorProfile.portraits.editorial.src}
                        alt={doctorProfile.portraits.editorial.alt[locale]}
                        width={doctorProfile.portraits.editorial.width}
                        height={doctorProfile.portraits.editorial.height}
                        priority
                        sizes="(max-width: 1024px) 320px, 380px"
                        className="w-full h-full object-cover object-top scale-[1.05]"
                      />
                    </ParallaxBox>
                  </div>
                </MaskReveal>
                <p className="mt-3 text-xs text-on-surface-variant text-center">
                  {doctorProfile.portraits.editorial.caption[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALIZATION & SCOPE OF FOCUS SPREAD */}
      <section className="w-full bg-surface-low/65 py-16 sm:py-22 lg:py-24 border-y border-copper-500/20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <MaskReveal variant="rounded">
              <div className="overflow-hidden rounded-[24px] border border-copper-500/35 bg-surface-lowest max-w-[310px] sm:max-w-[340px] mx-auto aspect-[4/4.6]">
                <Image
                  src={doctorProfile.portraits.standing.src}
                  alt={doctorProfile.portraits.standing.alt[locale]}
                  width={doctorProfile.portraits.standing.width}
                  height={doctorProfile.portraits.standing.height}
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </MaskReveal>
          </div>

          <Reveal className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="editorial-kicker">
              {dict.about.specializationHeading}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-primary leading-[1.2]">
              {doctorProfile.specializationSummary[locale]}
            </h2>
            <BotanicalCopperOrnament />

            <div className="pt-4 space-y-4">
              <h3 className="text-xs text-copper-700">
                {dict.about.focusListHeading}
              </h3>
              <ul className="divide-y divide-copper-500/20 border-t border-b border-copper-500/20">
                {doctorProfile.focusAreas[locale].map((focusItem, idx) => (
                  <li
                    key={focusItem}
                    className="py-4 flex items-start gap-3.5 text-base text-primary"
                  >
                    <CopperLeafDot delay={idx * 0.1} />
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Optional Verified Credentials — Hidden automatically when arrays are empty */}
      {hasAnyStructuredCredentials && (
        <section className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-14 py-16">
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

      {/* 3. QUIET APPOINTMENT INVITATION */}
      <section className="w-full py-20 sm:py-28 text-center">
        <Reveal className="mx-auto max-w-2xl px-5 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-5xl text-primary leading-tight">
            {dict.about.ctaHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-[1.9]">
            {dict.about.ctaBody}
          </p>
          <div className="pt-2">
            <Magnetic strength={7}>
              <Link
                href={`/${locale}/consultation`}
                className="btn-pill-primary text-xs sm:text-sm"
              >
                <span>{dict.about.ctaButton}</span>
                <StitchIcon name={dirArrow} size={15} />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
