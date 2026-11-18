import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { consultationFaqs } from "@/content/consultation";
import { ConsultationWizard } from "@/components/ConsultationWizard";
import { StitchIcon } from "@/components/StitchIcon";
import { Reveal } from "@/lib/motion";

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
    <div className="flex flex-col w-full bg-surface">
      {/* Editorial Title Spread */}
      <section className="w-full pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Reveal immediate className="max-w-3xl space-y-4">
            <span className="editorial-kicker">
              {dict.consultation.kicker}
            </span>
            <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.6rem)] text-primary leading-[1.15]">
              {dict.consultation.heading}
            </h1>
            <p className="text-base sm:text-[18px] text-on-surface-variant font-light leading-[1.9] max-w-[62ch]">
              {dict.consultation.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3-Step Borderless Editorial Consultation Wizard */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Suspense
            fallback={
              <div className="border-t border-copper-500/20 py-12 min-h-[420px]" />
            }
          >
            <ConsultationWizard locale={locale} dict={dict} />
          </Suspense>
        </div>
      </section>

      {/* Editorial Hairline FAQ Section */}
      <section
        id="faq"
        className="w-full py-20 sm:py-28 bg-surface-low/65 border-t border-copper-500/20 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-4 space-y-3">
            <span className="editorial-kicker">
              {dict.consultation.faq.kicker}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-primary leading-tight">
              {dict.consultation.faq.heading}
            </h2>
            <p className="text-sm text-on-surface-variant leading-[1.85]">
              {dict.consultation.faq.lead}
            </p>
          </Reveal>

          <div className="lg:col-span-8 border-t border-copper-500/25 divide-y divide-copper-500/20">
            {consultationFaqs.map((faq) => (
              <details key={faq.id} className="group py-6">
                <summary className="cursor-pointer flex items-center justify-between gap-4">
                  <span className="font-editorial text-xl sm:text-2xl text-primary group-hover:text-copper-700 transition-colors">
                    {faq.question[locale]}
                  </span>
                  <StitchIcon
                    name="chevron-down"
                    size={18}
                    className="text-copper-500 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pt-4 text-sm sm:text-base text-on-surface-variant leading-[1.9] max-w-[64ch]">
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
