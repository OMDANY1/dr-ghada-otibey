import type { Locale } from "@/i18n/config";

export interface AreaOfCare {
  id: string;
  number: string;
  consultationTopicKey: string;
  kicker: Record<Locale, string>;
  title: Record<Locale, string>;
  shortSummary: Record<Locale, string>;
  description: Record<Locale, string>;
  consultationExamples: Record<Locale, string[]>;
}

export const areasOfCare: AreaOfCare[] = [
  {
    id: "skin-health",
    number: "01",
    consultationTopicKey: "skin-daily",
    kicker: {
      ar: "العناية الأساسية والتشخيصية",
      en: "Foundational Dermatology",
    },
    title: {
      ar: "صحة الجلد والبشرة",
      en: "Skin & Dermatological Health",
    },
    shortSummary: {
      ar: "متابعة صحة الجلد وتقييم المشكلات الشائعة وتنظيم روتين العناية اليومية بما يناسب طبيعة البشرة.",
      en: "Evaluating skin health, addressing common dermatological concerns, and guiding balanced daily skin care.",
    },
    description: {
      ar: "يركّز هذا المجال على فهم حالة البشرة من منظور طبي هادئ، ومناقشة الأعراض أو التغيرات التي تلاحظينها في ملمس الجلد أو لونه أو توازنه اليومي، لوضع تصور واضح للعناية المناسبة أثناء الاستشارة.",
      en: "This area centers on understanding your skin's condition from an attentive clinical perspective—discussing shifts in comfort, tone, texture, or barrier balance so appropriate guidance can be discussed in person.",
    },
    consultationExamples: {
      ar: [
        "جفاف البشرة المستمر أو تحسسها المتكرر تجاه منتجات العناية",
        "تفاوت لون البشرة والتصبغات السطحية ومظهر المسام",
        "مراجعة روتين العناية اليومي وبناء خطوات ملائمة لنوع البشرة",
        "الأعراض الجلدية العامة التي تستدعي تقييم استشارية أمراض جلدية",
      ],
      en: [
        "Persistent dryness, barrier sensitivity, or recurring irritation from skin products",
        "Uneven skin tone, surface pigmentation, and visible pore texture concerns",
        "Reviewing current daily skincare habits and simplifying care for your skin type",
        "General dermatological symptoms requiring a consultant dermatologist's evaluation",
      ],
    },
  },
  {
    id: "hair-scalp",
    number: "02",
    consultationTopicKey: "hair-scalp",
    kicker: {
      ar: "الشعر وفروة الرأس",
      en: "Scalp & Hair Vitality",
    },
    title: {
      ar: "العناية بالشعر وفروة الرأس",
      en: "Hair & Scalp Care",
    },
    shortSummary: {
      ar: "تقييم تغيرات كثافة الشعر وصحة فروة الرأس والعوامل المؤثرة في حيوية الشعر مع التقدم في العمر.",
      en: "Assessing changes in hair density, scalp comfort, and factors influencing hair vitality over time.",
    },
    description: {
      ar: "ترتبط صحة الشعر ارتباطًا وثيقًا بصحة فروة الرأس والعوامل الداخلية والبيئية. تتيح الاستشارة مناقشة طبيعة التساقط أو تغير ملمس الشعر وكثافته لتحديد الفحوصات أو خطوات العناية الملائمة.",
      en: "Healthy hair begins with scalp health alongside internal and lifestyle factors. A consultation offers space to review shedding patterns, density shifts, or scalp discomfort to determine appropriate next steps.",
    },
    consultationExamples: {
      ar: [
        "ملاحظة تراجع تدريجي في كثافة الشعر أو تغير سماكة الشعرة",
        "تساقط الشعر الموسمي أو المستمر الذي يحتاج إلى تقييم طبي",
        "جفاف فروة الرأس أو القشرة أو الشعور بعدم الارتياح",
        "العناية الوقائية بشيخوخة الشعر والحفاظ على حيويته",
      ],
      en: [
        "Gradual thinning, reduced hair volume, or changes in strand thickness",
        "Seasonal or ongoing hair shedding warranting medical evaluation",
        "Scalp dryness, flaking, or recurring scalp sensitivity",
        "Age-conscious hair care focused on maintaining long-term scalp and hair quality",
      ],
    },
  },
  {
    id: "skin-aging",
    number: "03",
    consultationTopicKey: "aging-changes",
    kicker: {
      ar: "تغيرات المرونة والعمر",
      en: "Well-Aging Dermatology",
    },
    title: {
      ar: "تغيرات البشرة المرتبطة بالتقدم في العمر",
      en: "Age-Related Skin Changes",
    },
    shortSummary: {
      ar: "فهم التغيرات الطبيعية في مرونة الجلد والخطوط الدقيقة ومناطق محيط العين والرقبة بأسلوب متوازن.",
      en: "Understanding natural shifts in skin elasticity, fine lines, and delicate zones such as the eye contour and neck.",
    },
    description: {
      ar: "يمثّل التخصص الدقيق في مقاومة شيخوخة البشرة محورًا أساسيًا في اهتمام الدكتورة المهني، مع التركيز على قراءة احتياج البشرة الحقيقي ومراعاة التوازن الطبيعي للملامح دون مبالغة.",
      en: "Skin aging is a core area of Dr. Ghada's special interest—approached through careful reading of how skin quality, firmness, and delicate contours evolve over time while respecting natural facial harmony.",
    },
    consultationExamples: {
      ar: [
        "فقدان المرونة التدريجي في بشرة الوجه أو منطقة الرقبة",
        "الخطوط التعبيرية والدقيقة وتغيرات الجلد الرقيق حول العين",
        "بهتان البشرة وتراجع نضارتها مع الإجهاد أو التقدم في السن",
        "التخطيط لعناية وقائية مبكرة ومتوازنة تحترم طبيعة الملامح",
      ],
      en: [
        "Gradual loss of firmness or elasticity across the face or neck",
        "Fine lines and changes around the delicate eye contour",
        "Dullness, fatigued skin quality, and texture shifts over time",
        "Thoughtful, preventative well-aging consultations that respect natural features",
      ],
    },
  },
  {
    id: "cosmetic-rejuvenation",
    number: "04",
    consultationTopicKey: "cosmetic-rejuvenation",
    kicker: {
      ar: "تجميل الجلد وتجديده",
      en: "Cosmetic Dermatology & Rejuvenation",
    },
    title: {
      ar: "تجميل الجلد وتجديده",
      en: "Cosmetic Dermatology & Skin Rejuvenation",
    },
    shortSummary: {
      ar: "استشارات متخصصة لتحسين جودة الجلد وتجديد مظهره استنادًا إلى تقييم فردي دقيق داخل العيادة.",
      en: "Individualized consultations focused on skin quality, refinement, and rejuvenation through in-clinic evaluation.",
    },
    description: {
      ar: "ينطلق تجميل الجلد وتجديده من دراسة حالة الجلد وجودة أنسجته وتوقعات المراجعة بوضوح وواقعية، حيث تُناقش الخيارات الملائمة وتفاصيلها الطبية مباشرة خلال الموعد بعد الفحص.",
      en: "Cosmetic dermatology and skin rejuvenation begin with an honest evaluation of tissue quality and individual goals, where suitable options and clinical considerations are discussed directly during your appointment.",
    },
    consultationExamples: {
      ar: [
        "الرغبة في تحسين جودة الجلد وملمسه العام بصورة طبيعية",
        "استشارة تجميلية أولية لمعرفة ما يناسب البشرة وما لا يناسبها",
        "مناقشة خيارات تجديد البشرة واستعادة إشراقتها بهدوء وتدرّج",
        "مراجعة تجارب أو إجراءات سابقة قبل اتخاذ قرار جديد",
      ],
      en: [
        "Seeking natural-looking refinement in overall skin quality and surface smoothness",
        "An initial cosmetic dermatology consultation to understand what truly suits your skin",
        "Exploring measured approaches to skin rejuvenation and radiance",
        "Reviewing prior cosmetic history before deciding on future care",
      ],
    },
  },
];
