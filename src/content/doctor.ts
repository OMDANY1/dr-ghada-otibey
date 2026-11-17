import type { Locale } from "@/i18n/config";

export interface CredentialItem {
  id: string;
  title: Record<Locale, string>;
  institution?: Record<Locale, string>;
  year?: string;
}

export interface AccountTopicItem {
  id: string;
  consultationTopicKey: string;
  tag: Record<Locale, string>;
  title: Record<Locale, string>;
  contextNote: Record<Locale, string>;
}

export interface DoctorProfile {
  name: Record<Locale, string>;
  shortSignature: Record<Locale, string>;
  title: Record<Locale, string>;
  city: Record<Locale, string>;
  cityShort: Record<Locale, string>;
  specializationSummary: Record<Locale, string>;
  conciseBio: Record<Locale, string>;
  extendedBio: Record<Locale, string[]>;
  focusAreas: Record<Locale, string[]>;
  contact: {
    whatsappDisplay: string;
    whatsappNumber: string;
    whatsappDirectUrl: string;
    instagramHandle: string;
    instagramUrl: string;
    linktreeUrl: string;
  };
  portraits: {
    hero: {
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
      caption: Record<Locale, string>;
    };
    editorial: {
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
      caption: Record<Locale, string>;
    };
    standing: {
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
    };
  };
  editorialStillLife: {
    travertine: {
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
    };
    linen: {
      src: string;
      width: number;
      height: number;
      alt: Record<Locale, string>;
    };
  };
  /**
   * Ready-to-populate verified CV structures.
   * Left empty intentionally until official documentation is provided;
   * UI sections automatically remain hidden when empty.
   */
  qualifications: CredentialItem[];
  certifications: CredentialItem[];
  experience: CredentialItem[];
  memberships: CredentialItem[];
}

export const doctorProfile: DoctorProfile = {
  name: {
    ar: "الدكتورة غادة العتيبي",
    en: "Dr. Ghada Alotaibi",
  },
  shortSignature: {
    ar: "د. غادة العتيبي",
    en: "Dr. Ghada Alotaibi",
  },
  title: {
    ar: "استشارية أمراض جلدية",
    en: "Consultant Dermatologist",
  },
  city: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Saudi Arabia",
  },
  cityShort: {
    ar: "الرياض",
    en: "Riyadh",
  },
  specializationSummary: {
    ar: "تخصص دقيق واهتمام مهني بمقاومة شيخوخة البشرة والشعر وتجميل الجلد وتجديده.",
    en: "Special interest and advanced specialization in skin and hair aging, cosmetic dermatology, and skin rejuvenation.",
  },
  conciseBio: {
    ar: "استشارية أمراض جلدية في مدينة الرياض، يركّز حضورها المهني والتثقيفي على صحة الجلد والشعر، وفهم التغيرات المرتبطة بالتقدم في العمر، وتجميل الجلد وتجديده ضمن تقييم طبي متخصص يراعي احتياج كل حالة.",
    en: "A Consultant Dermatologist based in Riyadh with a special interest and advanced specialization in skin and hair aging, cosmetic dermatology, and skin rejuvenation, grounded in attentive clinical assessment.",
  },
  extendedBio: {
    ar: [
      "تمارس الدكتورة غادة العتيبي عملها بوصفها استشارية أمراض جلدية في مدينة الرياض بالمملكة العربية السعودية، مع تخصص دقيق واهتمام مهني بمقاومة شيخوخة البشرة والشعر وتجميل الجلد وتجديده.",
      "يتناول حضورها التعريفي والتثقيفي موضوعات صحة البشرة وفروة الرأس، والتغيرات التدريجية التي تطرأ على مرونة الجلد ومظهره، إلى جانب العناية بالمناطق الدقيقة مثل محيط العين والرقبة ومظهر المسام.",
      "يهدف هذا الموقع إلى تقديم تعريف مهني واضح وموثوق، وتسهيل توجيه طلبات المواعيد والاستفسارات الأولية إلى فريق التنسيق عبر واتساب تمهيدًا للتقييم المباشر في العيادة.",
    ],
    en: [
      "Dr. Ghada Alotaibi practices as a Consultant Dermatologist in Riyadh, Saudi Arabia, with a special interest and advanced specialization in skin and hair aging, cosmetic dermatology, and skin rejuvenation.",
      "Her public educational presence addresses foundational skin and scalp health, gradual age-related changes in skin quality and elasticity, and attentive care for delicate areas such as the eye contour, neck, and pore texture.",
      "This website serves as a calm, verified professional reference and a structured gateway for coordinating appointment requests and initial inquiries with her scheduling team via WhatsApp.",
    ],
  },
  focusAreas: {
    ar: [
      "الأمراض الجلدية وصحة البشرة العامة",
      "مقاومة شيخوخة البشرة والشعر",
      "تجميل الجلد وتجديده",
      "العناية بصحة الشعر وفروة الرأس",
    ],
    en: [
      "Clinical Dermatology & General Skin Health",
      "Skin & Hair Aging Care",
      "Cosmetic Dermatology & Skin Rejuvenation",
      "Hair & Scalp Care",
    ],
  },
  contact: {
    whatsappDisplay: "+966 53 955 9313",
    whatsappNumber: "966539559313",
    whatsappDirectUrl: "https://wa.me/966539559313",
    instagramHandle: "@dr.ghada.alotaibi",
    instagramUrl: "https://www.instagram.com/dr.ghada.alotaibi/",
    linktreeUrl: "https://linktr.ee/DrGhadah",
  },
  portraits: {
    hero: {
      src: "/images/dr-ghada-portrait-hero.jpg",
      width: 1400,
      height: 2100,
      alt: {
        ar: "صورة بورتريه للدكتورة غادة العتيبي، استشارية أمراض جلدية في الرياض",
        en: "Portrait of Dr. Ghada Alotaibi, Consultant Dermatologist in Riyadh",
      },
      caption: {
        ar: "الدكتورة غادة العتيبي — استشارية أمراض جلدية، الرياض",
        en: "Dr. Ghada Alotaibi — Consultant Dermatologist, Riyadh",
      },
    },
    editorial: {
      src: "/images/dr-ghada-portrait-editorial.jpg",
      width: 1400,
      height: 2100,
      alt: {
        ar: "صورة مهنية للدكتورة غادة العتيبي بالمعطف الطبي الأبيض",
        en: "Professional portrait of Dr. Ghada Alotaibi in clinical attire",
      },
      caption: {
        ar: "عناية جلدية وتجميلية تستند إلى التقييم الطبي المباشر",
        en: "Dermatological and cosmetic skin care guided by in-person assessment",
      },
    },
    standing: {
      src: "/images/dr-ghada-portrait-standing.jpg",
      width: 1400,
      height: 2100,
      alt: {
        ar: "الدكتورة غادة العتيبي — استشارية أمراض جلدية",
        en: "Dr. Ghada Alotaibi — Consultant Dermatologist",
      },
    },
  },
  editorialStillLife: {
    travertine: {
      src: "/images/editorial-travertine-serum.jpg",
      width: 896,
      height: 1200,
      alt: {
        ar: "تكوين تحريري هادئ يعكس العناية اليومية بالبشرة على حجر الترافرتين الطبيعي",
        en: "Minimalist editorial still life on natural travertine stone and linen",
      },
    },
    linen: {
      src: "/images/editorial-linen-vessel.jpg",
      width: 1376,
      height: 768,
      alt: {
        ar: "تكوين تحريري من الكتان الطبيعي والضوء الهادئ",
        en: "Calm architectural still life of natural linen and soft daylight",
      },
    },
  },
  qualifications: [],
  certifications: [],
  experience: [],
  memberships: [],
};

export const accountTopics: AccountTopicItem[] = [
  {
    id: "eye-area-care",
    consultationTopicKey: "eye-area",
    tag: {
      ar: "محيط العين",
      en: "Eye Contour",
    },
    title: {
      ar: "العناية بمنطقة حول العين",
      en: "Caring for the Delicate Eye Area",
    },
    contextNote: {
      ar: "موضوع تثقيفي مطروح في حساب الدكتورة يتناول رقة الجلد حول العين وأهمية فهم طبيعة التغيرات قبل اختيار روتين أو استشارة مناسبة.",
      en: "An educational theme highlighted on the account addressing the delicacy of periorbital skin and understanding individual concerns prior to consultation.",
    },
  },
  {
    id: "neck-elasticity",
    consultationTopicKey: "neck-elasticity",
    tag: {
      ar: "مرونة الجلد",
      en: "Skin Elasticity",
    },
    title: {
      ar: "ترهل الرقبة وفقدان المرونة",
      en: "Neck Laxity & Loss of Skin Elasticity",
    },
    contextNote: {
      ar: "من الموضوعات الظاهرة في الحساب حول تغيرات مرونة الجلد في منطقة الرقبة وعلاقتها بالعوامل العمرية والعناية المستمرة.",
      en: "A topic featured on the account exploring gradual changes in neck firmness, elasticity, and long-term skin care awareness.",
    },
  },
  {
    id: "pores-skin-care",
    consultationTopicKey: "skin-daily",
    tag: {
      ar: "ملمس البشرة",
      en: "Skin Texture",
    },
    title: {
      ar: "مظهر المسام والعناية بالبشرة",
      en: "Pore Appearance & Thoughtful Skin Care",
    },
    contextNote: {
      ar: "عنوان تثقيفي مستلهم من محتوى الحساب يسلّط الضوء على العوامل المؤثرة في مظهر المسام وتوازن العناية اليومية بالبشرة.",
      en: "A subject inspired by the account's educational posts focusing on factors behind pore visibility and balanced daily skin care.",
    },
  },
];
