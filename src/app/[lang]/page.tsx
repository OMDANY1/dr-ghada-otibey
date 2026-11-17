import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accountTopics, doctorProfile } from "@/content/doctor";
import { consultationFaqs } from "@/content/consultation";
import { getPublicArticles, articleCategories } from "@/content/articles";
import { getPublicReviews } from "@/content/reviews";
import { HomeQuickConsultationCard } from "@/components/HomeQuickConsultationCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const publicArticles = getPublicArticles(locale);
  const publicReviews = getPublicReviews(locale);
  const arrow = locale === "ar" ? "←" : "→";

  const pillarStrip = [
    {
      href: `/${locale}/areas-of-care#skin-health`,
      label: locale === "ar" ? "صحة البشرة" : "Skin Health",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          aria-hidden="true"
        >
          <path
            d="M12 3.5C12 3.5 6.5 10.2 6.5 14.5a5.5 5.5 0 0 0 11 0C17.5 10.2 12 3.5 12 3.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: `/${locale}/areas-of-care#hair-scalp`,
      label: locale === "ar" ? "العناية بالشعر" : "Hair Care",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          aria-hidden="true"
        >
          <path
            d="M12 20c0-5 2.5-9.5 4.5-14M9.5 19.5c.4-3.8 1.8-7.4 3.3-11M7 17.5c2.2 .8 6.8 .8 10 0"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      href: `/${locale}/areas-of-care#cosmetic-rejuvenation`,
      label: locale === "ar" ? "تجديد الجلد" : "Skin Rejuvenation",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          aria-hidden="true"
        >
          <path
            d="M12 4.5 4.5 8.5 12 12.5l7.5-4L12 4.5Z"
            strokeLinejoin="round"
          />
          <path
            d="m4.5 12.2 7.5 4 7.5-4M4.5 15.8l7.5 4 7.5-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: `/${locale}/areas-of-care#skin-aging`,
      label: locale === "ar" ? "العناية مع تقدم العمر" : "Well-Aging Care",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          aria-hidden="true"
        >
          <path
            d="M12 6c1.8 2.4 2.7 5 2.4 8-2.4-.3-4.8-.3-4.8 0-.3-3 .6-5.6 2.4-8Z"
            strokeLinejoin="round"
          />
          <path
            d="M12 14c2.8-2.2 5.5-2.6 7.5-1.5-.8 3-3.4 4.8-7.5 4.8-4.1 0-6.7-1.8-7.5-4.8 2-1.1 4.7-.7 7.5 1.5Z"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const visualCareCards = [
    {
      id: "skin-radiance",
      href: `/${locale}/areas-of-care#skin-health`,
      src: "/images/editorial/care-skin-radiance.jpg",
      alt:
        locale === "ar"
          ? "صورة تعبيرية لنضارة البشرة وصحتها"
          : "Editorial close-up representing skin radiance and hydration",
      label: locale === "ar" ? "البشرة ونضارتها" : "Skin & Radiance",
    },
    {
      id: "hair-scalp-card",
      href: `/${locale}/areas-of-care#hair-scalp`,
      src: "/images/editorial/care-hair-waves.jpg",
      alt:
        locale === "ar"
          ? "صورة تعبيرية للعناية بالشعر وفروة الرأس"
          : "Editorial hair texture representing hair and scalp care",
      label: locale === "ar" ? "الشعر وفروة الرأس" : "Hair & Scalp",
    },
    {
      id: "skin-rejuvenation-card",
      href: `/${locale}/areas-of-care#cosmetic-rejuvenation`,
      src: "/images/editorial/care-serum-dropper.jpg",
      alt:
        locale === "ar"
          ? "صورة تعبيرية لتجديد الجلد والعناية المتخصصة"
          : "Editorial dropper close-up representing skin rejuvenation",
      label: locale === "ar" ? "تجديد الجلد" : "Skin Rejuvenation",
    },
  ];

  const topicImageMap: Record<string, string> = {
    "eye-area-care": "/images/editorial/topic-eye-contour.jpg",
    "neck-elasticity": "/images/editorial/topic-neck-profile.jpg",
    "pores-skin-care": "/images/editorial/topic-pores-droplets.jpg",
  };

  return (
    <div className="bg-canvas">
      {/* 1. ARCH EDITORIAL HERO */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy Column (Start Side — Right in RTL, Left in LTR) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-1">
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-semibold text-espresso">
                {doctorProfile.shortSignature[locale]}
              </p>
              <p className="text-xs sm:text-sm text-ink-muted">
                {doctorProfile.title[locale]} · {doctorProfile.cityShort[locale]}
              </p>
            </div>

            <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.35rem] font-semibold text-espresso leading-[1.26] tracking-tight">
              {locale === "ar" ? (
                <>
                  عناية ببشرتك،
                  <br />
                  تبدأ بفهمها.
                </>
              ) : (
                <>
                  Thoughtful care
                  <br />
                  begins with your skin.
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-ink-soft max-w-md leading-relaxed">
              {locale === "ar"
                ? "العناية بالبشرة والشعر وتجميل الجلد وتجديده"
                : "Skin and hair aging care, cosmetic dermatology, and skin rejuvenation"}
            </p>

            {/* Primary Button + Underlined Secondary Link */}
            <div className="pt-1 flex flex-wrap items-center gap-5 sm:gap-7">
              <Link
                href={`/${locale}/consultation`}
                className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a1f19] px-7 py-3.5 text-sm font-medium rounded-[6px]"
              >
                {locale === "ar"
                  ? "ابدئي طلب الاستشارة"
                  : "Start Consultation"}
              </Link>

              <Link
                href={`/${locale}/about`}
                className="editorial-fade inline-flex items-center gap-2 text-sm font-medium text-espresso border-b border-espresso/50 pb-1 hover:text-taupe hover:border-taupe"
              >
                <span>
                  {locale === "ar" ? "تعرّفي على الدكتورة" : "Meet the Doctor"}
                </span>
                <span aria-hidden="true">{arrow}</span>
              </Link>
            </div>

            {/* Subtle Editorial Divider + Sans Tagline */}
            <div className="pt-4 space-y-3 max-w-xs">
              <div className="h-[1px] w-24 bg-line-strong/80" aria-hidden="true" />
              <p className="text-sm text-taupe font-normal">
                {locale === "ar"
                  ? "عناية هادئة تحترم طبيعة بشرتكِ."
                  : "Skin, thoughtfully cared for."}
              </p>
            </div>
          </div>

          {/* Arched Expressive Skincare Frame + Inset Cream Swatch */}
          <div className="lg:col-span-6 order-2">
            <div className="relative mx-auto max-w-[390px] sm:max-w-[430px]">
              <div className="overflow-hidden rounded-t-full bg-[#DDD1C4] aspect-[3/3.85]">
                <Image
                  src="/images/editorial/hero-skincare-editorial.jpg"
                  alt={
                    locale === "ar"
                      ? "صورة تعبيرية تحريرية للعناية بالبشرة ونضارتها الطبيعية"
                      : "Expressive skincare editorial portrait"
                  }
                  width={896}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 88vw, 430px"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping Inset Cream Swatch on Inner Bottom Edge */}
              <div
                className="absolute bottom-0 start-0 w-28 h-28 sm:w-36 sm:h-36 bg-canvas p-1.5 shadow-xs"
                aria-hidden="true"
              >
                <div className="w-full h-full overflow-hidden bg-warm">
                  <Image
                    src="/images/editorial/cream-swatch-macro.jpg"
                    alt=""
                    width={900}
                    height={900}
                    sizes="150px"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR-PILLAR ICON BAR */}
      <section className="bg-warm border-t border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-6 sm:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0">
            {pillarStrip.map((pillar, idx) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className={`editorial-fade group flex flex-col items-center justify-center gap-2.5 px-4 text-center ${
                  idx < pillarStrip.length - 1
                    ? "md:border-e border-hairline"
                    : ""
                }`}
              >
                <span className="text-taupe group-hover:text-espresso editorial-fade">
                  {pillar.icon}
                </span>
                <span className="text-xs sm:text-[13.5px] font-medium text-espresso group-hover:text-taupe editorial-fade">
                  {pillar.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE DOCTOR — SPLIT EDITORIAL COLLAGE */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-18 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Copy Column (Start Side in RTL / LTR) */}
          <div className="lg:col-span-5 space-y-5 order-1">
            <h2 className="text-3xl sm:text-4xl font-semibold text-espresso leading-[1.32]">
              {locale === "ar" ? (
                <>
                  اعرفي الدكتورة
                  <br />
                  غادة العتيبي
                </>
              ) : (
                <>
                  Meet Dr. Ghada
                  <br />
                  Alotaibi
                </>
              )}
            </h2>

            <div className="space-y-2.5 text-sm sm:text-[15px] text-ink-soft leading-relaxed">
              <p className="font-medium text-espresso">
                {locale === "ar"
                  ? "استشارية أمراض جلدية في الرياض"
                  : "Consultant Dermatologist in Riyadh"}
              </p>
              <p>{doctorProfile.specializationSummary[locale]}</p>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/about`}
                className="editorial-fade inline-flex items-center gap-2 text-sm font-medium text-espresso border-b border-espresso/50 pb-1 hover:text-taupe hover:border-taupe"
              >
                <span>
                  {locale === "ar" ? "المزيد عن الدكتورة" : "Read Full Profile"}
                </span>
                <span aria-hidden="true">{arrow}</span>
              </Link>
            </div>
          </div>

          {/* Dual-Frame Editorial Still-Life Collage */}
          <div className="lg:col-span-7 order-2">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
              <div className="col-span-7 overflow-hidden bg-warm">
                <Image
                  src="/images/editorial/cream-jar-shadow.jpg"
                  alt={
                    locale === "ar"
                      ? "تكوين تحريري هادئ للعناية بالبشرة في ضوء طبيعي"
                      : "Calm natural-light skincare editorial composition"
                  }
                  width={896}
                  height={1200}
                  sizes="(max-width: 1024px) 54vw, 360px"
                  className="w-full h-full aspect-[3/3.22] object-cover"
                />
              </div>
              <div className="col-span-5 overflow-hidden bg-warm">
                <Image
                  src="/images/editorial/cream-swatch-macro.jpg"
                  alt={
                    locale === "ar"
                      ? "تفصيل تحريري لملمس كريم العناية بالبشرة"
                      : "Editorial skincare cream texture detail"
                  }
                  width={900}
                  height={900}
                  sizes="(max-width: 1024px) 38vw, 240px"
                  className="w-full h-full aspect-[3/4.5] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CARE CENTERED AROUND YOUR NEEDS — 3 EDITORIAL CARDS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 pb-20 sm:pb-26">
        {/* Centered Heading Flanked by Hairlines */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <span
            className="h-[1px] w-12 sm:w-20 bg-line-strong"
            aria-hidden="true"
          />
          <h2 className="text-2xl sm:text-3xl font-semibold text-espresso text-center">
            {locale === "ar"
              ? "عناية تبدأ باحتياجكِ"
              : "Care Centered Around Your Needs"}
          </h2>
          <span
            className="h-[1px] w-12 sm:w-20 bg-line-strong"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visualCareCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group block overflow-hidden bg-card-bar"
            >
              <div className="overflow-hidden aspect-square bg-warm">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={900}
                  height={900}
                  sizes="(max-width: 768px) 92vw, 350px"
                  className="w-full h-full object-cover group-hover:scale-[1.02] editorial-fade"
                />
              </div>
              <div className="bg-card-bar py-4 px-4 text-center">
                <h3 className="text-sm sm:text-[15px] font-medium text-espresso group-hover:text-taupe editorial-fade">
                  {card.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/areas-of-care`}
            className="editorial-fade inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-ink-soft hover:text-espresso border-b border-line-strong pb-0.5"
          >
            <span>{dict.home.areasViewAll}</span>
            <span aria-hidden="true">{arrow}</span>
          </Link>
        </div>
      </section>

      {/* 5. DEEP ESPRESSO INTERACTIVE CONSULTATION BAND */}
      <section className="relative overflow-hidden bg-espresso text-canvas">
        {/* Subtle Botanical Shadow Accent (Flat Editorial — No heavy gradients or glass) */}
        <svg
          viewBox="0 0 400 500"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 end-0 w-72 sm:w-96 text-black/15"
        >
          <path d="M360 490C310 380 230 310 90 270c95-12 175 18 235 72-35-85-95-155-185-205 85 10 158 55 205 128-10-75-38-145-92-210 62 38 106 104 122 185 8-45 12-90 8-135 24 68 25 145-23 385Z" />
        </svg>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-16 sm:py-22 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Editorial Headline Side */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-3xl sm:text-5xl font-medium text-[#FAF7F2] leading-[1.25]">
                {locale === "ar" ? (
                  <>
                    لكل بشرة
                    <br />
                    حكاية.
                  </>
                ) : (
                  <>
                    Every skin has
                    <br />
                    its story.
                  </>
                )}
              </h2>

              <div className="h-[1.5px] w-12 bg-taupe" aria-hidden="true" />

              <p className="text-sm sm:text-base text-[#E2D8CC] leading-relaxed max-w-sm">
                {locale === "ar"
                  ? "ابدئي خطوتكِ الأولى باستشارة منظمة ومباشرة مع فريق التنسيق."
                  : "Begin your first step with an attentive consultation."}
              </p>
            </div>

            {/* Interactive White Quick-Consultation Card */}
            <div className="lg:col-span-7">
              <HomeQuickConsultationCard locale={locale} dict={dict} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOPICS FROM THE ACCOUNT — "مساحة للمعرفة والجمال" */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-20 sm:py-26">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-line-strong" aria-hidden="true" />
            <p className="editorial-kicker">
              {locale === "ar" ? "مواضيع من الحساب" : "From the Account"}
            </p>
            <span className="h-[1px] w-10 bg-line-strong" aria-hidden="true" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-semibold text-espresso">
            {locale === "ar"
              ? "مساحة للمعرفة والجمال"
              : "A Space for Skin Knowledge & Care"}
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto leading-relaxed">
            {dict.home.topicsDisclaimer}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {accountTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/${locale}/consultation?topic=${topic.consultationTopicKey}`}
              className="group block overflow-hidden bg-card-bar"
            >
              <div className="overflow-hidden aspect-[4/3] bg-warm">
                <Image
                  src={
                    topicImageMap[topic.id] ||
                    "/images/editorial/topic-pores-droplets.jpg"
                  }
                  alt={topic.title[locale]}
                  width={900}
                  height={672}
                  sizes="(max-width: 768px) 92vw, 350px"
                  className="w-full h-full object-cover group-hover:scale-[1.02] editorial-fade"
                />
              </div>
              <div className="bg-card-bar py-4 px-4 text-center">
                <h3 className="text-sm sm:text-[15px] font-medium text-espresso group-hover:text-taupe editorial-fade">
                  {topic.title[locale]}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Approved Articles Preview (if any) + Centered Link Matching Reference */}
        {publicArticles.length > 0 && (
          <div className="mt-10 pt-8 border-t border-hairline grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicArticles.slice(0, 2).map((article) => (
              <article
                key={article.slug}
                className="p-6 bg-warm rounded-[6px] space-y-2"
              >
                <span className="text-xs text-taupe">
                  {articleCategories[article.categoryKey][locale]}
                </span>
                <h3 className="text-lg font-semibold text-espresso">
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                    className="hover:text-taupe"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft">
                  {article.summary}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-9 flex flex-col items-center gap-3 text-center">
          <Link
            href={`/${locale}/articles`}
            className="editorial-fade inline-flex items-center gap-2 text-sm font-medium text-espresso border-b border-espresso/50 pb-1 hover:text-taupe hover:border-taupe"
          >
            <span>
              {locale === "ar" ? "استكشفي المقالات" : "Explore Articles"}
            </span>
            <span aria-hidden="true">{arrow}</span>
          </Link>

          {publicArticles.length === 0 && (
            <p className="text-xs text-ink-muted">
              {dict.home.articlesEmptyNotice}
            </p>
          )}
        </div>
      </section>

      {/* 7. BEFORE YOUR CONSULTATION — SPLIT FAQ & VERIFIED REVIEWS NOTE */}
      <section className="bg-warm border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-18 sm:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Heading Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="h-[1.5px] w-10 bg-taupe" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-espresso">
                {locale === "ar"
                  ? "قبل استشارتكِ"
                  : "Before Your Consultation"}
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {dict.consultation.faq.lead}
              </p>

              {/* Discreet Verified Reviews Link Preserving Complete Sitemap Access */}
              <div className="pt-2">
                {publicReviews.length === 0 ? (
                  <Link
                    href={`/${locale}/reviews`}
                    className="text-xs font-medium text-ink-muted hover:text-espresso underline underline-offset-4"
                  >
                    {dict.home.reviewsPageLink}
                  </Link>
                ) : (
                  <Link
                    href={`/${locale}/reviews`}
                    className="text-xs font-medium text-espresso underline underline-offset-4"
                  >
                    {dict.home.reviewsHeading}
                  </Link>
                )}
              </div>
            </div>

            {/* Clean Stacked Accordion Rows Matching Reference */}
            <div className="lg:col-span-8 space-y-2.5">
              {consultationFaqs.slice(0, 4).map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-canvas border border-hairline rounded-[6px] px-5 py-4"
                >
                  <summary className="cursor-pointer flex items-center justify-between gap-4 text-sm sm:text-[15px] font-medium text-espresso">
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
        </div>
      </section>
    </div>
  );
}
