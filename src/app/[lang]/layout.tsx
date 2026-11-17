import { Suspense } from "react";
import type { Metadata } from "next";
import {
  EB_Garamond,
  IBM_Plex_Sans_Arabic,
  Inter,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  getDirection,
  isValidLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildDoctorJsonLd, buildPageMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar-serif",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ar-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-en-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-en-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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
    path: "",
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
  });
}

export default async function LocalizedRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dir = getDirection(locale);
  const dict = getDictionary(locale);
  const jsonLd = buildDoctorJsonLd(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${notoNaskhArabic.variable} ${ibmPlexSansArabic.variable} ${ebGaramond.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-on-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense
          fallback={
            <header className="sticky top-0 z-50 h-20 bg-surface-bright border-b border-surface-high" />
          }
        >
          <SiteHeader locale={locale} dict={dict} />
        </Suspense>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
