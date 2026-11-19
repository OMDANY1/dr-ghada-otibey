import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
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
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const elgharibFont = localFont({
  src: [
    {
      path: "../../fonts/Elgharib-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Elgharib-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Elgharib-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Elgharib-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/Elgharib-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const stcFont = localFont({
  src: [
    {
      path: "../../fonts/STC-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/STC-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/STC-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
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
      className={`${elgharibFont.variable} ${stcFont.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-on-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <Suspense
            fallback={
              <header className="fixed top-0 inset-x-0 z-50 h-16 sm:h-[72px] bg-transparent" />
            }
          >
            <SiteHeader locale={locale} dict={dict} />
          </Suspense>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
