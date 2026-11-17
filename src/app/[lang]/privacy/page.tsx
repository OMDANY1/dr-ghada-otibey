import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
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
    path: "/privacy",
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
  });
}

export default async function PrivacyPolicyPage({
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
      <div className="w-full bg-surface-low border-b border-surface-high py-2.5">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 flex items-center gap-2 text-xs font-medium text-secondary">
          <StitchIcon name="shield" size={15} />
          <span>{dict.privacy.kicker}</span>
        </div>
      </div>

      <section className="mx-auto max-w-4xl w-full px-5 md:px-12 pt-12 pb-8">
        <div className="space-y-3">
          <span className="editorial-kicker">{dict.privacy.kicker}</span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-primary">
            {dict.privacy.heading}
          </h1>
          <p className="text-base sm:text-[17px] text-on-surface-variant font-light leading-relaxed">
            {dict.privacy.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl w-full px-5 md:px-12 pb-20">
        <div className="bg-surface-lowest border border-surface-high rounded-xl p-6 sm:p-10 shadow-xs divide-y divide-surface-high">
          {dict.privacy.sections.map((section, idx) => (
            <div key={idx} className="py-7 first:pt-0 last:pb-0 space-y-3">
              <h2 className="font-editorial text-2xl text-primary">
                {section.title}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base text-on-surface-variant leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
