"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";
import {
  consultationTopicOptions,
  type ConsultationTopicKey,
} from "@/content/consultation";

interface HomeQuickConsultationCardProps {
  locale: Locale;
  dict: Dictionary;
}

const quickPillItems: {
  key: ConsultationTopicKey;
  shortLabel: Record<Locale, string>;
}[] = [
  { key: "skin-daily", shortLabel: { ar: "البشرة", en: "Skin" } },
  { key: "hair-scalp", shortLabel: { ar: "الشعر", en: "Hair" } },
  { key: "pigmentation", shortLabel: { ar: "التصبغات", en: "Pigmentation" } },
  { key: "eye-area", shortLabel: { ar: "حول العين", en: "Eye Area" } },
  { key: "neck-elasticity", shortLabel: { ar: "الرقبة", en: "Neck" } },
  { key: "other", shortLabel: { ar: "أخرى", en: "Other" } },
];

export function HomeQuickConsultationCard({
  locale,
  dict,
}: HomeQuickConsultationCardProps) {
  const uid = useId();
  const [selectedTopics, setSelectedTopics] = useState<ConsultationTopicKey[]>([
    "skin-daily",
  ]);
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openedNotice, setOpenedNotice] = useState(false);

  const toggleTopic = (key: ConsultationTopicKey) => {
    setSelectedTopics((prev) => {
      const next = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      if (next.length > 0) setErrorMsg(null);
      return next;
    });
  };

  const composedMessage = useMemo(() => {
    const t = dict.consultation.whatsappTemplate;
    const separator = locale === "ar" ? "، " : ", ";
    const topicLabels = consultationTopicOptions
      .filter((opt) => selectedTopics.includes(opt.key))
      .map((opt) => opt.label[locale])
      .join(separator);

    const requestLabel =
      locale === "ar" ? "طلب موعد / استشارة" : "Consultation Request";
    const langLabel =
      locale === "ar"
        ? dict.consultation.step2.languageAr
        : dict.consultation.step2.languageEn;

    return [
      t.intro,
      `${t.name}: ${name.trim()}`,
      `${t.requestType}: ${requestLabel}`,
      `${t.topics}: ${topicLabels}`,
      `${t.language}: ${langLabel}`,
    ].join("\n");
  }, [dict.consultation, locale, name, selectedTopics]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      setErrorMsg(dict.consultation.step1.errorTopics);
      return;
    }
    if (!name.trim()) {
      setErrorMsg(dict.consultation.step2.errorName);
      return;
    }
    if (!consent) {
      setErrorMsg(dict.consultation.step3.errorConsent);
      return;
    }
    setErrorMsg(null);
    setOpenedNotice(true);
    const url = `https://wa.me/${
      doctorProfile.contact.whatsappNumber
    }?text=${encodeURIComponent(composedMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fullFormHref =
    selectedTopics.length > 0
      ? `/${locale}/consultation?area=${selectedTopics[0]}`
      : `/${locale}/consultation`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-canvas text-espresso rounded-[12px] p-6 sm:p-8 shadow-[0_12px_36px_rgba(25,18,14,0.14)] space-y-5"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-espresso">
          {locale === "ar"
            ? "ما سبب استشارتكِ؟"
            : "What brings you in for care?"}
        </h3>
        <Link
          href={fullFormHref}
          className="text-[11.5px] text-ink-muted hover:text-espresso underline underline-offset-4 shrink-0"
        >
          {locale === "ar" ? "النموذج التفصيلي" : "Detailed form"}
        </Link>
      </div>

      {/* Multi-Select Topic Pills */}
      <div
        role="group"
        aria-label={dict.consultation.step1.topicsLabel}
        className="flex flex-wrap items-center gap-2"
      >
        {quickPillItems.map((pill) => {
          const active = selectedTopics.includes(pill.key);
          return (
            <button
              key={pill.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggleTopic(pill.key)}
              className={`editorial-fade px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] border ${
                active
                  ? "bg-sand border-sand text-espresso font-medium"
                  : "bg-canvas border-hairline text-ink-soft hover:border-taupe hover:text-espresso"
              }`}
            >
              {pill.shortLabel[locale]}
            </button>
          );
        })}
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor={`${uid}-quick-name`} className="sr-only">
          {dict.consultation.step2.nameLabel}
        </label>
        <input
          id={`${uid}-quick-name`}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errorMsg) setErrorMsg(null);
          }}
          placeholder={locale === "ar" ? "الاسم" : "Your Name"}
          className="w-full border border-hairline focus:border-espresso rounded-[6px] px-4 py-3 text-sm text-espresso bg-canvas placeholder:text-ink-muted"
        />
      </div>

      {/* Explicit Unchecked Consent */}
      <label
        htmlFor={`${uid}-quick-consent`}
        className="cursor-pointer flex items-start gap-2.5 text-xs text-ink-soft leading-relaxed"
      >
        <input
          id={`${uid}-quick-consent`}
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setErrorMsg(null);
          }}
          className="mt-0.5 h-3.5 w-3.5 accent-[#3B2C24] shrink-0"
        />
        <span>{dict.consultation.step3.consentLabel}</span>
      </label>

      {errorMsg && (
        <p role="alert" className="text-xs text-[#8a2c2c] font-medium">
          {errorMsg}
        </p>
      )}

      {openedNotice && (
        <p
          role="status"
          className="text-xs bg-warm border-s-2 border-espresso px-3 py-2 text-espresso leading-relaxed"
        >
          {dict.consultation.step3.openedReminder}
        </p>
      )}

      {/* Primary Espresso WhatsApp Button */}
      <button
        type="submit"
        className="editorial-fade w-full bg-espresso hover:bg-[#2a1f19] text-canvas rounded-[6px] py-3.5 px-5 text-sm font-medium flex items-center justify-center gap-2.5 cursor-pointer"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.8Z"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 9.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6.3.5.8 1.1 1.4 1.5.7.4 1 .5 1.3.3l.6-.7c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.4.5 0 .4-.3 1-.8 1.3-.5.3-1.1.4-1.8.2-1.2-.3-2.6-1.1-3.6-2.2-1-1.1-1.6-2.3-1.8-3.4-.1-.6.1-1.1.5-1.3Z"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          {locale === "ar" ? "متابعة عبر واتساب" : "Continue on WhatsApp"}
        </span>
      </button>

      <p className="text-center text-[11.5px] text-ink-muted">
        {locale === "ar"
          ? "يُؤكَّد الموعد بالتواصل مع الفريق"
          : "Appointments are confirmed by the coordination team"}
      </p>
    </form>
  );
}
