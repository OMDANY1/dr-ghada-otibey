import type { Locale } from "@/i18n/config";

export interface Dictionary {
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    areasTitle: string;
    areasDescription: string;
    articlesTitle: string;
    articlesDescription: string;
    reviewsTitle: string;
    reviewsDescription: string;
    consultationTitle: string;
    consultationDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
  nav: {
    home: string;
    about: string;
    areas: string;
    articles: string;
    reviews: string;
    consultation: string;
    bookCta: string;
    switchLangLabel: string;
    switchLangShort: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    mobileNavTitle: string;
  };
  hero: {
    kicker: string;
    headline: string;
    editorialNote: string;
    nameLine: string;
    roleAndCity: string;
    primaryCta: string;
    secondaryCta: string;
  };
  home: {
    introKicker: string;
    introHeading: string;
    introLink: string;
    areasKicker: string;
    areasHeading: string;
    areasSubheading: string;
    areasViewAll: string;
    areasInquireLink: string;
    topicsKicker: string;
    topicsHeading: string;
    topicsDisclaimer: string;
    topicsFollowLink: string;
    topicsInquireCta: string;
    articlesKicker: string;
    articlesHeading: string;
    articlesEmptyNotice: string;
    articlesArchiveLink: string;
    reviewsKicker: string;
    reviewsHeading: string;
    reviewsEmptyNotice: string;
    reviewsPageLink: string;
    closingKicker: string;
    closingHeading: string;
    closingBody: string;
    closingPrimaryCta: string;
    closingWhatsappCta: string;
  };
  about: {
    kicker: string;
    heading: string;
    lead: string;
    specializationHeading: string;
    focusListHeading: string;
    locationLabel: string;
    roleLabel: string;
    coordinationLabel: string;
    qualificationsHeading: string;
    certificationsHeading: string;
    experienceHeading: string;
    membershipsHeading: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
  };
  areas: {
    kicker: string;
    heading: string;
    lead: string;
    disclaimer: string;
    examplesHeading: string;
    inquireButton: string;
    closingNote: string;
  };
  articles: {
    kicker: string;
    heading: string;
    lead: string;
    searchPlaceholder: string;
    searchLabel: string;
    allCategories: string;
    clearFilters: string;
    noFilterMatches: string;
    emptyStateTitle: string;
    emptyStateMessage: string;
    emptyStateInstagramCta: string;
    editorialStandardNote: string;
    readArticle: string;
    publishedOn: string;
    sourceLabel: string;
    doctorApprovedBadge: string;
    shareHeading: string;
    copyLink: string;
    linkCopied: string;
    shareWhatsapp: string;
    relatedHeading: string;
    backToArchive: string;
  };
  reviews: {
    kicker: string;
    heading: string;
    lead: string;
    emptyTitle: string;
    emptyBody: string;
    policyPoints: string[];
    inquireCta: string;
    sourcePrefix: string;
  };
  consultation: {
    kicker: string;
    heading: string;
    lead: string;
    coordinationNotice: string;
    steps: {
      step1: string;
      step2: string;
      step3: string;
      stepIndicator: string;
    };
    step1: {
      requestTypeLabel: string;
      topicsLabel: string;
      topicsHint: string;
      routingDisclaimer: string;
      nextButton: string;
      errorRequestType: string;
      errorTopics: string;
    };
    step2: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phoneOptionalTag: string;
      phoneHint: string;
      phonePlaceholder: string;
      languageLabel: string;
      languageAr: string;
      languageEn: string;
      timeLabel: string;
      timeOptionalTag: string;
      timeHint: string;
      timeNone: string;
      noteLabel: string;
      noteOptionalTag: string;
      notePlaceholder: string;
      sensitiveWarning: string;
      backButton: string;
      nextButton: string;
      errorName: string;
      errorNoteLength: string;
    };
    step3: {
      summaryHeading: string;
      editStep1: string;
      editStep2: string;
      previewHeading: string;
      previewHint: string;
      consentLabel: string;
      privacyLinkText: string;
      errorConsent: string;
      submitWhatsapp: string;
      copyMessage: string;
      copiedMessage: string;
      directWhatsappFallback: string;
      backButton: string;
      openedReminder: string;
      notProvided: string;
    };
    whatsappTemplate: {
      intro: string;
      name: string;
      requestType: string;
      topics: string;
      language: string;
      preferredTime: string;
      notes: string;
    };
    faq: {
      kicker: string;
      heading: string;
      lead: string;
    };
  };
  privacy: {
    kicker: string;
    heading: string;
    lead: string;
    sections: {
      title: string;
      paragraphs: string[];
    }[];
  };
  footer: {
    tagline: string;
    navigationHeading: string;
    contactHeading: string;
    coordinationLabel: string;
    instagramLabel: string;
    privacyLink: string;
    medicalNotice: string;
    rights: string;
  };
  notFound: {
    kicker: string;
    heading: string;
    body: string;
    backHome: string;
  };
}

const ar: Dictionary = {
  meta: {
    siteName: "الدكتورة غادة العتيبي",
    defaultTitle: "الدكتورة غادة العتيبي | استشارية أمراض جلدية — الرياض",
    defaultDescription:
      "الموقع التعريفي الرسمي للدكتورة غادة العتيبي، استشارية أمراض جلدية في الرياض، بتخصص دقيق في مقاومة شيخوخة البشرة والشعر وتجميل الجلد وتجديده.",
    aboutTitle: "اعرف الدكتورة | الدكتورة غادة العتيبي",
    aboutDescription:
      "سيرة مهنية موجزة للدكتورة غادة العتيبي، استشارية أمراض جلدية في مدينة الرياض، ومجالات اهتمامها الدقيق في صحة الجلد والشعر وتجديد البشرة.",
    areasTitle: "مجالات العناية | الدكتورة غادة العتيبي",
    areasDescription:
      "تعرّفي على مجالات العناية الجلدية والشعر وتغيرات البشرة المرتبطة بالعمر وتجميل الجلد وتجديده لدى الدكتورة غادة العتيبي في الرياض.",
    articlesTitle: "مقالات ومحتوى تثقيفي | الدكتورة غادة العتيبي",
    articlesDescription:
      "أرشيف المحتوى التثقيفي والمقالات المعتمدة حول العناية بالبشرة والشعر وصحة الجلد للدكتورة غادة العتيبي.",
    reviewsTitle: "مراجعات وتجارب موثقة | الدكتورة غادة العتيبي",
    reviewsDescription:
      "مساحة مخصصة للمراجعات الموثقة والمصرّح بنشرها وفق معايير الخصوصية والشفافية المهنية.",
    consultationTitle: "حجز واستشارة | الدكتورة غادة العتيبي",
    consultationDescription:
      "نموذج منظم لطلب موعد أو استفسار أولي والتواصل مع فريق تنسيق المواعيد للدكتورة غادة العتيبي عبر واتساب في الرياض.",
    privacyTitle: "سياسة الخصوصية | الدكتورة غادة العتيبي",
    privacyDescription:
      "توضيح موجز وشفاف لكيفية تعامل الموقع مع مدخلات نموذج الاستشارة والانتقال إلى واتساب دون تخزين بياناتك الطبية.",
  },
  nav: {
    home: "الرئيسية",
    about: "اعرف الدكتورة",
    areas: "مجالات العناية",
    articles: "مقالات",
    reviews: "مراجعات",
    consultation: "حجز واستشارة",
    bookCta: "حجز استشارة",
    switchLangLabel: "التبديل إلى النسخة الإنجليزية",
    switchLangShort: "EN",
    openMenu: "فتح قائمة التنقل",
    closeMenu: "إغلاق قائمة التنقل",
    skipToContent: "الانتقال إلى المحتوى الرئيسي",
    mobileNavTitle: "التنقل في الموقع",
  },
  hero: {
    kicker: "استشارية أمراض جلدية · الرياض",
    headline: "عناية ببشرتك، تبدأ بفهمها.",
    editorialNote: "العناية بالبشرة والشعر وتجميل الجلد وتجديده",
    nameLine: "د. غادة العتيبي",
    roleAndCity: "استشارية أمراض جلدية · الرياض",
    primaryCta: "ابدئي طلب الاستشارة",
    secondaryCta: "تعرّفي على الدكتورة",
  },
  home: {
    introKicker: "نبذة مهنية",
    introHeading: "حضور طبي متخصص يوازن بين صحة الجلد ودقة العناية التجميلية.",
    introLink: "قراءة السيرة المهنية كاملة",
    areasKicker: "مجالات العناية",
    areasHeading: "أربعة مسارات رئيسية للعناية بالبشرة والشعر",
    areasSubheading:
      "يخضع كل مسار للتقييم الفردي المباشر داخل العيادة دون قوالب جاهزة أو وعود مسبقة.",
    areasViewAll: "استعراض تفاصيل المجالات",
    areasInquireLink: "استشارة حول هذا المجال",
    topicsKicker: "من موضوعات الحساب",
    topicsHeading: "عناوين تثقيفية مطروحة في حساب الدكتورة",
    topicsDisclaimer:
      "تُعرض هذه العناوين بوصفها موضوعات توعوية مستلهمة من حساب إنستغرام الرسمي للدكتورة، وليست مقالات علاجية مكتملة أو إقرارًا بتقديم إجراء محدد دون فحص.",
    topicsFollowLink: "متابعة الحساب الرسمي على إنستغرام",
    topicsInquireCta: "طلب استشارة متعلقة بهذا الموضوع",
    articlesKicker: "المحتوى التثقيفي",
    articlesHeading: "مقالات وقراءات معتمدة",
    articlesEmptyNotice:
      "يجري إعداد المحتوى التثقيفي. يمكنكِ متابعة حساب الدكتورة على إنستغرام.",
    articlesArchiveLink: "زيارة صفحة المقالات",
    reviewsKicker: "ثقة وخصوصية",
    reviewsHeading: "المراجعات الموثقة",
    reviewsEmptyNotice:
      "تُخصّص هذه المساحة لعرض التجارب الحقيقية الموثقة والمصرّح بنشرها فقط، التزامًا بخصوصية المراجعات والمعايير المهنية.",
    reviewsPageLink: "معايير نشر المراجعات",
    closingKicker: "تنسيق المواعيد",
    closingHeading: "خطوة هادئة لترتيب استشارتكِ القادمة",
    closingBody:
      "يمكنكِ إعداد ملخص طلبكِ في دقائق معدودة عبر نموذج الاستشارة المنظم، أو التواصل مباشرة مع فريق التنسيق عبر واتساب لمعرفة المواعيد المتاحة في الرياض.",
    closingPrimaryCta: "بدء طلب الاستشارة",
    closingWhatsappCta: "التواصل المباشر عبر واتساب",
  },
  about: {
    kicker: "اعرف الدكتورة",
    heading: "الدكتورة غادة العتيبي",
    lead: "استشارية أمراض جلدية — الرياض، المملكة العربية السعودية",
    specializationHeading: "الاهتمام المهني والتخصص الدقيق",
    focusListHeading: "نطاق الاهتمام الطبي والتثقيفي",
    locationLabel: "المدينة",
    roleLabel: "المسمى المهني",
    coordinationLabel: "واتساب تنسيق المواعيد",
    qualificationsHeading: "المؤهلات الأكاديمية",
    certificationsHeading: "الشهادات والزمالات",
    experienceHeading: "الخبرات المهنية",
    membershipsHeading: "العضويات العلمية",
    ctaHeading: "هل ترغبين في حجز استشارة مع الدكتورة غادة؟",
    ctaBody:
      "نسعد باستقبال طلبات المواعيد والاستفسارات الأولية وترتيبها عبر فريق التنسيق على واتساب.",
    ctaButton: "انتقلي إلى نموذج طلب الموعد",
  },
  areas: {
    kicker: "مجالات العناية",
    heading: "فهم احتياج البشرة والشعر قبل أي قرار",
    lead: "تغطي مجالات العناية لدى الدكتورة غادة العتيبي الجوانب الصحية والوقائية والتجميلية للجلد والشعر، مع اعتماد الفحص السريري المباشر أساسًا لأي توصية.",
    disclaimer:
      "ملاحظة مهنية: تهدف المعلومات والأمثلة أدناه إلى التوضيح العام وتوجيه طلب الاستشارة، ولا تُعد تشخيصًا طبيًا أو التزامًا بإجراء علاجي أو نتيجة محددة.",
    examplesHeading: "أمثلة عامة لأسباب طلب الاستشارة",
    inquireButton: "استشارة حول هذا الموضوع",
    closingNote:
      "في حال كان استفساركِ يجمع بين أكثر من مجال، يمكنكِ تحديد عدة أسباب معًا داخل نموذج الاستشارة.",
  },
  articles: {
    kicker: "المجلة التثقيفية",
    heading: "مقالات وقراءات في صحة البشرة والشعر",
    lead: "مساحة تحريرية مخصصة لنشر المواد التثقيفية الموثقة والمعتمدة رسميًا.",
    searchPlaceholder: "ابحثي في عناوين المقالات أو ملخصاتها...",
    searchLabel: "البحث في المقالات",
    allCategories: "جميع التصنيفات",
    clearFilters: "إعادة ضبط البحث",
    noFilterMatches: "لا توجد مقالات مطابقة لعبارة البحث أو التصنيف المختار حاليًا.",
    emptyStateTitle: "المحتوى التثقيفي قيد الإعداد",
    emptyStateMessage:
      "يجري إعداد المحتوى التثقيفي. يمكنكِ متابعة حساب الدكتورة على إنستغرام.",
    emptyStateInstagramCta: "متابعة @dr.ghada.alotaibi على إنستغرام",
    editorialStandardNote:
      "يقتصر النشر في هذا الأرشيف على المواد المكتملة والمعتمدة للنشر؛ ولا تُعرض المسودات قيد التحرير للزوار.",
    readArticle: "قراءة المقال",
    publishedOn: "تاريخ النشر",
    sourceLabel: "المصدر",
    doctorApprovedBadge: "محتوى معتمد من الدكتورة",
    shareHeading: "مشاركة المقال",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ الرابط",
    shareWhatsapp: "مشاركة عبر واتساب",
    relatedHeading: "مقالات ذات صلة",
    backToArchive: "العودة إلى جميع المقالات",
  },
  reviews: {
    kicker: "المراجعات",
    heading: "تجارب المراجعات ومعايير النشر",
    lead: "نؤمن بأن الثقة في الرعاية الجلدية تُبنى على الصدق والخصوصية واحترام التجربة الفردية لكل مراجعة.",
    emptyTitle: "لا توجد مراجعات منشورة في الوقت الحالي",
    emptyBody:
      "تُخصص هذه الصفحة لعرض المراجعات الحقيقية الموثقة المصدر والمصرّح بنشرها فقط. حرصًا على المصداقية المهنية، يمتنع الموقع عن عرض أي تقييمات تجريبية أو نصوص غير موثقة.",
    policyPoints: [
      "لا تُنشر أي رسائل أو محادثات خاصة دون إذن صريح وواضح للنشر.",
      "لا تُعرض تقييمات رقمية أو نجوم إجمالية ما لم تستند إلى مصدر علني موثق.",
      "تُحترم خصوصية المراجعات وهوياتهن وتفاصيلهن الطبية في جميع الأوقات.",
    ],
    inquireCta: "طلب موعد أو استشارة",
    sourcePrefix: "المصدر الموثق:",
  },
  consultation: {
    kicker: "حجز واستشارة",
    heading: "تنظيم طلب الاستشارة أو الموعد",
    lead: "أجيبي عن ثلاث خطوات موجزة لتجهيز رسالة واضحة لفريق التنسيق عبر واتساب، دون الحاجة إلى إدخال بيانات طبية حساسة.",
    coordinationNotice:
      "تنويه: يُنسّق الموعد ويُؤكّد نهائيًا بواسطة فريق التنسيق عبر واتساب حسب الأوقات المتاحة.",
    steps: {
      step1: "سبب التواصل",
      step2: "معلومات مختصرة",
      step3: "مراجعة الطلب",
      stepIndicator: "الخطوة",
    },
    step1: {
      requestTypeLabel: "طبيعة الطلب",
      topicsLabel: "سبب الاستشارة (يمكنكِ اختيار أكثر من موضوع)",
      topicsHint: "اختاري موضوعًا واحدًا أو أكثر ليسهل توجيه رسالتكِ للفريق.",
      routingDisclaimer:
        "تُستخدم هذه الخيارات لتوجيه الطلب تنظيميًا فقط، ولا تعني توفر إجراء علاجي بعينه قبل التقييم الطبي.",
      nextButton: "المتابعة إلى المعلومات المختصرة",
      errorRequestType: "يرجى اختيار طبيعة الطلب للمتابعة.",
      errorTopics: "يرجى تحديد سبب واحد للاستشارة على الأقل.",
    },
    step2: {
      nameLabel: "الاسم الكريم",
      namePlaceholder: "اكتبي اسمكِ الثنائي أو الأول",
      phoneLabel: "رقم التواصل",
      phoneOptionalTag: "اختياري",
      phoneHint: "اختياري لأن المحادثة ستُستكمل مباشرة عبر حسابكِ في واتساب.",
      phonePlaceholder: "05XXXXXXXX",
      languageLabel: "اللغة المفضلة للتواصل",
      languageAr: "العربية",
      languageEn: "الإنجليزية",
      timeLabel: "الفترة المفضلة للتواصل الهاتفي أو النصي",
      timeOptionalTag: "اختيارية",
      timeHint: "تساعد الفريق على اختيار وقت مناسب للرد، ولا تعني حجز موعد في هذه الفترة.",
      timeNone: "دون تفضيل محدد",
      noteLabel: "ملاحظة قصيرة",
      noteOptionalTag: "اختيارية",
      notePlaceholder: "استفسار مختصر حول طلبكِ (بحد أقصى 300 حرف)...",
      sensitiveWarning:
        "يرجى عدم إدخال معلومات طبية حساسة؛ يمكن مناقشة التفاصيل مباشرة مع الفريق.",
      backButton: "الرجوع للخطوة السابقة",
      nextButton: "مراجعة ملخص الطلب",
      errorName: "يرجى إدخال الاسم للمتابعة.",
      errorNoteLength: "يرجى ألا تتجاوز الملاحظة 300 حرف.",
    },
    step3: {
      summaryHeading: "ملخص طلبكِ قبل الانتقال إلى واتساب",
      editStep1: "تعديل سبب التواصل",
      editStep2: "تعديل البيانات",
      previewHeading: "نص الرسالة الجاهز للإرسال",
      previewHint:
        "سيُفتح تطبيق واتساب مع هذه الرسالة لتراجعيها بنفسكِ وتضغطي زر الإرسال داخل التطبيق.",
      consentLabel: "أوافق على نقل البيانات المدخلة إلى واتساب للتواصل بشأن طلبي.",
      privacyLinkText: "الاطلاع على سياسة الخصوصية",
      errorConsent: "يرجى تأكيد الموافقة على نقل البيانات إلى واتساب قبل المتابعة.",
      submitWhatsapp: "متابعة الطلب عبر واتساب",
      copyMessage: "نسخ نص الرسالة",
      copiedMessage: "تم نسخ الرسالة بنجاح",
      directWhatsappFallback: "فتح واتساب مباشرة دون رسالة جاهزة",
      backButton: "تعديل الخطوة السابقة",
      openedReminder:
        "تم فتح نافذة واتساب مع نص رسالتكِ الجاهز. يرجى إرسال الرسالة داخل واتساب ليتمكن فريق التنسيق من متابعة طلبكِ وتأكيد الموعد المتاح.",
      notProvided: "غير محدد",
    },
    whatsappTemplate: {
      intro: "مرحبًا، أرغب في التواصل مع فريق الدكتورة غادة العتيبي.",
      name: "الاسم",
      requestType: "نوع الطلب",
      topics: "سبب الاستشارة",
      language: "لغة التواصل",
      preferredTime: "الفترة المفضلة",
      notes: "ملاحظات",
    },
    faq: {
      kicker: "الأسئلة الشائعة",
      heading: "إجابات واضحة حول تنسيق المواعيد والاستشارات",
      lead: "تفاصيل تنظيمية تساعدكِ على معرفة آلية التواصل والخصوصية قبل إرسال طلبكِ.",
    },
  },
  privacy: {
    kicker: "الخصوصية والشفافية",
    heading: "سياسة الخصوصية",
    lead: "توضح هذه السياسة الموجزة كيفية عمل هذا الموقع التعريفي وآلية التعامل مع البيانات المدخلة في نموذج طلب الاستشارة.",
    sections: [
      {
        title: "1. طبيعة الموقع وعدم تخزين البيانات",
        paragraphs: [
          "يعمل هذا الموقع بوصفه منصة تعريفية وتثقيفية للدكتورة غادة العتيبي وتسهيلًا لتنسيق المواعيد.",
          "لا يشتمل الموقع على حسابات مستخدمين أو قواعد بيانات لتخزين طلبات الاستشارة، كما لا يحفظ مدخلات النموذج في التخزين المحلي للمتصفح أو ملفات تعريف الارتباط التسويقية.",
        ],
      },
      {
        title: "2. آلية عمل نموذج الاستشارة والانتقال إلى واتساب",
        paragraphs: [
          "تعالج الحقول التي تدخلينها في نموذج الحجز والاستشارة محليًا داخل متصفحكِ فقط لغرض تكوين نص رسالة منظمة وواضحة.",
          "عند تفعيل خيار الموافقة والضغط على زر «متابعة الطلب عبر واتساب»، ينقلكِ المتصفح إلى الرابط الرسمي لخدمة واتساب مع تمرير النص الجاهز، ولا تُرسل الرسالة إلا بعد مراجعتكِ لها وضغطكِ زر الإرسال داخل تطبيق واتساب نفسه.",
          "تخضع المحادثة التي تجرينها عبر تطبيق واتساب لسياسة الخصوصية وشروط الخدمة الخاصة بمنصة واتساب.",
        ],
      },
      {
        title: "3. المعلومات الطبية الحساسة",
        paragraphs: [
          "نطلب صراحة عدم إدخال أرقام الهوية أو تواريخ الميلاد أو الصور الشخصية أو التقارير الطبية الحساسة داخل نموذج الموقع، وترك التفاصيل السريرية لمناقشتها بخصوصية مباشرة مع الفريق المختص أو أثناء الموعد.",
        ],
      },
      {
        title: "4. التحليلات والسجلات",
        paragraphs: [
          "لا يتم إرسال نصوص الملاحظات أو الأسماء أو أرقام التواصل المدخلة في النموذج إلى أي خدمات تحليلات خارجية أو سجلات خادم.",
        ],
      },
      {
        title: "5. قنوات التواصل الرسمية",
        paragraphs: [
          "للاستفسار بشأن تنسيق المواعيد، يتم التواصل عبر رقم واتساب المعتمد لتنسيق المواعيد الموضح في الموقع أو متابعة الحساب الرسمي للدكتورة على منصة إنستغرام.",
        ],
      },
    ],
  },
  footer: {
    tagline:
      "استشارية أمراض جلدية في الرياض — عناية متخصصة بصحة البشرة والشعر ومقاومة شيخوختهما وتجميل الجلد وتجديده.",
    navigationHeading: "روابط سريعة",
    contactHeading: "التواصل والمتابعة",
    coordinationLabel: "واتساب التنسيق",
    instagramLabel: "حساب إنستغرام",
    privacyLink: "سياسة الخصوصية",
    medicalNotice:
      "المحتوى الوارد في هذا الموقع تعريفي وتثقيفي عام ولا يغني عن الاستشارة والفحص الطبي المباشر.",
    rights: "جميع الحقوق محفوظة — الدكتورة غادة العتيبي.",
  },
  notFound: {
    kicker: "404",
    heading: "الصفحة المطلوبة غير متوفرة",
    body: "قد يكون الرابط غير مكتمل أو أن المحتوى غير منشور حاليًا. يمكنكِ العودة إلى الصفحة الرئيسية أو الانتقال إلى طلب الاستشارة.",
    backHome: "العودة إلى الرئيسية",
  },
};

const en: Dictionary = {
  meta: {
    siteName: "Dr. Ghada Alotaibi",
    defaultTitle: "Dr. Ghada Alotaibi | Consultant Dermatologist — Riyadh",
    defaultDescription:
      "Official profile of Dr. Ghada Alotaibi, Consultant Dermatologist in Riyadh with special interest and advanced specialization in skin and hair aging, cosmetic dermatology, and skin rejuvenation.",
    aboutTitle: "About the Doctor | Dr. Ghada Alotaibi",
    aboutDescription:
      "Professional profile of Dr. Ghada Alotaibi, Consultant Dermatologist in Riyadh, focusing on clinical dermatology, skin and hair aging, and skin rejuvenation.",
    areasTitle: "Areas of Care | Dr. Ghada Alotaibi",
    areasDescription:
      "Explore general areas of dermatological care, hair and scalp health, age-related skin changes, and cosmetic skin rejuvenation in Riyadh.",
    articlesTitle: "Articles & Educational Notes | Dr. Ghada Alotaibi",
    articlesDescription:
      "Approved educational articles and dermatological reading from Dr. Ghada Alotaibi.",
    reviewsTitle: "Verified Reviews | Dr. Ghada Alotaibi",
    reviewsDescription:
      "Dedicated space for verified, consented patient feedback governed by strict editorial transparency and privacy standards.",
    consultationTitle: "Booking & Consultation | Dr. Ghada Alotaibi",
    consultationDescription:
      "Organize an appointment request or preliminary care inquiry and connect with Dr. Ghada Alotaibi's coordination team in Riyadh via WhatsApp.",
    privacyTitle: "Privacy Policy | Dr. Ghada Alotaibi",
    privacyDescription:
      "Clear explanation of how our consultation request form prepares your WhatsApp message locally without storing personal or medical records.",
  },
  nav: {
    home: "Home",
    about: "About the Doctor",
    areas: "Areas of Care",
    articles: "Articles",
    reviews: "Reviews",
    consultation: "Booking & Consultation",
    bookCta: "Book Consultation",
    switchLangLabel: "Switch to Arabic version",
    switchLangShort: "العربية",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    skipToContent: "Skip to main content",
    mobileNavTitle: "Site Navigation",
  },
  hero: {
    kicker: "Dermatology & Skin Rejuvenation — Riyadh",
    headline: "Thoughtful care begins with understanding your skin.",
    editorialNote:
      "A calm, clinical perspective grounded in skin and hair health, attentive assessment, and measured cosmetic refinement.",
    nameLine: "Dr. Ghada Alotaibi",
    roleAndCity: "Consultant Dermatologist — Riyadh",
    primaryCta: "Start Your Consultation Request",
    secondaryCta: "Meet the Doctor",
  },
  home: {
    introKicker: "Professional Profile",
    introHeading: "Clinical dermatology shaped by clarity, discretion, and individualized care.",
    introLink: "Read Full Profile",
    areasKicker: "Areas of Care",
    areasHeading: "Four foundational pillars of skin and hair care",
    areasSubheading:
      "Every consultation is guided by in-person dermatological assessment rather than preset routines or generalized promises.",
    areasViewAll: "Explore All Areas of Care",
    areasInquireLink: "Inquire about this area",
    topicsKicker: "From the Account",
    topicsHeading: "Educational themes from Dr. Ghada's Instagram",
    topicsDisclaimer:
      "These subjects reflect educational topics discussed on Dr. Ghada's official Instagram profile; they are presented for general awareness rather than as complete medical articles or guaranteed clinic procedures.",
    topicsFollowLink: "Follow on Instagram",
    topicsInquireCta: "Request a consultation on this topic",
    articlesKicker: "Editorial Journal",
    articlesHeading: "Approved Articles & Insights",
    articlesEmptyNotice:
      "Educational content is currently being prepared. In the meantime, you can follow Dr. Ghada's official Instagram account.",
    articlesArchiveLink: "Visit Articles Archive",
    reviewsKicker: "Trust & Discretion",
    reviewsHeading: "Verified Patient Reviews",
    reviewsEmptyNotice:
      "This space is reserved strictly for verified testimonials published with explicit consent, upholding patient privacy and clinical integrity.",
    reviewsPageLink: "View Review Standards",
    closingKicker: "Appointment Coordination",
    closingHeading: "A quiet, structured way to arrange your visit",
    closingBody:
      "Prepare a concise summary of your request in a few moments using our guided form, or connect directly with the coordination team on WhatsApp for scheduling in Riyadh.",
    closingPrimaryCta: "Start Consultation Request",
    closingWhatsappCta: "Message Directly on WhatsApp",
  },
  about: {
    kicker: "About the Doctor",
    heading: "Dr. Ghada Alotaibi",
    lead: "Consultant Dermatologist — Riyadh, Saudi Arabia",
    specializationHeading: "Special Interest & Clinical Focus",
    focusListHeading: "Scope of Professional & Educational Focus",
    locationLabel: "City",
    roleLabel: "Title",
    coordinationLabel: "Coordination WhatsApp",
    qualificationsHeading: "Academic Qualifications",
    certificationsHeading: "Certifications & Fellowships",
    experienceHeading: "Professional Experience",
    membershipsHeading: "Professional Memberships",
    ctaHeading: "Planning an appointment with Dr. Ghada?",
    ctaBody:
      "Submit an organized appointment request or preliminary inquiry to connect smoothly with the scheduling team via WhatsApp.",
    ctaButton: "Go to Consultation Request",
  },
  areas: {
    kicker: "Areas of Care",
    heading: "Understanding skin and hair needs before recommending care",
    lead: "Dr. Ghada Alotaibi's practice spans clinical skin health, scalp and hair vitality, well-aging dermatology, and measured skin rejuvenation—always anchored in direct medical evaluation.",
    disclaimer:
      "Clinical note: The descriptions and examples below are provided for general orientation and request routing. They do not constitute medical diagnosis, automated recommendations, or guaranteed outcomes.",
    examplesHeading: "Common Reasons to Request a Consultation",
    inquireButton: "Inquire About This Area",
    closingNote:
      "If your concern spans more than one area, you may select multiple topics together in Step 1 of the consultation form.",
  },
  articles: {
    kicker: "Educational Archive",
    heading: "Articles on Skin & Hair Care",
    lead: "An editorial space dedicated exclusively to verified, officially approved educational reading.",
    searchPlaceholder: "Search article titles or summaries...",
    searchLabel: "Search articles",
    allCategories: "All Categories",
    clearFilters: "Reset filters",
    noFilterMatches: "No published articles match your current search or selected category.",
    emptyStateTitle: "Educational Articles Are in Preparation",
    emptyStateMessage:
      "Educational content is currently being prepared. You are welcome to follow Dr. Ghada's official Instagram account for updates.",
    emptyStateInstagramCta: "Follow @dr.ghada.alotaibi on Instagram",
    editorialStandardNote:
      "Only completed, officially approved articles appear in this archive; unpublished drafts remain hidden from public view.",
    readArticle: "Read Article",
    publishedOn: "Published",
    sourceLabel: "Source",
    doctorApprovedBadge: "Reviewed & Approved by Dr. Ghada",
    shareHeading: "Share Article",
    copyLink: "Copy Link",
    linkCopied: "Link Copied",
    shareWhatsapp: "Share via WhatsApp",
    relatedHeading: "Related Articles",
    backToArchive: "Back to All Articles",
  },
  reviews: {
    kicker: "Reviews",
    heading: "Patient Experiences & Publication Standards",
    lead: "Trust in dermatological care rests on honesty, discretion, and respect for each individual's privacy.",
    emptyTitle: "No Verified Reviews Published Yet",
    emptyBody:
      "This page is dedicated solely to documented, source-verified patient reviews shared with explicit permission for public display. We never publish sample quotes, placeholder ratings, or unverified testimonials.",
    policyPoints: [
      "Private messages or clinic conversations are never published without explicit consent.",
      "Aggregate star scores are omitted unless backed by verifiable public records.",
      "Patient confidentiality and personal medical details are safeguarded at every stage.",
    ],
    inquireCta: "Request a Consultation",
    sourcePrefix: "Verified source:",
  },
  consultation: {
    kicker: "Booking & Consultation",
    heading: "Arrange Your Consultation Request",
    lead: "Complete three brief steps to prepare a structured message for the coordination team on WhatsApp—without entering sensitive medical records.",
    coordinationNotice:
      "Please note: Appointments are coordinated and confirmed directly by the scheduling team via WhatsApp subject to clinic availability.",
    steps: {
      step1: "Reason for Contact",
      step2: "Brief Details",
      step3: "Review Request",
      stepIndicator: "Step",
    },
    step1: {
      requestTypeLabel: "Type of Request",
      topicsLabel: "Consultation Topic (you may select more than one)",
      topicsHint: "Select one or more areas to help route your inquiry clearly.",
      routingDisclaimer:
        "These options help direct your inquiry to the team and do not represent a list of guaranteed procedures prior to medical evaluation.",
      nextButton: "Continue to Brief Details",
      errorRequestType: "Please select the type of request to continue.",
      errorTopics: "Please choose at least one consultation topic.",
    },
    step2: {
      nameLabel: "Full Name",
      namePlaceholder: "Enter your first or full name",
      phoneLabel: "Contact Number",
      phoneOptionalTag: "Optional",
      phoneHint: "Optional, as your conversation will continue directly through WhatsApp.",
      phonePlaceholder: "+966 5X XXX XXXX",
      languageLabel: "Preferred Communication Language",
      languageAr: "Arabic",
      languageEn: "English",
      timeLabel: "Preferred Contact Window",
      timeOptionalTag: "Optional",
      timeHint: "Helps the team reach out at a convenient time; does not guarantee appointment slot availability.",
      timeNone: "No specific preference",
      noteLabel: "Brief Note",
      noteOptionalTag: "Optional",
      notePlaceholder: "A short note regarding your inquiry (maximum 300 characters)...",
      sensitiveWarning:
        "Please do not enter sensitive medical information; clinical details can be discussed directly with the team.",
      backButton: "Back to Previous Step",
      nextButton: "Review Request Summary",
      errorName: "Please enter your name to continue.",
      errorNoteLength: "Please keep your note within 300 characters.",
    },
    step3: {
      summaryHeading: "Review Your Request Before Opening WhatsApp",
      editStep1: "Edit Reason & Topics",
      editStep2: "Edit Contact Details",
      previewHeading: "Prepared WhatsApp Message",
      previewHint:
        "WhatsApp will open with this text pre-filled so you can review it and press send yourself inside the app.",
      consentLabel:
        "I agree to transfer the entered details to WhatsApp to communicate regarding my request.",
      privacyLinkText: "Read Privacy Policy",
      errorConsent:
        "Please confirm your consent to transfer the entered details to WhatsApp before continuing.",
      submitWhatsapp: "Continue on WhatsApp",
      copyMessage: "Copy Message Text",
      copiedMessage: "Message Copied",
      directWhatsappFallback: "Open Direct WhatsApp Chat Instead",
      backButton: "Back to Edit Details",
      openedReminder:
        "WhatsApp has been opened with your prepared message. Please send the message inside WhatsApp so the coordination team can review availability and confirm your appointment.",
      notProvided: "Not specified",
    },
    whatsappTemplate: {
      intro: "Hello, I would like to connect with Dr. Ghada Alotaibi's coordination team.",
      name: "Name",
      requestType: "Request Type",
      topics: "Consultation Topic(s)",
      language: "Preferred Language",
      preferredTime: "Preferred Contact Time",
      notes: "Notes",
    },
    faq: {
      kicker: "Frequently Asked Questions",
      heading: "Clear answers on scheduling & privacy",
      lead: "Practical details on how appointment requests are coordinated and how your privacy is respected.",
    },
  },
  privacy: {
    kicker: "Privacy & Transparency",
    heading: "Privacy Policy",
    lead: "This concise policy explains how this informational website operates and how entries in the consultation request form are handled.",
    sections: [
      {
        title: "1. Informational Scope & Zero Database Storage",
        paragraphs: [
          "This website serves as an official professional profile for Dr. Ghada Alotaibi and a structured aid for coordinating appointment inquiries.",
          "The website does not maintain user accounts or backend databases for consultation requests, nor does it persist your form inputs in browser localStorage or marketing cookies.",
        ],
      },
      {
        title: "2. How the Consultation Form & WhatsApp Transfer Work",
        paragraphs: [
          "Details entered into the Booking & Consultation form are processed strictly within your active browser memory to format a clear summary message.",
          "Only after you check the explicit consent box and click “Continue on WhatsApp” does your browser open the official WhatsApp link (`wa.me`) carrying your prepared message. No message is transmitted until you personally review and send it inside WhatsApp.",
          "Once you communicate via WhatsApp, that conversation is governed by WhatsApp's own terms of service and privacy policy.",
        ],
      },
      {
        title: "3. Sensitive Medical Information",
        paragraphs: [
          "Visitors are explicitly asked not to enter national ID numbers, dates of birth, clinical photographs, or confidential medical reports into the website form. Personal medical history should be shared directly during clinical consultation.",
        ],
      },
      {
        title: "4. Analytics & Server Logs",
        paragraphs: [
          "Names, contact numbers, selected topics, and personal notes entered in the form are never transmitted to analytics services or logged on application servers.",
        ],
      },
      {
        title: "5. Official Contact Channels",
        paragraphs: [
          "Appointment coordination takes place via the official scheduling WhatsApp number listed on this site, alongside public educational updates shared on Dr. Ghada Alotaibi's verified Instagram profile.",
        ],
      },
    ],
  },
  footer: {
    tagline:
      "Consultant Dermatologist in Riyadh — Special interest in skin and hair aging, cosmetic dermatology, and skin rejuvenation.",
    navigationHeading: "Quick Links",
    contactHeading: "Connect",
    coordinationLabel: "Coordination WhatsApp",
    instagramLabel: "Instagram",
    privacyLink: "Privacy Policy",
    medicalNotice:
      "Content on this website is provided for general informational and educational awareness and does not replace an in-person medical consultation.",
    rights: "All rights reserved — Dr. Ghada Alotaibi.",
  },
  notFound: {
    kicker: "404",
    heading: "Page Not Found",
    body: "The page you requested may have moved or is not publicly available. You may return to the home page or proceed to book a consultation.",
    backHome: "Return Home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
