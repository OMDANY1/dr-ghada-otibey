import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { accountTopics, doctorProfile } from "@/content/doctor";
import { areasOfCare } from "@/content/areas";
import { articleCategories, getPublicArticles } from "@/content/articles";
import { getPublicReviews } from "@/content/reviews";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";

const areaIconMap: Record<string, StitchIconName> = {
  "skin-health": "dermatology",
  "hair-scalp": "hair",
  "skin-aging": "hourglass",
  "cosmetic-rejuvenation": "sparkle",
};

const topicImageMap: Record<string, string> = {
  "eye-area-care": "/images/editorial/topic-eye-contour.jpg",
  "neck-elasticity": "/images/editorial/topic-neck-profile.jpg",
  "pores-skin-care": "/images/editorial/topic-pores-droplets.jpg",
};

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
  const dirArrow: StitchIconName =
    locale === "ar" ? "arrow-back" : "arrow-forward";

  const heroIndicators =
    locale === "ar"
      ? [
          {
            kicker: "التقييم",
            title: "فردي ومباشر",
            desc: "قراءة احتياج البشرة والشعر الفعلي أثناء الاستشارة",
          },
          {
            kicker: "الاهتمام الدقيق",
            title: "البشرة والشعر",
            desc: "مقاومة شيخوختهما وتجميل الجلد وتجديده",
          },
          {
            kicker: "الموقع",
            title: "الرياض",
            desc: "تنسيق مواعيد منظم يحترم خصوصيتكِ",
          },
        ]
      : [
          {
            kicker: "Assessment",
            title: "Individualized",
            desc: "In-person clinical reading of skin and scalp needs",
          },
          {
            kicker: "Special Focus",
            title: "Skin & Hair",
            desc: "Well-aging care, cosmetic dermatology, and rejuvenation",
          },
          {
            kicker: "Location",
            title: "Riyadh",
            desc: "Structured appointment coordination with discretion",
          },
        ];

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Subtle Context Ribbon (Stitch Shell Bar — Verified Facts Only) */}
      <section className="w-full bg-surface-low border-b border-surface-high py-2.5">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-secondary">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>
              {doctorProfile.title[locale]} • {doctorProfile.cityShort[locale]}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-on-surface-variant">
            <span>{doctorProfile.specializationSummary[locale]}</span>
          </div>
        </div>
      </section>

      {/* A. EDITORIAL HERO SECTION (Stitch Asymmetric 12-Col Dossier Hero) */}
      <section className="w-full bg-surface py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Copy & Typographic Column */}
            <div className="lg:col-span-7 flex flex-col gap-7">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="editorial-kicker">
                    {locale === "ar"
                      ? "ملف تعريفي مهني · الرياض"
                      : "Dermatology Profile · Riyadh"}
                  </span>
                  <span
                    className="w-8 h-[1px] bg-secondary-dim"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-primary">
                  {doctorProfile.name[locale]} — {doctorProfile.title[locale]}
                  {locale === "ar" ? "، " : ", "}
                  {doctorProfile.cityShort[locale]}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] text-primary leading-[1.16] max-w-2xl">
                  {locale === "ar" ? (
                    <>
                      عناية ببشرتك،
                      <br />
                      <span className="text-secondary">تبدأ بفهمها.</span>
                    </>
                  ) : (
                    <>
                      Thoughtful care
                      <br />
                      <span className="italic text-secondary">
                        begins with understanding your skin.
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-[18px] text-on-surface-variant max-w-xl font-light leading-relaxed">
                  {doctorProfile.conciseBio[locale]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href={`/${locale}/consultation`}
                  className="editorial-fade inline-flex items-center justify-center gap-2.5 bg-primary-container text-on-primary text-xs font-medium px-7 h-12 rounded shadow-xs hover:bg-primary-hover"
                >
                  <span>{dict.hero.primaryCta}</span>
                  <StitchIcon name={dirArrow} size={15} />
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="editorial-fade inline-flex items-center justify-center bg-surface-low border border-surface-high text-primary text-xs font-medium px-7 h-12 rounded hover:bg-surface-container"
                >
                  <span>{dict.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* 3 Micro Indicator Cards (Verified Qualitative Attributes Only) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 max-w-xl">
                {heroIndicators.map((ind) => (
                  <div
                    key={ind.kicker}
                    className="bg-surface-low border border-surface-high/70 p-3.5 rounded"
                  >
                    <span className="text-[10px] font-semibold text-secondary block">
                      {ind.kicker}
                    </span>
                    <span className="font-editorial text-[20px] text-primary block mt-0.5 leading-snug">
                      {ind.title}
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Architectural Visual Frame + Floating Dossier Label */}
            <div className="lg:col-span-5 relative pb-4">
              <div className="relative bg-surface-high p-4 shadow-xs max-w-md mx-auto lg:max-w-none">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container">
                  <Image
                    src={doctorProfile.portraits.hero.src}
                    alt={doctorProfile.portraits.hero.alt[locale]}
                    width={doctorProfile.portraits.hero.width}
                    height={doctorProfile.portraits.hero.height}
                    priority
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Stitch Editorial Floating Card */}
                <div className="absolute -bottom-4 start-6 end-6 sm:end-auto bg-surface-lowest py-3.5 px-5 shadow-md border border-surface-high sm:max-w-[300px]">
                  <span className="text-[10px] font-semibold text-secondary block">
                    {doctorProfile.title[locale]}
                  </span>
                  <p className="font-editorial text-[21px] text-primary mt-0.5 leading-snug">
                    {doctorProfile.shortSignature[locale]}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {doctorProfile.specializationSummary[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. BRIEF BIO SECTION (Stitch 4/8 Split Dossier Band) */}
      <section className="w-full bg-surface-low py-14 md:py-20 border-t border-b border-surface-high">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="editorial-kicker">{dict.home.introKicker}</span>
              <h2 className="font-editorial text-3xl sm:text-[38px] text-primary leading-[1.22]">
                {dict.home.introHeading}
              </h2>
              <div className="w-12 h-[2px] bg-secondary my-1" aria-hidden="true" />
              <p className="text-xs font-medium text-on-surface-variant">
                {doctorProfile.city[locale]}
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-surface-lowest p-6 sm:p-9 shadow-xs border border-surface-high/80">
                <p className="text-base sm:text-[18px] text-primary leading-relaxed font-light mb-6">
                  {doctorProfile.extendedBio[locale][0]}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <StitchIcon
                      name="check-circle"
                      size={19}
                      className="text-secondary shrink-0 mt-1"
                    />
                    <p className="leading-relaxed">
                      {doctorProfile.extendedBio[locale][1]}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <StitchIcon
                      name="check-circle"
                      size={19}
                      className="text-secondary shrink-0 mt-1"
                    />
                    <p className="leading-relaxed">
                      {doctorProfile.extendedBio[locale][2]}
                    </p>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-surface-high flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-medium bg-tertiary-fixed text-primary px-2.5 py-1 rounded">
                      {doctorProfile.title[locale]}
                    </span>
                    <span className="text-[11px] font-medium bg-tertiary-fixed text-primary px-2.5 py-1 rounded">
                      {doctorProfile.cityShort[locale]}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/about`}
                    className="editorial-fade text-xs font-medium text-secondary hover:text-primary inline-flex items-center gap-1.5"
                  >
                    <span>{dict.home.introLink}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. AREAS OF CARE SECTION (Stitch 4-Column Dossier Grid) */}
      <section className="w-full bg-surface py-16 md:py-22">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="editorial-kicker">{dict.home.areasKicker}</span>
              <h2 className="font-editorial text-3xl sm:text-[40px] text-primary leading-[1.2]">
                {dict.home.areasHeading}
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 max-w-sm">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {dict.home.areasSubheading}
              </p>
              <Link
                href={`/${locale}/areas-of-care`}
                className="text-xs font-medium text-primary underline underline-offset-4 hover:text-secondary"
              >
                {dict.home.areasViewAll}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areasOfCare.map((area) => (
              <div
                key={area.id}
                className="editorial-fade bg-surface-low border border-surface-high/80 p-7 flex flex-col justify-between hover:bg-surface-container shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      dir="ltr"
                      className="text-xs font-semibold text-secondary font-mono"
                    >
                      {area.number}
                    </span>
                    <StitchIcon
                      name={areaIconMap[area.id] || "dermatology"}
                      size={22}
                      className="text-secondary"
                    />
                  </div>

                  <span className="text-[11px] font-medium text-on-surface-variant block">
                    {area.kicker[locale]}
                  </span>

                  <h3 className="font-editorial text-[23px] text-primary mt-1 mb-3 leading-snug">
                    <Link
                      href={`/${locale}/areas-of-care#${area.id}`}
                      className="hover:text-secondary editorial-fade"
                    >
                      {area.title[locale]}
                    </Link>
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {area.shortSummary[locale]}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-high">
                  <Link
                    href={`/${locale}/consultation?area=${area.consultationTopicKey}`}
                    className="w-full inline-flex items-center justify-between text-xs font-medium text-primary group-hover:text-secondary editorial-fade"
                  >
                    <span>{dict.home.areasInquireLink}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. EDUCATIONAL CONSULTATION FRAMEWORK ACCENT (Stitch Analytical Visual Card — Non-Promissory) */}
      <section className="w-full bg-surface-low py-14 md:py-18 border-t border-b border-surface-high">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="bg-surface-lowest p-6 sm:p-10 lg:p-12 shadow-xs border border-surface-high/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <span className="editorial-kicker">
                  {locale === "ar"
                    ? "نهج التقييم المباشر"
                    : "In-Clinic Evaluation Approach"}
                </span>
                <h3 className="font-editorial text-2xl sm:text-[30px] text-primary leading-snug">
                  {locale === "ar"
                    ? "قراءة متوازنة لاحتياج البشرة والشعر قبل أي توصية"
                    : "Balanced reading of skin and hair needs prior to care"}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {locale === "ar"
                    ? "تنطلق الاستشارة الجلدية من فهم طبيعة البشرة والعوامل اليومية والبيئية المحيطة بها في الرياض، لمناقشة الخيارات المناسبة بوضوح وواقعية دون قوالب جاهزة."
                    : "Consultations center on understanding individual skin characteristics alongside daily and environmental factors before discussing suitable care options."}
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs sm:text-[13px] text-primary">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <span>
                      {locale === "ar"
                        ? "مراعاة توازن حاجز البشرة وراحتها اليومية"
                        : "Supporting daily skin barrier balance and comfort"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <span>
                      {locale === "ar"
                        ? "تقييم التصبغات ومظهر المسام والمناطق الدقيقة"
                        : "Addressing uneven tone, pore texture, and delicate zones"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <span>
                      {locale === "ar"
                        ? "العناية بتغيرات مرونة الجلد وحيوية الشعر مع العمر"
                        : "Attending to age-related skin elasticity and hair vitality"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="overflow-hidden bg-surface-low border border-surface-high">
                  <Image
                    src="/images/editorial/cream-jar-shadow.jpg"
                    alt={
                      locale === "ar"
                        ? "تكوين تحريري هادئ يعبر عن العناية بالبشرة"
                        : "Calm editorial skincare still life"
                    }
                    width={896}
                    height={1200}
                    sizes="(max-width: 1024px) 88vw, 26vw"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
                <div className="overflow-hidden bg-surface-low border border-surface-high">
                  <Image
                    src={doctorProfile.editorialStillLife.linen.src}
                    alt={doctorProfile.editorialStillLife.linen.alt[locale]}
                    width={doctorProfile.editorialStillLife.linen.width}
                    height={doctorProfile.editorialStillLife.linen.height}
                    sizes="(max-width: 1024px) 88vw, 26vw"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. TOPICS FROM THE ACCOUNT (Stitch 3 Editorial Cards Grid) */}
      <section className="w-full bg-surface py-16 md:py-22">
        <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <span className="editorial-kicker">
                  {dict.home.topicsKicker}
                </span>
                <span
                  className="w-10 h-[1px] bg-secondary-dim"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-editorial text-3xl sm:text-[40px] text-primary leading-[1.2]">
                {dict.home.topicsHeading}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                {dict.home.topicsDisclaimer}
              </p>
            </div>

            <a
              href={doctorProfile.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-secondary underline underline-offset-4"
            >
              <span>{dict.home.topicsFollowLink}</span>
              <span dir="ltr" className="text-secondary">
                {doctorProfile.contact.instagramHandle}
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accountTopics.map((topic) => (
              <article
                key={topic.id}
                className="bg-surface-low border border-surface-high/80 flex flex-col shadow-xs group"
              >
                <div className="w-full aspect-[16/10] overflow-hidden bg-surface-container relative">
                  <Image
                    src={
                      topicImageMap[topic.id] ||
                      "/images/editorial/topic-pores-droplets.jpg"
                    }
                    alt={topic.title[locale]}
                    width={900}
                    height={672}
                    sizes="(max-width: 768px) 92vw, 31vw"
                    className="w-full h-full object-cover group-hover:scale-103 editorial-fade"
                  />
                  <div className="absolute top-3 start-3 bg-surface-lowest/95 px-2.5 py-1 text-[10px] font-semibold text-primary shadow-xs">
                    {topic.tag[locale]}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <h3 className="font-editorial text-[22px] text-primary mb-2 leading-snug group-hover:text-secondary editorial-fade">
                      {topic.title[locale]}
                    </h3>
                    <p className="text-[13.5px] text-on-surface-variant leading-relaxed">
                      {topic.contextNote[locale]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface-high flex items-center justify-between text-xs text-secondary">
                    <span>
                      {locale === "ar"
                        ? "موضوع مطروح في الحساب"
                        : "Account Theme"}
                    </span>
                    <Link
                      href={`/${locale}/consultation?topic=${topic.consultationTopicKey}`}
                      className="text-primary hover:text-secondary editorial-fade inline-flex items-center gap-1 font-medium"
                    >
                      <span>{dict.home.areasInquireLink}</span>
                      <StitchIcon name={dirArrow} size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* F. APPROVED ARTICLES & VERIFIED REVIEWS STATUS STRIP */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-low border border-surface-high p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <span className="editorial-kicker">
                  {dict.home.articlesKicker}
                </span>
                <h3 className="font-editorial text-2xl text-primary">
                  {dict.home.articlesHeading}
                </h3>
                {publicArticles.length === 0 ? (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {dict.home.articlesEmptyNotice}
                  </p>
                ) : (
                  <ul className="space-y-2 pt-1">
                    {publicArticles.slice(0, 2).map((art) => (
                      <li key={art.slug} className="text-sm">
                        <span className="text-xs text-secondary me-2">
                          {articleCategories[art.categoryKey][locale]}:
                        </span>
                        <Link
                          href={`/${locale}/articles/${art.slug}`}
                          className="font-medium text-primary underline underline-offset-4"
                        >
                          {art.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <Link
                  href={`/${locale}/articles`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary underline underline-offset-4"
                >
                  <span>{dict.home.articlesArchiveLink}</span>
                  <StitchIcon name={dirArrow} size={14} />
                </Link>
              </div>
            </div>

            <div className="bg-surface-low border border-surface-high p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <span className="editorial-kicker">
                  {dict.home.reviewsKicker}
                </span>
                <h3 className="font-editorial text-2xl text-primary">
                  {dict.home.reviewsHeading}
                </h3>
                {publicReviews.length === 0 ? (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {dict.home.reviewsEmptyNotice}
                  </p>
                ) : (
                  <p className="text-sm text-primary">
                    {publicReviews[0].excerpt}
                  </p>
                )}
              </div>
              <div>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary underline underline-offset-4"
                >
                  <span>{dict.home.reviewsPageLink}</span>
                  <StitchIcon name={dirArrow} size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G. CALM EDITORIAL CLOSING BANNER / DIRECT COORDINATION (Stitch Closing Card) */}
      <section className="w-full bg-surface-highest py-16 md:py-22 px-5 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto bg-surface-lowest p-7 sm:p-11 shadow-md border border-surface-high">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-2.5 max-w-xl">
              <span className="editorial-kicker">
                {dict.home.closingKicker}
              </span>
              <h2 className="font-editorial text-2xl sm:text-[32px] text-primary leading-snug">
                {dict.home.closingHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
                {dict.home.closingBody}
              </p>
              <div className="flex items-center gap-2 text-outline text-xs pt-1">
                <StitchIcon name="lock" size={15} className="text-secondary" />
                <span>
                  {locale === "ar"
                    ? "لا تُخزّن مدخلات النموذج في قواعد بيانات أو تخزين محلي للمتصفح."
                    : "Consultation form inputs are never stored in databases or browser localStorage."}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary text-xs font-medium px-6 h-12 rounded shadow-xs hover:bg-primary-hover"
              >
                <StitchIcon name="chat" size={16} />
                <span>{dict.home.closingWhatsappCta}:</span>
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>

              <Link
                href={`/${locale}/consultation`}
                className="editorial-fade inline-flex items-center justify-center bg-surface-container text-primary text-xs font-medium px-6 h-12 rounded hover:bg-surface-high"
              >
                <span>{dict.home.closingPrimaryCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
