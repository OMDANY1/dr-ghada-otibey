import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";

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
    <div className="bg-canvas">
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-12 pb-10 lg:pt-18 lg:pb-12 border-b border-hairline space-y-3.5">
        <p className="editorial-kicker">{dict.privacy.kicker}</p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-espresso leading-[1.26]">
          {dict.privacy.heading}
        </h1>
        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
          {dict.privacy.lead}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-14 lg:py-18 divide-y divide-hairline">
        {dict.privacy.sections.map((section, idx) => (
          <div key={idx} className="py-7 first:pt-0 last:pb-0 space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-espresso">
              {section.title}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-sm sm:text-base text-ink-soft leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
