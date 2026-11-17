"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";
import {
  consultationTopicOptions,
  isValidConsultationTopicKey,
  preferredTimeOptions,
  requestTypeOptions,
  type ConsultationTopicKey,
  type PreferredTimeKey,
  type RequestTypeKey,
} from "@/content/consultation";
import { StitchIcon, type StitchIconName } from "@/components/StitchIcon";

interface ConsultationWizardProps {
  locale: Locale;
  dict: Dictionary;
}

type StepNumber = 1 | 2 | 3;

const requestTypeIconMap: Record<RequestTypeKey, StitchIconName> = {
  appointment: "calendar",
  "care-inquiry": "support",
  "previous-followup": "cycle",
};

export function ConsultationWizard({ locale, dict }: ConsultationWizardProps) {
  const searchParams = useSearchParams();
  const queryTopic = searchParams.get("area") || searchParams.get("topic") || "";

  return (
    <ConsultationWizardInner
      key={queryTopic}
      locale={locale}
      dict={dict}
      initialQueryTopic={queryTopic}
    />
  );
}

function ConsultationWizardInner({
  locale,
  dict,
  initialQueryTopic,
}: ConsultationWizardProps & { initialQueryTopic: string }) {
  const formUid = useId();
  const dirArrow: StitchIconName =
    locale === "ar" ? "arrow-back" : "arrow-forward";
  const backArrow: StitchIconName =
    locale === "ar" ? "arrow-forward" : "arrow-back";

  const [step, setStep] = useState<StepNumber>(1);
  const [requestType, setRequestType] = useState<RequestTypeKey>(() =>
    isValidConsultationTopicKey(initialQueryTopic) &&
    initialQueryTopic !== "other"
      ? "care-inquiry"
      : "appointment"
  );
  const [selectedTopics, setSelectedTopics] = useState<ConsultationTopicKey[]>(
    () =>
      isValidConsultationTopicKey(initialQueryTopic) ? [initialQueryTopic] : []
  );

  // Step 2 state — strictly kept in component memory (never localStorage/DB)
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"ar" | "en">(
    locale
  );
  const [preferredTime, setPreferredTime] = useState<PreferredTimeKey | "">("");
  const [shortNote, setShortNote] = useState("");

  // Step 3 state — consent MUST start unchecked
  const [consentChecked, setConsentChecked] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  // Validation error states
  const [step1Errors, setStep1Errors] = useState<{
    requestType?: string;
    topics?: string;
  }>({});
  const [step2Errors, setStep2Errors] = useState<{
    name?: string;
    note?: string;
  }>({});
  const [consentError, setConsentError] = useState<string | undefined>();

  const toggleTopic = (key: ConsultationTopicKey) => {
    setSelectedTopics((prev) => {
      const next = prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key];
      if (next.length > 0 && step1Errors.topics) {
        setStep1Errors((err) => ({ ...err, topics: undefined }));
      }
      return next;
    });
  };

  const handleContinueFromStep1 = () => {
    const errors: { requestType?: string; topics?: string } = {};
    if (!requestType) {
      errors.requestType = dict.consultation.step1.errorRequestType;
    }
    if (selectedTopics.length === 0) {
      errors.topics = dict.consultation.step1.errorTopics;
    }
    setStep1Errors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  };

  const handleContinueFromStep2 = () => {
    const errors: { name?: string; note?: string } = {};
    if (!fullName.trim()) {
      errors.name = dict.consultation.step2.errorName;
    }
    if (shortNote.length > 300) {
      errors.note = dict.consultation.step2.errorNoteLength;
    }
    setStep2Errors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(3);
    }
  };

  const requestTypeLabel = useMemo(() => {
    return (
      requestTypeOptions.find((opt) => opt.key === requestType)?.label[
        locale
      ] ?? ""
    );
  }, [requestType, locale]);

  const selectedTopicLabels = useMemo(() => {
    const separator = locale === "ar" ? "، " : ", ";
    return consultationTopicOptions
      .filter((opt) => selectedTopics.includes(opt.key))
      .map((opt) => opt.label[locale])
      .join(separator);
  }, [selectedTopics, locale]);

  const preferredLanguageLabel =
    preferredLanguage === "ar"
      ? dict.consultation.step2.languageAr
      : dict.consultation.step2.languageEn;

  const preferredTimeLabel = useMemo(() => {
    if (!preferredTime) return "";
    return (
      preferredTimeOptions.find((opt) => opt.key === preferredTime)?.label[
        locale
      ] ?? ""
    );
  }, [preferredTime, locale]);

  const composedMessage = useMemo(() => {
    const t = dict.consultation.whatsappTemplate;
    const lines: string[] = [
      t.intro,
      `${t.name}: ${fullName.trim()}`,
      `${t.requestType}: ${requestTypeLabel}`,
      `${t.topics}: ${selectedTopicLabels}`,
      `${t.language}: ${preferredLanguageLabel}`,
    ];

    if (phoneNumber.trim()) {
      const phoneTitle = locale === "ar" ? "رقم التواصل" : "Contact Number";
      lines.push(`${phoneTitle}: ${phoneNumber.trim()}`);
    }

    if (preferredTimeLabel) {
      lines.push(`${t.preferredTime}: ${preferredTimeLabel}`);
    }

    if (shortNote.trim()) {
      lines.push(`${t.notes}: ${shortNote.trim()}`);
    }

    return lines.join("\n");
  }, [
    dict.consultation.whatsappTemplate,
    fullName,
    requestTypeLabel,
    selectedTopicLabels,
    preferredLanguageLabel,
    phoneNumber,
    preferredTimeLabel,
    shortNote,
    locale,
  ]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${doctorProfile.contact.whatsappNumber}?text=${encodeURIComponent(
      composedMessage
    )}`;
  }, [composedMessage]);

  const handleContinueOnWhatsapp = () => {
    if (!consentChecked) {
      setConsentError(dict.consultation.step3.errorConsent);
      return;
    }
    setConsentError(undefined);
    setWhatsappOpened(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = composedMessage;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  const stepsMeta: { num: StepNumber; title: string }[] = [
    { num: 1, title: dict.consultation.steps.step1 },
    { num: 2, title: dict.consultation.steps.step2 },
    { num: 3, title: dict.consultation.steps.step3 },
  ];

  const progressWidthClass =
    step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full";

  const sidebarPrinciples =
    locale === "ar"
      ? [
          {
            num: "01",
            title: "خصوصية تامة وعدم تخزين للبيانات",
            desc: "تُعالَج مدخلات النموذج داخل متصفحكِ فقط لتجهيز الرسالة دون حفظها في قواعد بيانات.",
          },
          {
            num: "02",
            title: "تنسيق مباشر مع الفريق",
            desc: "تنتقلين برسالتكِ الجاهزة إلى واتساب لمراجعتها وإرسالها لفريق تنسيق المواعيد.",
          },
          {
            num: "03",
            title: "تقييم سريري مخصص في الرياض",
            desc: "تُحدَّد خطة العناية المناسبة بعد الفحص المباشر مع الدكتورة غادة العتيبي.",
          },
        ]
      : [
          {
            num: "01",
            title: "Strict Privacy & Zero Storage",
            desc: "Form entries stay only in active browser memory to format your message—never saved in databases.",
          },
          {
            num: "02",
            title: "Direct Team Coordination",
            desc: "Review and send your prepared inquiry on WhatsApp to arrange an available slot.",
          },
          {
            num: "03",
            title: "In-Person Assessment in Riyadh",
            desc: "Clinical recommendations are discussed personally during your consultation.",
          },
        ];

  return (
    <div className="space-y-8">
      {/* Stitch Full-Width Top Stepper Indicator Bar */}
      <div className="w-full bg-surface-low border border-surface-high rounded-xl p-4 sm:p-5 shadow-xs">
        <ol
          aria-label={dict.consultation.steps.stepIndicator}
          className="grid grid-cols-3 gap-3 sm:gap-6 items-center"
        >
          {stepsMeta.map((item) => {
            const isActive = step === item.num;
            const isCompleted = step > item.num;
            return (
              <li
                key={item.num}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3.5 ${
                  isActive || isCompleted ? "opacity-100" : "opacity-55"
                }`}
              >
                <span
                  dir="ltr"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-semibold shrink-0 ${
                    isActive
                      ? "bg-primary-container text-on-primary"
                      : isCompleted
                      ? "bg-secondary-container text-primary"
                      : "bg-surface-highest text-on-surface-variant"
                  }`}
                >
                  0{item.num}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="hidden sm:inline text-[10px] font-semibold text-secondary">
                    {dict.consultation.steps.stepIndicator} 0{item.num}
                  </span>
                  <span className="text-[11.5px] sm:text-sm font-medium text-primary leading-snug">
                    {item.title}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="w-full bg-surface-highest h-1 rounded-full mt-4 overflow-hidden">
          <div
            className={`bg-primary-container h-full editorial-fade ${progressWidthClass}`}
          />
        </div>
      </div>

      {/* Stitch 12-Col Form + Auxiliary Dossier Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Main Interactive Multi-Step Form Panel (8 cols) */}
        <div className="lg:col-span-8 bg-surface-lowest border border-surface-high rounded-xl p-6 sm:p-9 lg:p-10 shadow-md">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="space-y-1.5">
                <span
                  dir="ltr"
                  className="inline-block font-en-label text-[10px] font-semibold text-secondary"
                >
                  Step 01 / Purpose
                </span>
                <h2 className="font-editorial text-2xl sm:text-[30px] text-primary">
                  {dict.consultation.step1.requestTypeLabel}
                </h2>
                <p className="text-sm text-on-surface-variant">
                  {dict.consultation.step1.topicsHint}
                </p>
              </div>

              {/* Request Type Cards */}
              <fieldset className="space-y-3">
                <legend className="sr-only">
                  {dict.consultation.step1.requestTypeLabel}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {requestTypeOptions.map((opt) => {
                    const checked = requestType === opt.key;
                    const inputId = `${formUid}-req-${opt.key}`;
                    return (
                      <label
                        key={opt.key}
                        htmlFor={inputId}
                        className={`editorial-fade cursor-pointer p-4 rounded-lg border flex flex-col justify-between gap-2.5 ${
                          checked
                            ? "bg-secondary-container/75 border-secondary text-primary shadow-xs"
                            : "bg-surface-low border-surface-high hover:bg-surface-container"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <StitchIcon
                            name={requestTypeIconMap[opt.key]}
                            size={19}
                            className={
                              checked ? "text-primary" : "text-secondary"
                            }
                          />
                          <input
                            id={inputId}
                            type="radio"
                            name="requestType"
                            value={opt.key}
                            checked={checked}
                            onChange={() => {
                              setRequestType(opt.key);
                              setStep1Errors((e) => ({
                                ...e,
                                requestType: undefined,
                              }));
                            }}
                            className="h-4 w-4 accent-[#392C25]"
                          />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-primary block">
                            {opt.label[locale]}
                          </span>
                          {opt.hint && (
                            <span className="text-xs text-on-surface-variant mt-1 block leading-relaxed">
                              {opt.hint[locale]}
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
                {step1Errors.requestType && (
                  <p role="alert" className="text-xs text-error font-medium">
                    {step1Errors.requestType}
                  </p>
                )}
              </fieldset>

              {/* Multi-Select Consultation Topics */}
              <fieldset className="space-y-3.5 pt-2">
                <legend className="text-sm sm:text-base font-semibold text-primary">
                  {dict.consultation.step1.topicsLabel}
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consultationTopicOptions.map((topic) => {
                    const selected = selectedTopics.includes(topic.key);
                    const checkboxId = `${formUid}-topic-${topic.key}`;
                    return (
                      <label
                        key={topic.key}
                        htmlFor={checkboxId}
                        className={`editorial-fade cursor-pointer flex items-center gap-3 p-3.5 rounded-lg border ${
                          selected
                            ? "bg-secondary-container/60 border-secondary text-primary font-medium"
                            : "bg-surface-low border-surface-high text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleTopic(topic.key)}
                          className="h-4 w-4 accent-[#392C25] rounded shrink-0"
                        />
                        <span className="text-sm">{topic.label[locale]}</span>
                      </label>
                    );
                  })}
                </div>

                {step1Errors.topics && (
                  <p role="alert" className="text-xs text-error font-medium">
                    {step1Errors.topics}
                  </p>
                )}

                <div className="flex items-start gap-2.5 bg-surface-container p-4 rounded-lg text-xs text-on-surface-variant leading-relaxed">
                  <StitchIcon
                    name="info"
                    size={17}
                    className="text-secondary shrink-0 mt-0.5"
                  />
                  <p>{dict.consultation.step1.routingDisclaimer}</p>
                </div>
              </fieldset>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleContinueFromStep1}
                  className="editorial-fade w-full sm:w-auto h-12 px-8 bg-primary-container text-on-primary text-xs font-medium rounded inline-flex items-center justify-center gap-2 hover:bg-primary-hover shadow-xs"
                >
                  <span>{dict.consultation.step1.nextButton}</span>
                  <StitchIcon name={dirArrow} size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <span
                  dir="ltr"
                  className="inline-block font-en-label text-[10px] font-semibold text-secondary"
                >
                  Step 02 / Coordinator Info
                </span>
                <h2 className="font-editorial text-2xl sm:text-[30px] text-primary">
                  {dict.consultation.steps.step2}
                </h2>
              </div>

              {/* Sensitive Medical Data Advisory Banner */}
              <div
                id={`${formUid}-sensitive-advisory`}
                className="flex items-start gap-3 bg-tertiary-fixed/75 border border-outline-variant p-4 rounded-lg text-xs sm:text-[13px] text-primary leading-relaxed"
              >
                <StitchIcon
                  name="lock"
                  size={17}
                  className="text-secondary shrink-0 mt-0.5"
                />
                <p>{dict.consultation.step2.sensitiveWarning}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name (Required) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`${formUid}-name`}
                    className="text-xs sm:text-sm font-medium text-primary flex items-center justify-between"
                  >
                    <span>
                      {dict.consultation.step2.nameLabel}{" "}
                      <span className="text-error" aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>
                  <input
                    id={`${formUid}-name`}
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (step2Errors.name) {
                        setStep2Errors((prev) => ({
                          ...prev,
                          name: undefined,
                        }));
                      }
                    }}
                    placeholder={dict.consultation.step2.namePlaceholder}
                    aria-invalid={Boolean(step2Errors.name)}
                    aria-describedby={
                      step2Errors.name ? `${formUid}-name-err` : undefined
                    }
                    className="w-full h-12 px-4 rounded bg-surface-low border border-surface-high focus:bg-surface-lowest focus:border-primary text-sm text-on-surface outline-none"
                  />
                  {step2Errors.name && (
                    <p
                      id={`${formUid}-name-err`}
                      role="alert"
                      className="text-xs text-error font-medium"
                    >
                      {step2Errors.name}
                    </p>
                  )}
                </div>

                {/* Contact Number (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`${formUid}-phone`}
                      className="text-xs sm:text-sm font-medium text-primary"
                    >
                      {dict.consultation.step2.phoneLabel}
                    </label>
                    <span className="text-[11px] text-secondary">
                      {dict.consultation.step2.phoneOptionalTag}
                    </span>
                  </div>
                  <input
                    id={`${formUid}-phone`}
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={dict.consultation.step2.phonePlaceholder}
                    className="w-full h-12 px-4 rounded bg-surface-low border border-surface-high focus:bg-surface-lowest focus:border-primary text-sm text-on-surface outline-none text-start"
                  />
                  <p className="text-[11.5px] text-outline">
                    {dict.consultation.step2.phoneHint}
                  </p>
                </div>

                {/* Preferred Language */}
                <fieldset className="space-y-1.5">
                  <legend className="text-xs sm:text-sm font-medium text-primary">
                    {dict.consultation.step2.languageLabel}
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5 h-12">
                    {(["ar", "en"] as const).map((langOpt) => {
                      const active = preferredLanguage === langOpt;
                      const radioId = `${formUid}-pref-lang-${langOpt}`;
                      return (
                        <label
                          key={langOpt}
                          htmlFor={radioId}
                          className={`editorial-fade cursor-pointer h-full rounded border flex items-center justify-center gap-2 text-xs sm:text-sm ${
                            active
                              ? "bg-secondary-container/75 border-secondary text-primary font-semibold"
                              : "bg-surface-low border-surface-high text-on-surface-variant hover:bg-surface-container"
                          }`}
                        >
                          <input
                            id={radioId}
                            type="radio"
                            name="preferredLanguage"
                            value={langOpt}
                            checked={active}
                            onChange={() => setPreferredLanguage(langOpt)}
                            className="sr-only"
                          />
                          <span>
                            {langOpt === "ar"
                              ? dict.consultation.step2.languageAr
                              : dict.consultation.step2.languageEn}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Preferred Contact Window */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`${formUid}-time`}
                      className="text-xs sm:text-sm font-medium text-primary"
                    >
                      {dict.consultation.step2.timeLabel}
                    </label>
                    <span className="text-[11px] text-secondary">
                      {dict.consultation.step2.timeOptionalTag}
                    </span>
                  </div>
                  <select
                    id={`${formUid}-time`}
                    value={preferredTime}
                    onChange={(e) =>
                      setPreferredTime(e.target.value as PreferredTimeKey | "")
                    }
                    className="w-full h-12 px-4 rounded bg-surface-low border border-surface-high focus:bg-surface-lowest focus:border-primary text-sm text-on-surface outline-none"
                  >
                    <option value="">{dict.consultation.step2.timeNone}</option>
                    {preferredTimeOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label[locale]}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11.5px] text-outline">
                    {dict.consultation.step2.timeHint}
                  </p>
                </div>
              </div>

              {/* Short Note (Optional, max 300 chars) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`${formUid}-note`}
                    className="text-xs sm:text-sm font-medium text-primary"
                  >
                    {dict.consultation.step2.noteLabel}
                  </label>
                  <span className="text-xs text-secondary" dir="ltr">
                    {shortNote.length} / 300
                  </span>
                </div>
                <textarea
                  id={`${formUid}-note`}
                  rows={3}
                  maxLength={300}
                  value={shortNote}
                  onChange={(e) => setShortNote(e.target.value)}
                  placeholder={dict.consultation.step2.notePlaceholder}
                  aria-describedby={`${formUid}-sensitive-advisory`}
                  className="w-full p-4 rounded bg-surface-low border border-surface-high focus:bg-surface-lowest focus:border-primary text-sm text-on-surface outline-none resize-y"
                />
                {step2Errors.note && (
                  <p role="alert" className="text-xs text-error font-medium">
                    {step2Errors.note}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="editorial-fade h-12 px-6 bg-surface-container text-primary text-xs font-medium rounded inline-flex items-center justify-center gap-2 hover:bg-surface-high"
                >
                  <StitchIcon name={backArrow} size={15} />
                  <span>{dict.consultation.step2.backButton}</span>
                </button>
                <button
                  type="button"
                  onClick={handleContinueFromStep2}
                  className="editorial-fade h-12 px-8 bg-primary-container text-on-primary text-xs font-medium rounded inline-flex items-center justify-center gap-2 hover:bg-primary-hover shadow-xs"
                >
                  <span>{dict.consultation.step2.nextButton}</span>
                  <StitchIcon name={dirArrow} size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <span
                  dir="ltr"
                  className="inline-block font-en-label text-[10px] font-semibold text-secondary"
                >
                  Step 03 / Review &amp; WhatsApp Handoff
                </span>
                <h2 className="font-editorial text-2xl sm:text-[30px] text-primary">
                  {dict.consultation.step3.summaryHeading}
                </h2>
              </div>

              {/* Editable Summary Card */}
              <div className="bg-surface-low border border-surface-high p-5 sm:p-6 rounded-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-high pb-3 text-xs">
                  <span className="font-semibold text-secondary">
                    {dict.consultation.steps.step3}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-primary underline underline-offset-4 hover:text-secondary"
                    >
                      {dict.consultation.step3.editStep1}
                    </button>
                    <span className="text-outline-variant">|</span>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-primary underline underline-offset-4 hover:text-secondary"
                    >
                      {dict.consultation.step3.editStep2}
                    </button>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                  <div>
                    <dt className="text-secondary text-xs">
                      {dict.consultation.whatsappTemplate.name}
                    </dt>
                    <dd className="text-primary font-semibold mt-0.5">
                      {fullName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-secondary text-xs">
                      {dict.consultation.whatsappTemplate.requestType}
                    </dt>
                    <dd className="text-primary font-semibold mt-0.5">
                      {requestTypeLabel}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-secondary text-xs">
                      {dict.consultation.whatsappTemplate.topics}
                    </dt>
                    <dd className="text-primary font-semibold mt-0.5">
                      {selectedTopicLabels}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-secondary text-xs">
                      {dict.consultation.whatsappTemplate.language}
                    </dt>
                    <dd className="text-primary mt-0.5">
                      {preferredLanguageLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-secondary text-xs">
                      {dict.consultation.whatsappTemplate.preferredTime}
                    </dt>
                    <dd className="text-primary mt-0.5">
                      {preferredTimeLabel ||
                        dict.consultation.step3.notProvided}
                    </dd>
                  </div>
                  {phoneNumber.trim() && (
                    <div>
                      <dt className="text-secondary text-xs">
                        {dict.consultation.step2.phoneLabel}
                      </dt>
                      <dd className="text-primary mt-0.5">
                        <span dir="ltr">{phoneNumber.trim()}</span>
                      </dd>
                    </div>
                  )}
                  {shortNote.trim() && (
                    <div className="sm:col-span-2">
                      <dt className="text-secondary text-xs">
                        {dict.consultation.whatsappTemplate.notes}
                      </dt>
                      <dd className="text-primary mt-0.5 whitespace-pre-wrap">
                        {shortNote.trim()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Live WhatsApp Message Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-medium text-primary inline-flex items-center gap-2">
                    <StitchIcon
                      name="chat"
                      size={16}
                      className="text-secondary"
                    />
                    <span>{dict.consultation.step3.previewHeading}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="editorial-fade inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary border border-surface-high bg-surface-low px-3 py-1.5 rounded"
                  >
                    <StitchIcon name="copy" size={14} />
                    <span>
                      {copied
                        ? dict.consultation.step3.copiedMessage
                        : dict.consultation.step3.copyMessage}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-outline">
                  {dict.consultation.step3.previewHint}
                </p>

                <pre className="w-full bg-surface-container border border-surface-high p-4 rounded-lg font-sans text-xs sm:text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
                  {composedMessage}
                </pre>
              </div>

              {/* Explicit Unchecked-by-Default Consent */}
              <div className="space-y-2">
                <label
                  htmlFor={`${formUid}-consent`}
                  className="cursor-pointer flex items-start gap-3 p-4 rounded-lg bg-surface-low border border-surface-high hover:bg-surface-container editorial-fade"
                >
                  <input
                    id={`${formUid}-consent`}
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => {
                      setConsentChecked(e.target.checked);
                      if (e.target.checked) setConsentError(undefined);
                    }}
                    className="w-4 h-4 accent-[#392C25] rounded mt-1 shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-on-surface leading-relaxed">
                    {dict.consultation.step3.consentLabel}{" "}
                    <span aria-hidden="true">·</span>{" "}
                    <Link
                      href={`/${locale}/privacy`}
                      className="underline underline-offset-4 text-secondary hover:text-primary"
                    >
                      {dict.consultation.step3.privacyLinkText}
                    </Link>
                  </span>
                </label>

                {consentError && (
                  <p role="alert" className="text-xs text-error font-medium">
                    {consentError}
                  </p>
                )}
              </div>

              {/* Post-Click Honest Reminder */}
              {whatsappOpened && (
                <div
                  role="status"
                  className="p-4 rounded-lg bg-tertiary-fixed/75 border-s-2 border-primary-container text-xs sm:text-sm text-primary leading-relaxed"
                >
                  {dict.consultation.step3.openedReminder}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="editorial-fade h-12 px-6 bg-surface-container text-primary text-xs font-medium rounded inline-flex items-center justify-center gap-2 hover:bg-surface-high"
                  >
                    <StitchIcon name={backArrow} size={15} />
                    <span>{dict.consultation.step3.backButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleContinueOnWhatsapp}
                    className="editorial-fade h-12 px-8 bg-primary-container text-on-primary text-xs font-medium rounded inline-flex items-center justify-center gap-2.5 hover:bg-primary-hover shadow-md"
                  >
                    <StitchIcon name="send" size={16} />
                    <span>{dict.consultation.step3.submitWhatsapp}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-surface-high flex flex-wrap items-center justify-between gap-3 text-xs text-outline">
                  <span>{dict.consultation.coordinationNotice}</span>
                  <a
                    href={doctorProfile.contact.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary underline underline-offset-4 hover:text-secondary font-medium"
                  >
                    <span>
                      {dict.consultation.step3.directWhatsappFallback}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span dir="ltr">
                      {doctorProfile.contact.whatsappDisplay}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stitch Auxiliary Sidebar (4 cols — Verified Facts Only) */}
        <aside className="lg:col-span-4 flex flex-col gap-5">
          {/* Doctor Dossier Snapshot Card */}
          <div className="bg-surface-lowest border border-surface-high p-6 rounded-xl shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container shrink-0 border border-surface-high">
                <Image
                  src={doctorProfile.portraits.hero.src}
                  alt={doctorProfile.portraits.hero.alt[locale]}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-xl text-primary">
                  {doctorProfile.shortSignature[locale]}
                </span>
                <span className="text-xs font-medium text-secondary">
                  {doctorProfile.title[locale]}
                </span>
                <span className="text-[11px] text-outline mt-0.5">
                  {doctorProfile.city[locale]}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
              {doctorProfile.specializationSummary[locale]}
            </p>

            <div className="w-full bg-surface-low border border-surface-high/70 p-3.5 rounded-lg flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-secondary">
                  {dict.about.coordinationLabel}:
                </span>
                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-secondary underline underline-offset-4"
                >
                  <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">
                  {dict.about.locationLabel}:
                </span>
                <span className="text-primary font-medium">
                  {doctorProfile.cityShort[locale]}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Coordination Principles Card */}
          <div className="bg-surface-low border border-surface-high p-6 rounded-xl shadow-xs flex flex-col gap-4">
            <span className="editorial-kicker">
              {locale === "ar"
                ? "مبادئ التنسيق والخصوصية"
                : "Coordination & Privacy Principles"}
            </span>
            {sidebarPrinciples.map((p) => (
              <div key={p.num} className="flex items-start gap-3">
                <span
                  dir="ltr"
                  className="w-6 h-6 rounded-full bg-surface-highest text-secondary flex items-center justify-center text-[11px] font-semibold shrink-0 mt-0.5"
                >
                  {p.num}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-primary">
                    {p.title}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                    {p.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Calm Editorial Environment Visual Card */}
          <div className="rounded-xl overflow-hidden shadow-xs relative h-44 bg-surface-container border border-surface-high">
            <Image
              src={doctorProfile.editorialStillLife.linen.src}
              alt={doctorProfile.editorialStillLife.linen.alt[locale]}
              width={doctorProfile.editorialStillLife.linen.width}
              height={doctorProfile.editorialStillLife.linen.height}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/15 to-transparent p-4 flex flex-col justify-end text-on-primary">
              <span className="text-[10px] font-semibold opacity-90">
                {doctorProfile.cityShort[locale]}
              </span>
              <span className="font-editorial text-lg">
                {locale === "ar"
                  ? "هدوء، خصوصية، وعناية متخصصة"
                  : "Calm, discreet dermatological care"}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
