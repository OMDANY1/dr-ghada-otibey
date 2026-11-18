import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { LineReveal, Reveal } from "@/lib/motion";

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
      <section className="mx-auto max-w-4xl w-full px-5 sm:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-copper-500/20 space-y-4">
        <span className="editorial-kicker">{dict.privacy.kicker}</span>
        <h1 className="font-editorial text-[clamp(2.4rem,4.8vw,4.5rem)] text-primary leading-[1.15]">
          <LineReveal immediate delay={0.05}>
            {dict.privacy.heading}
          </LineReveal>
        </h1>
        <Reveal immediate delay={0.18}>
          <p className="text-base sm:text-[18px] text-on-surface-variant font-light leading-[1.9] max-w-[62ch]">
            {dict.privacy.lead}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl w-full px-5 sm:px-8 py-14 sm:py-22 divide-y divide-copper-500/20">
        {dict.privacy.sections.map((section, idx) => (
          <Reveal
            key={idx}
            delay={idx * 0.06}
            className="py-8 first:pt-0 last:pb-0 space-y-3.5"
          >
            <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
              {section.title}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-sm sm:text-base text-on-surface-variant leading-[1.95] max-w-[65ch]"
              >
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </section>
    </div>
  );
}
