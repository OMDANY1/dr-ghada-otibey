import type { Metadata } from "next";
import { getSiteUrl, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const dict = getDictionary(locale);
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${siteUrl}/${locale}${cleanPath}`;
  const arUrl = `${siteUrl}/ar${cleanPath}`;
  const enUrl = `${siteUrl}/en${cleanPath}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: arUrl,
        en: enUrl,
        "x-default": arUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      url: canonicalUrl,
      siteName: dict.meta.siteName,
      title,
      description,
      images: [
        {
          url: `${siteUrl}${doctorProfile.portraits.hero.src}`,
          width: doctorProfile.portraits.hero.width,
          height: doctorProfile.portraits.hero.height,
          alt: doctorProfile.portraits.hero.alt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${doctorProfile.portraits.hero.src}`],
    },
  };
}

export function buildDoctorJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/${locale}#doctor`,
    name: doctorProfile.name[locale],
    alternateName:
      locale === "ar" ? doctorProfile.name.en : doctorProfile.name.ar,
    jobTitle: doctorProfile.title[locale],
    description: doctorProfile.specializationSummary[locale],
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}${doctorProfile.portraits.hero.src}`,
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locale === "ar" ? "الرياض" : "Riyadh",
        addressCountry: "SA",
      },
    },
    sameAs: [
      doctorProfile.contact.instagramUrl,
      doctorProfile.contact.linktreeUrl,
    ],
  };
}
