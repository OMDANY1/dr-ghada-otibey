import type { Locale } from "@/i18n/config";

export type RequestTypeKey =
  | "appointment"
  | "care-inquiry"
  | "previous-followup";

export type ConsultationTopicKey =
  | "skin-daily"
  | "hair-scalp"
  | "pigmentation"
  | "eye-area"
  | "neck-elasticity"
  | "aging-changes"
  | "cosmetic-rejuvenation"
  | "other";

export type PreferredTimeKey = "morning" | "afternoon" | "evening" | "flexible";

export interface OptionItem<K extends string> {
  key: K;
  label: Record<Locale, string>;
  hint?: Record<Locale, string>;
}

export const requestTypeOptions: OptionItem<RequestTypeKey>[] = [
  {
    key: "appointment",
    label: {
      ar: "طلب موعد",
      en: "Appointment Request",
    },
    hint: {
      ar: "التنسيق لحجز موعد استشارة حضورية مع الدكتورة",
      en: "Coordinate an in-person consultation appointment",
    },
  },
  {
    key: "care-inquiry",
    label: {
      ar: "استفسار أولي عن مجال عناية",
      en: "Initial Inquiry About an Area of Care",
    },
    hint: {
      ar: "توجيه استفسار تمهيدي لفريق التنسيق قبل تحديد الموعد",
      en: "Direct a preliminary question to the coordination team",
    },
  },
  {
    key: "previous-followup",
    label: {
      ar: "متابعة سابقة",
      en: "Previous Visit Follow-up",
    },
    hint: {
      ar: "التواصل بشأن زيارة سابقة أو موعد متابعة",
      en: "Follow up regarding a prior clinic visit",
    },
  },
];

export const consultationTopicOptions: OptionItem<ConsultationTopicKey>[] = [
  {
    key: "skin-daily",
    label: {
      ar: "البشرة والعناية اليومية",
      en: "Skin & Daily Care",
    },
  },
  {
    key: "hair-scalp",
    label: {
      ar: "الشعر وفروة الرأس",
      en: "Hair & Scalp",
    },
  },
  {
    key: "pigmentation",
    label: {
      ar: "التصبغات وتفاوت اللون",
      en: "Pigmentation & Uneven Tone",
    },
  },
  {
    key: "eye-area",
    label: {
      ar: "منطقة حول العين",
      en: "Eye-Area Care",
    },
  },
  {
    key: "neck-elasticity",
    label: {
      ar: "الرقبة ومرونة الجلد",
      en: "Neck & Skin Elasticity",
    },
  },
  {
    key: "aging-changes",
    label: {
      ar: "تغيرات البشرة المرتبطة بالعمر",
      en: "Age-Related Skin Changes",
    },
  },
  {
    key: "cosmetic-rejuvenation",
    label: {
      ar: "تجميل الجلد وتجديده",
      en: "Cosmetic Dermatology & Skin Rejuvenation",
    },
  },
  {
    key: "other",
    label: {
      ar: "سبب آخر",
      en: "Other Reason",
    },
  },
];

export const preferredTimeOptions: OptionItem<PreferredTimeKey>[] = [
  {
    key: "morning",
    label: {
      ar: "الفترة الصباحية",
      en: "Morning",
    },
  },
  {
    key: "afternoon",
    label: {
      ar: "فترة الظهيرة والعصر",
      en: "Afternoon",
    },
  },
  {
    key: "evening",
    label: {
      ar: "الفترة المسائية",
      en: "Evening",
    },
  },
  {
    key: "flexible",
    label: {
      ar: "مرن (أي وقت متاح للتواصل)",
      en: "Flexible",
    },
  },
];

export function isValidConsultationTopicKey(
  value: string | undefined | null
): value is ConsultationTopicKey {
  if (!value) return false;
  return consultationTopicOptions.some((opt) => opt.key === value);
}

export interface FaqItem {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export const consultationFaqs: FaqItem[] = [
  {
    id: "how-booking-works",
    question: {
      ar: "هل يُعد تعبئة النموذج تأكيدًا فوريًا للموعد؟",
      en: "Does completing this form immediately confirm an appointment?",
    },
    answer: {
      ar: "لا؛ يساعدكِ النموذج على ترتيب تفاصيل طلبكِ بوضوح في رسالة جاهزة، ثم تنتقلين إلى واتساب لإرسالها إلى فريق التنسيق الذي يتولى مراجعة الأوقات المتاحة وتأكيد الموعد معكِ مباشرة.",
      en: "No. The form organizes your inquiry into a clear summary message that opens in WhatsApp for you to send. Your appointment is scheduled and confirmed directly by the coordination team based on availability.",
    },
  },
  {
    id: "medical-details-privacy",
    question: {
      ar: "هل تُحفظ بياناتي المدخلة داخل الموقع؟",
      en: "Is the information I enter stored on this website?",
    },
    answer: {
      ar: "لا يحتفظ الموقع ببيانات النموذج في أي قاعدة بيانات أو في تخزين المتصفح المحلي، ولا يرسل محتوى طلبكِ إلى أدوات تحليلات. تبقى المدخلات داخل جلستكِ الحالية فقط إلى حين اختياركِ المتابعة عبر واتساب.",
      en: "No. This website does not store form entries in any database or browser localStorage, nor does it send form contents to analytics tools. Your inputs remain solely in memory until you choose to continue on WhatsApp.",
    },
  },
  {
    id: "sensitive-info",
    question: {
      ar: "هل أحتاج إلى إرفاق صور أو تقارير طبية قبل الموعد؟",
      en: "Should I send medical photos or lab reports before my visit?",
    },
    answer: {
      ar: "يرجى عدم إدخال أو إرسال معلومات طبية حساسة أو صور شخصية أو أرقام هوية عبر نموذج الموقع. تُناقش التفاصيل الطبية والفحوصات اللازمة بخصوصية مباشرة أثناء الاستشارة أو وفق توجيه الفريق المختص.",
      en: "Please do not submit sensitive medical records, personal photographs, or identification numbers through the website form. Clinical history and any relevant investigations are discussed privately during your consultation.",
    },
  },
  {
    id: "procedure-selection",
    question: {
      ar: "لماذا يركز النموذج على سبب الاستشارة بدل اختيار إجراء محدد؟",
      en: "Why does the form ask for my area of concern rather than a specific procedure?",
    },
    answer: {
      ar: "لأن ملاءمة أي خطة عناية أو إجراء جلدي أو تجميلي تعتمد على الفحص الطبي المباشر لحالة البشرة أو الشعر، لذا تُستخدم خيارات النموذج لتوجيه طلبكِ فقط دون افتراض تشخيص مسبق.",
      en: "Suitability for any dermatological or cosmetic care plan depends on an in-person clinical evaluation of your skin or scalp. Selecting a topic simply helps route your request without assuming a preset treatment.",
    },
  },
  {
    id: "direct-whatsapp",
    question: {
      ar: "هل يمكنني التواصل مباشرة عبر واتساب دون تعبئة النموذج؟",
      en: "Can I reach the coordination team directly on WhatsApp without using the form?",
    },
    answer: {
      ar: "نعم بكل تأكيد. نوفر رابط محادثة واتساب المباشر أسفل النموذج وفي تذييل الموقع لمن تفضّل بدء المحادثة مباشرة مع فريق التنسيق.",
      en: "Yes, certainly. A direct WhatsApp link is available alongside the form and in the site footer if you prefer to message the coordination team directly.",
    },
  },
];
