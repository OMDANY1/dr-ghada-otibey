import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { consultationFaqs } from "@/content/consultation";
import { doctorProfile } from "@/content/doctor";
import { ConsultationWizard } from "@/components/ConsultationWizard";
import { StitchIcon } from "@/components/StitchIcon";

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
      {/* Top Dossier Meta Ribbon (Stitch Screen 5 — Verified Location Only) */}
      <section className="w-full bg-surface-low border-b border-surface-high py-3">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold bg-secondary-container text-primary px-2.5 py-0.5 rounded">
              {locale === "ar" ? "تنسيق المواعيد" : "Direct Coordination"}
            </span>
            <span className="text-on-surface-variant">
              {doctorProfile.city[locale]}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>{dict.consultation.coordinationNotice}</span>
          </div>
        </div>
      </section>

      {/* Editorial Section Title Banner + Official Coordination Number Box */}
      <section className="w-full py-10 md:py-14 bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="editorial-kicker">
                  {dict.consultation.kicker}
                </span>
                <span className="h-px w-12 bg-secondary-dim" />
              </div>
              <h1 className="font-editorial text-3xl sm:text-5xl text-primary leading-tight">
                {dict.consultation.heading}
              </h1>
              <p className="text-base sm:text-[17px] text-on-surface-variant font-light max-w-2xl leading-relaxed">
                {dict.consultation.lead}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-1.5 bg-surface-container border border-surface-high p-5 rounded-xl">
              <div className="flex items-center justify-between text-secondary text-xs font-medium">
                <span>{dict.about.coordinationLabel}</span>
                <StitchIcon name="verified" size={16} />
              </div>
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-editorial text-2xl text-primary hover:text-secondary"
              >
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>
              <p className="text-xs text-on-surface-variant">
                {locale === "ar"
                  ? "متابعة وترتيب المواعيد عبر فريق التنسيق على واتساب"
                  : "Appointment scheduling via the WhatsApp coordination team"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Step Interactive Booking Interface */}
      <section className="w-full pb-16 md:pb-22 bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <Suspense
            fallback={
              <div className="bg-surface-lowest border border-surface-high rounded-xl p-10 min-h-[420px]" />
            }
          >
            <ConsultationWizard locale={locale} dict={dict} />
          </Suspense>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section (Stitch Screen 5 Centered Accordion) */}
      <section
        id="faq"
        className="w-full py-16 md:py-22 bg-surface-low border-t border-surface-high scroll-mt-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="flex flex-col gap-2 mb-10 text-center max-w-xl mx-auto">
            <span className="editorial-kicker">
              {dict.consultation.faq.kicker}
            </span>
            <h2 className="font-editorial text-3xl sm:text-[38px] text-primary">
              {dict.consultation.faq.heading}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {dict.consultation.faq.lead}
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {consultationFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-surface-lowest border border-surface-high rounded-lg shadow-xs overflow-hidden"
              >
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 hover:bg-surface-low/60 editorial-fade">
                  <span className="font-editorial text-lg sm:text-[21px] text-primary">
                    {faq.question[locale]}
                  </span>
                  <StitchIcon
                    name="chevron-down"
                    size={18}
                    className="text-secondary shrink-0 group-open:rotate-180 editorial-fade"
                  />
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed border-t border-surface-high/60">
                  {faq.answer[locale]}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
