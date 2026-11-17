import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { doctorProfile, type CredentialItem } from "@/content/doctor";

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
    <div className="py-10 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-espresso">
          {heading}
        </h2>
      </div>
      <div className="md:col-span-8">
        <ul className="divide-y divide-hairline">
          {items.map((item) => (
            <li
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div>
                <p className="text-sm font-medium text-espresso">
                  {item.title[locale]}
                </p>
                {item.institution && (
                  <p className="text-xs text-ink-soft mt-0.5">
                    {item.institution[locale]}
                  </p>
                )}
              </div>
              {item.year && (
                <span className="text-xs text-taupe" dir="ltr">
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

  const hasAnyStructuredCredentials =
    doctorProfile.qualifications.length > 0 ||
    doctorProfile.certifications.length > 0 ||
    doctorProfile.experience.length > 0 ||
    doctorProfile.memberships.length > 0;

  return (
    <div className="bg-canvas">
      {/* Editorial Profile Header & Arched Original Doctor Portrait */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-10 pb-18 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-7 order-2 lg:order-1">
            <div className="space-y-2.5 border-b border-hairline pb-6">
              <p className="editorial-kicker">{dict.about.kicker}</p>
              <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
                {dict.about.heading}
              </h1>
              <p className="text-sm sm:text-base text-taupe font-medium">
                {dict.about.lead}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
              {doctorProfile.extendedBio[locale].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Verified Fact Strip */}
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-t border-b border-hairline">
              <div>
                <dt className="editorial-kicker">{dict.about.roleLabel}</dt>
                <dd className="text-sm font-medium text-espresso mt-1">
                  {doctorProfile.title[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-kicker">{dict.about.locationLabel}</dt>
                <dd className="text-sm font-medium text-espresso mt-1">
                  {doctorProfile.city[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-kicker">
                  {dict.about.coordinationLabel}
                </dt>
                <dd className="text-sm font-medium text-espresso mt-1">
                  <a
                    href={doctorProfile.contact.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-taupe"
                  >
                    <span dir="ltr">
                      {doctorProfile.contact.whatsappDisplay}
                    </span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Genuine Doctor Portrait Inside Signature Arch Frame */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <figure className="mx-auto max-w-[380px] space-y-3">
              <div className="overflow-hidden rounded-t-full bg-warm border border-hairline aspect-[3/3.85]">
                <Image
                  src={doctorProfile.portraits.hero.src}
                  alt={doctorProfile.portraits.hero.alt[locale]}
                  width={doctorProfile.portraits.hero.width}
                  height={doctorProfile.portraits.hero.height}
                  priority
                  sizes="(max-width: 1024px) 85vw, 380px"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="text-center text-xs text-ink-muted">
                {doctorProfile.portraits.hero.caption[locale]}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Specialization & Focus Areas */}
      <section className="bg-warm border-t border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-18 lg:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-2.5">
                <p className="editorial-kicker">
                  {dict.about.specializationHeading}
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-espresso leading-snug max-w-xl">
                  {doctorProfile.specializationSummary[locale]}
                </h2>
              </div>

              <div className="space-y-3.5">
                <h3 className="text-xs font-medium text-ink-muted">
                  {dict.about.focusListHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctorProfile.focusAreas[locale].map((focusItem) => (
                    <li
                      key={focusItem}
                      className="flex items-center gap-3 bg-canvas border border-hairline px-4 py-3.5 rounded-[6px] text-sm font-medium text-espresso"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-taupe shrink-0"
                        aria-hidden="true"
                      />
                      <span>{focusItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden border border-hairline bg-canvas max-w-xs mx-auto lg:ms-auto">
                <Image
                  src={doctorProfile.portraits.editorial.src}
                  alt={doctorProfile.portraits.editorial.alt[locale]}
                  width={doctorProfile.portraits.editorial.width}
                  height={doctorProfile.portraits.editorial.height}
                  sizes="(max-width: 1024px) 75vw, 320px"
                  className="w-full h-auto aspect-[3/3.8] object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Verified Credentials — Hidden automatically until populated */}
      {hasAnyStructuredCredentials && (
        <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-14">
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

      {/* Appointment CTA */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-18 lg:py-22 text-center space-y-5">
        <h2 className="text-2xl sm:text-4xl font-semibold text-espresso">
          {dict.about.ctaHeading}
        </h2>
        <p className="text-sm sm:text-base text-ink-soft max-w-xl mx-auto leading-relaxed">
          {dict.about.ctaBody}
        </p>
        <div className="pt-2">
          <Link
            href={`/${locale}/consultation`}
            className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a1f19] px-8 py-3.5 text-sm font-medium rounded-[6px]"
          >
            {dict.about.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
