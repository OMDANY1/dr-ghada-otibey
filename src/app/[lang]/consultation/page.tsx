import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { consultationFaqs } from "@/content/consultation";
import { ConsultationWizard } from "@/components/ConsultationWizard";

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
    path: "/consultation",
    title: dict.meta.consultationTitle,
    description: dict.meta.consultationDescription,
  });
}

export default async function ConsultationPage({
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
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-12 pb-10 lg:pt-16 lg:pb-12 border-b border-hairline">
        <div className="max-w-3xl space-y-3.5">
          <p className="editorial-kicker">{dict.consultation.kicker}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
            {dict.consultation.heading}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {dict.consultation.lead}
          </p>
        </div>
      </section>

      {/* 3-Step Interactive Consultation Wizard */}
      <section className="bg-warm border-b border-hairline">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 lg:py-18">
          <Suspense
            fallback={
              <div className="bg-canvas border border-hairline rounded-[10px] p-10 min-h-[360px]" />
            }
          >
            <ConsultationWizard locale={locale} dict={dict} />
          </Suspense>
        </div>
      </section>

      {/* Frequently Asked Questions Section — Split Editorial Style */}
      <section
        id="faq"
        className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-18 lg:py-24 scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="h-[1.5px] w-10 bg-taupe" aria-hidden="true" />
            <p className="editorial-kicker">{dict.consultation.faq.kicker}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-espresso leading-snug">
              {dict.consultation.faq.heading}
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              {dict.consultation.faq.lead}
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {consultationFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-warm/60 border border-hairline rounded-[6px] px-5 py-4"
              >
                <summary className="cursor-pointer flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-espresso">
                  <span>{faq.question[locale]}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                    className="text-taupe shrink-0 group-open:rotate-180 editorial-fade"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="pt-3 mt-3 border-t border-hairline text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {faq.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
