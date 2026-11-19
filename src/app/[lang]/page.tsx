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
import { BrandLogo } from "@/components/BrandLogo";
import { AreasIndexList } from "@/components/AreasIndexList";
import {
  BotanicalCopperOrnament,
  CopperLeafDot,
  DelicateEditorialEmblem,
  DrawCopperFrame,
  DrawLine,
  LineReveal,
  Magnetic,
  MaskReveal,
  ParallaxBox,
  Reveal,
  RotatingCircularBadge,
} from "@/lib/motion";

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

  const heroFacts =
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

  // Style the first word of the lead bio paragraph in editorial serif while keeping copy verbatim
  const leadBioParagraph = doctorProfile.extendedBio[locale][0];
  const firstSpaceIdx = leadBioParagraph.indexOf(" ");
  const firstWord =
    firstSpaceIdx > 0
      ? leadBioParagraph.slice(0, firstSpaceIdx)
      : leadBioParagraph;
  const restOfLeadBio =
    firstSpaceIdx > 0 ? leadBioParagraph.slice(firstSpaceIdx) : "";

  const sealLabel =
    locale === "ar"
      ? "استشارية أمراض جلدية · الرياض · استشارية أمراض جلدية · الرياض · "
      : "CONSULTANT DERMATOLOGIST · RIYADH · SKIN & HAIR CARE · ";

  const evaluationPoints =
    locale === "ar"
      ? [
          "مراعاة توازن حاجز البشرة وراحتها اليومية",
          "تقييم التصبغات ومظهر المسام والمناطق الدقيقة",
          "العناية بتغيرات مرونة الجلد وحيوية الشعر مع العمر",
        ]
      : [
          "Supporting daily skin barrier balance and comfort",
          "Addressing uneven tone, pore texture, and delicate zones",
          "Attending to age-related skin elasticity and hair vitality",
        ];

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* ====================================================================
          2. SPLIT EDITORIAL HERO (Arch Doorway Mask + Rotating Seal + Copper Hairlines)
          - Mobile (<sm): Portrait first right under header, followed immediately by Headline + 2 CTAs in the first viewport; longer bio + 3 facts below.
          - Tablet / Wide Mobile (sm..lg): Portrait side-by-side with Headline + 2 CTAs; longer bio + 3 facts below.
          - Laptop & Desktop (lg+, 1366x768 & 1440x900): Full Portrait + Headline + Bio + 2 CTAs completely visible above the fold at 100% zoom without scrolling.
          ==================================================================== */}
      <section className="w-full pt-2 pb-12 sm:pt-4 sm:pb-16 lg:pt-4 lg:pb-20 xl:pt-6 xl:pb-24 overflow-x-clip">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
            {/* Offset Arched Portrait — First on Mobile/Tablet (order-1), Second on Desktop (lg:order-2) */}
            <div className="order-1 lg:order-2 sm:col-span-5 lg:col-span-5 relative pt-1 sm:pt-0">
              <div className="relative mx-auto w-[234px] sm:w-full sm:max-w-[290px] lg:max-w-[330px] xl:max-w-[370px]">
                {/* Thin Offset Copper Arch Hairline Frame Behind Portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -start-2.5 -top-2.5 sm:-start-3 sm:-top-3 w-full h-full rounded-t-full rounded-b-[20px] border border-copper-500/45"
                />

                {/* Rotating Circular Seal Near Portrait Edge */}
                <div className="absolute -top-4 -end-5 sm:-top-6 sm:-end-6 z-20 bg-surface/85 backdrop-blur-xs rounded-full p-0.5 sm:p-1 scale-[0.72] sm:scale-[0.86] lg:scale-95 origin-center">
                  <RotatingCircularBadge text={sealLabel} />
                </div>

                {/* Arch Doorway Portrait Reveal + Subtle Parallax */}
                <MaskReveal variant="arch" immediate delay={0.06}>
                  <div className="overflow-hidden rounded-t-full rounded-b-[20px] bg-surface-high aspect-[4/4.72] sm:aspect-[4/4.85]">
                    <ParallaxBox offsetPercent={4} className="w-full h-full">
                      <Image
                        src={doctorProfile.portraits.hero.src}
                        alt={doctorProfile.portraits.hero.alt[locale]}
                        width={doctorProfile.portraits.hero.width}
                        height={doctorProfile.portraits.hero.height}
                        priority
                        sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 370px"
                        className="w-full h-full object-cover object-[50%_10%] scale-[1.05]"
                      />
                    </ParallaxBox>
                  </div>
                </MaskReveal>

                {/* Quiet Magazine Caption Below Arch (Desktop & Tablet) */}
                <div className="hidden sm:flex mt-2.5 items-baseline justify-between gap-3 px-1">
                  <span className="text-[11.5px] text-on-surface-variant">
                    {doctorProfile.portraits.hero.caption[locale]}
                  </span>
                  <span
                    dir="ltr"
                    className="font-latin-italic text-[11.5px] text-copper-700 shrink-0"
                  >
                    Riyadh
                  </span>
                </div>
              </div>
            </div>

            {/* Core Editorial Intro + Primary & Secondary CTAs (7 cols) */}
            <div className="order-2 lg:order-1 sm:col-span-7 lg:col-span-7 flex flex-col gap-3 sm:gap-4 lg:gap-4 xl:gap-5">
              <Reveal immediate delay={0.04} y={12} className="space-y-1">
                <span className="editorial-kicker">
                  {locale === "ar"
                    ? "ملف تعريفي مهني · الرياض"
                    : "Dermatology Profile · Riyadh"}
                </span>
                <p className="text-xs sm:text-[13.5px] text-on-surface-variant font-normal">
                  {doctorProfile.name[locale]} — {doctorProfile.title[locale]}
                  {locale === "ar" ? "، " : ", "}
                  {doctorProfile.cityShort[locale]}
                </p>
              </Reveal>

              {/* Proportionate Display Headline */}
              <h1 className="font-editorial text-[clamp(2.05rem,6.2vw,2.5rem)] sm:text-[clamp(2.2rem,3.9vw,3rem)] lg:text-[clamp(2.55rem,3.85vw,3.9rem)] text-primary leading-[1.15] max-w-[14ch]">
                <LineReveal immediate delay={0.08}>
                  {locale === "ar" ? "عناية ببشرتك،" : "Thoughtful care"}
                </LineReveal>
                <LineReveal immediate delay={0.18}>
                  <span className="text-copper-gradient">
                    {locale === "ar"
                      ? "تبدأ بفهمها."
                      : "begins with your skin."}
                  </span>
                </LineReveal>
              </h1>

              {/* Intro Description — Visible above the fold on Laptop/Desktop (lg+); placed right after core group on Mobile/Tablet */}
              <Reveal
                immediate
                delay={0.26}
                y={14}
                className="hidden lg:block"
              >
                <p className="text-[15.5px] xl:text-[17px] text-on-surface-variant max-w-[58ch] font-light leading-[1.82]">
                  {doctorProfile.conciseBio[locale]}
                </p>
              </Reveal>

              {/* Primary Magnetic Pill CTA + Animated Copper-Underline Link */}
              <Reveal
                immediate
                delay={0.34}
                y={14}
                className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-7 pt-0.5"
              >
                <Magnetic strength={6}>
                  <Link
                    href={`/${locale}/consultation`}
                    className="btn-pill-primary !min-h-[46px] !px-6 sm:!min-h-[48px] sm:!px-7 text-xs sm:text-sm font-normal"
                  >
                    <span>{dict.hero.primaryCta}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </Link>
                </Magnetic>

                <Link
                  href={`/${locale}/about`}
                  className="copper-link group text-xs sm:text-sm font-normal text-primary hover:text-copper-700 transition-colors"
                >
                  <span>{dict.hero.secondaryCta}</span>
                  <StitchIcon
                    name={dirArrow}
                    size={14}
                    className="text-copper-500 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Mobile/Tablet Extended Intro + Three Hairline-Divided Facts Row Below First-Screen Core Group */}
          <Reveal immediate delay={0.44} y={16} className="mt-8 sm:mt-10 lg:mt-8 xl:mt-10">
            <p className="lg:hidden text-sm sm:text-base text-on-surface-variant max-w-[60ch] font-light leading-[1.85] mb-6">
              {doctorProfile.conciseBio[locale]}
            </p>
            <DrawLine className="mb-5 sm:mb-6" delay={0.4} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 max-w-4xl">
              {heroFacts.map((fact, idx) => (
                <div
                  key={fact.kicker}
                  className={`flex flex-col gap-0.5 ${
                    idx > 0 ? "sm:ps-6" : ""
                  } ${
                    idx < heroFacts.length - 1
                      ? "sm:pe-6 sm:border-e border-copper-500/30"
                      : ""
                  }`}
                >
                  <span className="text-[11px] text-copper-700 font-normal">
                    {fact.kicker}
                  </span>
                  <span className="font-editorial text-[20px] sm:text-[22px] text-primary leading-normal pb-0.5">
                    {fact.title}
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================================
          3. نبذة مهنية — TWO-COLUMN EDITORIAL SPREAD
          ==================================================================== */}
      <section className="w-full bg-surface-low/65 py-20 sm:py-28 lg:py-36 border-y border-copper-500/20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Pull-Quote Heading & Copper Botanical Line-Art Ornament (5 cols) */}
            <Reveal className="lg:col-span-5 space-y-6">
              <span className="editorial-kicker">{dict.home.introKicker}</span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] text-primary leading-[1.24]">
                {locale === "ar" ? (
                  <>
                    حضور طبي متخصص يوازن بين صحة الجلد ودقة{" "}
                    <span className="text-copper-gradient">
                      العناية التجميلية.
                    </span>
                  </>
                ) : (
                  <>
                    Clinical dermatology shaped by clarity, discretion, and{" "}
                    <span className="text-copper-gradient">
                      individualized care.
                    </span>
                  </>
                )}
              </h2>
              <BotanicalCopperOrnament className="pt-1" />
            </Reveal>

            {/* Editorial Body with Styled Serif First Word + Underlined Link (7 cols) */}
            <Reveal delay={0.12} className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-[18px] text-primary leading-[1.95] max-w-[64ch] font-light">
                <span className="font-editorial text-2xl sm:text-[30px] text-copper-700 me-1.5 leading-none">
                  {firstWord}
                </span>
                {restOfLeadBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-copper-500/20 text-sm text-on-surface-variant leading-[1.9]">
                <p>{doctorProfile.extendedBio[locale][1]}</p>
                <p>{doctorProfile.extendedBio[locale][2]}</p>
              </div>

              <div className="pt-3">
                <Link
                  href={`/${locale}/about`}
                  className="copper-link group text-sm text-primary hover:text-copper-700 transition-colors"
                >
                  <span>{dict.home.introLink}</span>
                  <StitchIcon
                    name={dirArrow}
                    size={15}
                    className="text-copper-500 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. مجالات العناية — INTERACTIVE EDITORIAL INDEX LIST
          ==================================================================== */}
      <section className="w-full bg-surface py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <Reveal className="space-y-3 max-w-2xl">
              <span className="editorial-kicker">{dict.home.areasKicker}</span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-primary leading-[1.18]">
                {locale === "ar" ? (
                  <>
                    أربعة مسارات رئيسية للعناية{" "}
                    <span className="text-copper-gradient">بالبشرة والشعر</span>
                  </>
                ) : (
                  <>
                    Four foundational pillars of{" "}
                    <span className="text-copper-gradient">
                      skin &amp; hair care
                    </span>
                  </>
                )}
              </h2>
            </Reveal>

            <Reveal
              delay={0.1}
              className="flex flex-col items-start md:items-end gap-3 max-w-sm"
            >
              <p className="text-sm text-on-surface-variant leading-[1.85]">
                {dict.home.areasSubheading}
              </p>
              <Link
                href={`/${locale}/areas-of-care`}
                className="copper-link group text-xs sm:text-sm text-primary hover:text-copper-700"
              >
                <span>{dict.home.areasViewAll}</span>
                <StitchIcon
                  name={dirArrow}
                  size={14}
                  className="text-copper-500 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <AreasIndexList
            areas={areasOfCare}
            locale={locale}
            inquireLabel={dict.home.areasInquireLink}
          />
        </div>
      </section>

      {/* ====================================================================
          5. منهج التقييم — OVERLAPPING ARCHED/ROUNDED DUAL-SPEED PARALLAX
          ==================================================================== */}
      <section className="w-full bg-surface-low py-16 sm:py-22 lg:py-24 border-y border-copper-500/20 overflow-x-clip">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Dual Overlapping Masked Images with Different Parallax Speeds (6 cols) */}
            <div className="lg:col-span-6 relative pb-10 sm:pb-12">
              <div className="relative max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0">
                <MaskReveal variant="arch">
                  <div className="overflow-hidden rounded-t-full rounded-b-2xl border border-copper-500/30 bg-surface-lowest aspect-[4/4.4] w-[80%]">
                    <ParallaxBox offsetPercent={5} className="w-full h-full">
                      <Image
                        src="/images/editorial/cream-jar-shadow.jpg"
                        alt={
                          locale === "ar"
                            ? "تكوين تحريري هادئ يعبر عن العناية بالبشرة"
                            : "Calm editorial skincare still life"
                        }
                        width={896}
                        height={1200}
                        sizes="(max-width: 1024px) 75vw, 340px"
                        className="w-full h-full object-cover scale-[1.06]"
                      />
                    </ParallaxBox>
                  </div>
                </MaskReveal>

                {/* Overlapping Offset Secondary Soft-Rounded Frame */}
                <div className="w-[54%] absolute -bottom-6 end-0 z-10">
                  <ParallaxBox offsetPercent={9}>
                    <div className="overflow-hidden rounded-2xl border border-copper-500/50 bg-surface-lowest p-1.5 shadow-[0_18px_40px_rgba(35,24,17,0.08)]">
                      <div className="overflow-hidden rounded-[12px] aspect-[4/3]">
                        <Image
                          src={doctorProfile.editorialStillLife.linen.src}
                          alt={
                            doctorProfile.editorialStillLife.linen.alt[locale]
                          }
                          width={doctorProfile.editorialStillLife.linen.width}
                          height={doctorProfile.editorialStillLife.linen.height}
                          sizes="(max-width: 1024px) 52vw, 240px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </ParallaxBox>
                </div>
              </div>
            </div>

            {/* Minimal Editorial Evaluation List with Draw-On Copper Leaf Dots (6 cols) */}
            <Reveal className="lg:col-span-6 space-y-5">
              <span className="editorial-kicker">
                {locale === "ar"
                  ? "نهج التقييم المباشر"
                  : "In-Clinic Evaluation"}
              </span>

              <h2 className="font-editorial text-2xl sm:text-4xl lg:text-[42px] text-primary leading-[1.2]">
                {locale === "ar" ? (
                  <>
                    قراءة متوازنة لاحتياج البشرة قبل{" "}
                    <span className="text-copper-gradient">أي توصية</span>
                  </>
                ) : (
                  <>
                    Balanced reading of your skin prior to{" "}
                    <span className="text-copper-gradient">
                      any recommendation
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-on-surface-variant leading-[1.85] max-w-[60ch]">
                {locale === "ar"
                  ? "تنطلق الاستشارة الجلدية من فهم طبيعة البشرة والعوامل اليومية والبيئية المحيطة بها في الرياض، لمناقشة الخيارات المناسبة بوضوح وواقعية دون قوالب جاهزة."
                  : "Consultations center on understanding individual skin characteristics alongside daily and environmental factors before discussing suitable care options."}
              </p>

              <ul className="space-y-3 pt-3 border-t border-copper-500/20">
                {evaluationPoints.map((point, idx) => (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 text-sm sm:text-[15.5px] text-primary leading-[1.8]"
                  >
                    <CopperLeafDot delay={idx * 0.12} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. موضوعات الحساب — COMPACT MAGAZINE GRID (Images + Titles + Full Explanations Visible Together)
          ==================================================================== */}
      <section
        id="account-topics"
        className="w-full bg-surface py-14 sm:py-20 lg:py-20 xl:py-24 scroll-mt-16"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 lg:mb-7">
            <Reveal className="space-y-1.5 max-w-2xl">
              <span className="editorial-kicker">{dict.home.topicsKicker}</span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-primary leading-[1.18]">
                {dict.home.topicsHeading}
              </h2>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-[1.7] max-w-[66ch]">
                {dict.home.topicsDisclaimer}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={doctorProfile.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="copper-link group text-xs sm:text-[13px] text-primary hover:text-copper-700 shrink-0"
              >
                <StitchIcon
                  name="camera"
                  size={15}
                  className="text-copper-500"
                />
                <span>{dict.home.topicsFollowLink}</span>
                <span dir="ltr" className="font-latin-italic text-copper-700">
                  {doctorProfile.contact.instagramHandle}
                </span>
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-start">
            {accountTopics.map((topic, idx) => {
              const staggerOffset = idx === 1 ? "md:mt-3" : "";

              return (
                <Reveal
                  key={topic.id}
                  delay={idx * 0.08}
                  className={`group ${staggerOffset}`}
                >
                  <article className="flex flex-col">
                    {/* Compact Editorial Frame + Hover Copper Hairline */}
                    <Link
                      href={`/${locale}/consultation?topic=${topic.consultationTopicKey}`}
                      className="relative block p-1.5 rounded-[22px] border border-transparent group-hover:border-copper-500/55 transition-colors duration-500"
                    >
                      <div
                        className={`overflow-hidden bg-surface-low aspect-[16/10] max-h-[210px] xl:max-h-[235px] ${
                          idx === 1
                            ? "rounded-t-[44px] rounded-b-[16px]"
                            : "rounded-[16px]"
                        }`}
                      >
                        <Image
                          src={
                            topicImageMap[topic.id] ||
                            "/images/editorial/topic-pores-droplets.jpg"
                          }
                          alt={topic.title[locale]}
                          width={900}
                          height={672}
                          sizes="(max-width: 768px) 92vw, 31vw"
                          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </Link>

                    {/* Tightly Coupled Title & Full Explanation */}
                    <div className="pt-3 px-1.5 space-y-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                      <span className="text-[11.5px] text-copper-700 block">
                        {topic.tag[locale]}
                      </span>
                      <h3 className="font-editorial text-xl lg:text-[22px] xl:text-[24px] text-primary leading-snug">
                        <Link
                          href={`/${locale}/consultation?topic=${topic.consultationTopicKey}`}
                          className="hover:text-copper-700 transition-colors"
                        >
                          {topic.title[locale]}
                        </Link>
                      </h3>
                      <p className="text-[13.5px] sm:text-sm text-on-surface-variant leading-[1.72]">
                        {topic.contextNote[locale]}
                      </p>
                      <div className="pt-1">
                        <Link
                          href={`/${locale}/consultation?topic=${topic.consultationTopicKey}`}
                          className="copper-link text-xs text-primary hover:text-copper-700"
                        >
                          <span>{dict.home.topicsInquireCta}</span>
                          <StitchIcon
                            name={dirArrow}
                            size={13}
                            className="text-copper-500"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. المحتوى التثقيفي + المراجعات — INTENTIONAL EDITORIAL EMPTY STATES
          ==================================================================== */}
      <section className="w-full bg-surface-low/55 py-20 sm:py-28 border-t border-copper-500/20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            {/* Educational Articles Space */}
            <Reveal className="lg:col-span-6 lg:pe-14 lg:border-e border-copper-500/25 text-center flex flex-col items-center justify-between gap-6 py-4">
              <div className="space-y-4 max-w-md mx-auto">
                <DelicateEditorialEmblem variant="journal" />
                <span className="editorial-kicker justify-center">
                  {dict.home.articlesKicker}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
                  {dict.home.articlesHeading}
                </h2>
                {publicArticles.length === 0 ? (
                  <p className="font-editorial text-lg sm:text-xl text-on-surface-variant leading-relaxed">
                    {dict.home.articlesEmptyNotice}
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {publicArticles.slice(0, 2).map((art) => (
                      <li key={art.slug}>
                        <span className="text-copper-700 me-1.5">
                          {articleCategories[art.categoryKey][locale]}:
                        </span>
                        <Link
                          href={`/${locale}/articles/${art.slug}`}
                          className="underline underline-offset-4"
                        >
                          {art.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                href={`/${locale}/articles`}
                className="copper-link text-xs sm:text-sm text-primary hover:text-copper-700"
              >
                <span>{dict.home.articlesArchiveLink}</span>
                <StitchIcon
                  name={dirArrow}
                  size={14}
                  className="text-copper-500"
                />
              </Link>
            </Reveal>

            {/* Verified Reviews Space */}
            <Reveal
              delay={0.12}
              className="lg:col-span-6 lg:ps-14 text-center flex flex-col items-center justify-between gap-6 py-4 border-t lg:border-t-0 border-copper-500/20 pt-12 lg:pt-4"
            >
              <div className="space-y-4 max-w-md mx-auto">
                <DelicateEditorialEmblem variant="seal" />
                <span className="editorial-kicker justify-center">
                  {dict.home.reviewsKicker}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
                  {dict.home.reviewsHeading}
                </h2>
                {publicReviews.length === 0 ? (
                  <p className="font-editorial text-lg sm:text-xl text-on-surface-variant leading-relaxed">
                    {dict.home.reviewsEmptyNotice}
                  </p>
                ) : (
                  <p className="font-editorial text-lg text-primary">
                    {publicReviews[0].excerpt}
                  </p>
                )}
              </div>

              <Link
                href={`/${locale}/reviews`}
                className="copper-link text-xs sm:text-sm text-primary hover:text-copper-700"
              >
                <span>{dict.home.reviewsPageLink}</span>
                <StitchIcon
                  name={dirArrow}
                  size={14}
                  className="text-copper-500"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. APPOINTMENT CTA — DEEP ESPRESSO SECTION WITH DRAW-ON COPPER FRAME
          ==================================================================== */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-14 bg-surface">
        <div className="relative mx-auto max-w-[1360px] rounded-[30px] bg-primary text-on-primary px-6 py-16 sm:px-14 sm:py-24 lg:py-28 overflow-hidden">
          {/* Animated 1px Copper Hairline Frame Drawing Around Section on Enter */}
          <DrawCopperFrame />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-7">
            <Reveal className="space-y-4">
              <BrandLogo
                variant="mark"
                className="w-14 h-auto mx-auto text-[#c9b49b]"
              />
              <span className="inline-flex items-center gap-2.5 text-xs text-copper-300 tracking-wide">
                <span className="w-6 h-px bg-copper-300/60" />
                <span>{dict.home.closingKicker}</span>
                <span className="w-6 h-px bg-copper-300/60" />
              </span>

              <h2 className="font-editorial text-3xl sm:text-5xl lg:text-[52px] text-on-primary leading-[1.2]">
                {locale === "ar" ? (
                  <>
                    خطوة هادئة لترتيب{" "}
                    <span className="text-copper-300">استشارتكِ القادمة</span>
                  </>
                ) : (
                  <>
                    A quiet, structured way to{" "}
                    <span className="text-copper-300">
                      arrange your visit
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-on-primary/80 leading-[1.9] max-w-[54ch] mx-auto font-light">
                {dict.home.closingBody}
              </p>
            </Reveal>

            <Reveal
              delay={0.14}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Magnetic strength={6}>
                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-copper-glow w-full sm:w-auto text-xs sm:text-sm font-medium"
                >
                  <StitchIcon
                    name="chat"
                    size={17}
                    className="text-copper-700"
                  />
                  <span>{dict.home.closingWhatsappCta}:</span>
                  <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
                </a>
              </Magnetic>

              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full border border-copper-300/45 text-on-primary hover:border-copper-300 hover:bg-on-primary/5 text-xs sm:text-sm transition-colors duration-300 w-full sm:w-auto"
              >
                <span>{dict.home.closingPrimaryCta}</span>
                <StitchIcon name={dirArrow} size={15} />
              </Link>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="inline-flex items-center justify-center gap-2 text-xs text-on-primary/65 pt-2">
                <StitchIcon name="lock" size={14} className="text-copper-300" />
                <span>
                  {locale === "ar"
                    ? "لا تُخزّن مدخلات النموذج في قواعد بيانات أو تخزين محلي للمتصفح."
                    : "Consultation form inputs are never stored in databases or browser localStorage."}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
