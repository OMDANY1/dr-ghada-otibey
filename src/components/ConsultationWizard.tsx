"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
import { BrandLogo } from "@/components/BrandLogo";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface ConsultationWizardProps {
  locale: Locale;
  dict: Dictionary;
}

type StepNumber = 1 | 2 | 3;

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
  const reduced = useReducedMotion();
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
  const [focusedField, setFocusedField] = useState<
    "name" | "phone" | "note" | null
  >(null);

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

  const progressScale = step === 1 ? 0.333 : step === 2 ? 0.666 : 1;

  return (
    <div className="space-y-12">
      {/* Editorial Hairline Step Indicator */}
      <div className="w-full pb-6 border-b border-copper-500/20 relative">
        <ol
          aria-label={dict.consultation.steps.stepIndicator}
          className="grid grid-cols-3 gap-2 sm:gap-8 items-baseline"
        >
          {stepsMeta.map((item) => {
            const isActive = step === item.num;
            const isCompleted = step > item.num;
            return (
              <li
                key={item.num}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 transition-opacity duration-300 ${
                  isActive || isCompleted ? "opacity-100" : "opacity-45"
                }`}
              >
                <span
                  dir="ltr"
                  className={`font-latin-italic text-xl sm:text-2xl ${
                    isActive ? "text-copper-700" : "text-secondary"
                  }`}
                >
                  0{item.num}
                </span>
                <span
                  className={`text-[11.5px] sm:text-sm leading-snug ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-on-surface-variant"
                  }`}
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Animated Copper Hairline Progress */}
        <motion.span
          aria-hidden="true"
          animate={{ scaleX: progressScale }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute inset-x-0 -bottom-px h-[1.5px] bg-gradient-to-r from-copper-300 via-copper-500 to-copper-700 rtl:origin-right ltr:origin-left"
        />
      </div>

      {/* Asymmetric 8 / 4 Split Editorial Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
        {/* Main Interactive Multi-Step Form (8 cols) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait" initial={false}>
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="space-y-10"
              >
                {/* Request Type */}
                <fieldset className="space-y-5">
                  <legend className="font-editorial text-2xl sm:text-3xl text-primary">
                    {dict.consultation.step1.requestTypeLabel}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    {requestTypeOptions.map((opt) => {
                      const checked = requestType === opt.key;
                      const inputId = `${formUid}-req-${opt.key}`;
                      return (
                        <label
                          key={opt.key}
                          htmlFor={inputId}
                          className={`cursor-pointer p-5 rounded-2xl border transition-colors duration-300 flex flex-col justify-between gap-2 ${
                            checked
                              ? "border-copper-500 bg-surface-lowest"
                              : "border-surface-high bg-transparent hover:border-copper-500/45"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-editorial text-lg text-primary">
                              {opt.label[locale]}
                            </span>
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
                          {opt.hint && (
                            <span className="text-xs text-on-surface-variant leading-relaxed">
                              {opt.hint[locale]}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {step1Errors.requestType && (
                    <p
                      role="alert"
                      className="text-xs text-error font-medium transition-opacity"
                    >
                      {step1Errors.requestType}
                    </p>
                  )}
                </fieldset>

                {/* Multi-Select Consultation Topics (Refined Pill Checkboxes) */}
                <fieldset className="space-y-4">
                  <legend className="font-editorial text-2xl sm:text-3xl text-primary">
                    {dict.consultation.step1.topicsLabel}
                  </legend>
                  <p className="text-sm text-on-surface-variant">
                    {dict.consultation.step1.topicsHint}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {consultationTopicOptions.map((topic) => {
                      const selected = selectedTopics.includes(topic.key);
                      const checkboxId = `${formUid}-topic-${topic.key}`;
                      return (
                        <label
                          key={topic.key}
                          htmlFor={checkboxId}
                          className={`cursor-pointer inline-flex items-center gap-2.5 min-h-[46px] px-5 rounded-full border text-xs sm:text-sm transition-all duration-300 ${
                            selected
                              ? "bg-primary-container text-on-primary border-copper-500"
                              : "bg-surface-lowest text-on-surface border-surface-high hover:border-copper-500/50"
                          }`}
                        >
                          <input
                            id={checkboxId}
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleTopic(topic.key)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full transition-colors ${
                              selected ? "bg-copper-300" : "bg-copper-500/35"
                            }`}
                          />
                          <span>{topic.label[locale]}</span>
                        </label>
                      );
                    })}
                  </div>

                  {step1Errors.topics && (
                    <p role="alert" className="text-xs text-error font-medium">
                      {step1Errors.topics}
                    </p>
                  )}

                  <p className="text-xs text-on-surface-variant border-s border-copper-500/50 ps-4 py-1 leading-relaxed">
                    {dict.consultation.step1.routingDisclaimer}
                  </p>
                </fieldset>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleContinueFromStep1}
                    className="btn-pill-primary w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{dict.consultation.step1.nextButton}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Borderless Bottom-Hairline Floating-Label Fields */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="space-y-9"
              >
                <div className="space-y-1">
                  <span className="editorial-kicker">
                    {dict.consultation.steps.step2}
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
                    {dict.consultation.steps.step2}
                  </h2>
                </div>

                {/* Borderless Floating-Label Name Field */}
                <div className="space-y-2">
                  <div className="relative pt-5">
                    <input
                      id={`${formUid}-name`}
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() =>
                        setFocusedField((prev) =>
                          prev === "name" ? null : prev
                        )
                      }
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (step2Errors.name) {
                          setStep2Errors((prev) => ({
                            ...prev,
                            name: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(step2Errors.name)}
                      aria-describedby={
                        step2Errors.name ? `${formUid}-name-err` : undefined
                      }
                      className="editorial-borderless-field w-full bg-transparent border-0 border-b border-outline-variant py-3 text-base text-primary focus:border-copper-500 transition-colors"
                    />
                    <label
                      htmlFor={`${formUid}-name`}
                      className={`pointer-events-none absolute start-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        focusedField === "name" || fullName.length > 0
                          ? "top-0 text-xs text-copper-700"
                          : "top-7 text-sm text-on-surface-variant"
                      }`}
                    >
                      {dict.consultation.step2.nameLabel}{" "}
                      <span className="text-copper-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-copper-500 rtl:origin-right ltr:origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        focusedField === "name" ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
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

                {/* Borderless Floating-Label Contact Number (Optional, BiDi isolated) */}
                <div className="space-y-2">
                  <div className="relative pt-5">
                    <input
                      id={`${formUid}-phone`}
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      value={phoneNumber}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() =>
                        setFocusedField((prev) =>
                          prev === "phone" ? null : prev
                        )
                      }
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="editorial-borderless-field w-full bg-transparent border-0 border-b border-outline-variant py-3 text-base text-primary focus:border-copper-500 transition-colors text-start"
                    />
                    <label
                      htmlFor={`${formUid}-phone`}
                      className={`pointer-events-none absolute start-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        focusedField === "phone" || phoneNumber.length > 0
                          ? "top-0 text-xs text-copper-700"
                          : "top-7 text-sm text-on-surface-variant"
                      }`}
                    >
                      {dict.consultation.step2.phoneLabel} —{" "}
                      <span className="text-xs text-outline">
                        {dict.consultation.step2.phoneOptionalTag}
                      </span>
                    </label>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-copper-500 rtl:origin-right ltr:origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        focusedField === "phone" ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-outline">
                    {dict.consultation.step2.phoneHint}
                  </p>
                </div>

                {/* Preferred Language & Preferred Contact Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                  <fieldset className="space-y-3">
                    <legend className="text-xs text-copper-700">
                      {dict.consultation.step2.languageLabel}
                    </legend>
                    <div className="flex items-center gap-3">
                      {(["ar", "en"] as const).map((langOpt) => {
                        const active = preferredLanguage === langOpt;
                        const radioId = `${formUid}-pref-lang-${langOpt}`;
                        return (
                          <label
                            key={langOpt}
                            htmlFor={radioId}
                            className={`cursor-pointer min-h-[44px] px-5 rounded-full border inline-flex items-center justify-center text-xs sm:text-sm transition-colors ${
                              active
                                ? "bg-primary-container text-on-primary border-copper-500"
                                : "bg-transparent border-surface-high text-on-surface-variant hover:border-copper-500/50"
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-copper-700">
                      <label htmlFor={`${formUid}-time`}>
                        {dict.consultation.step2.timeLabel}
                      </label>
                      <span className="text-outline">
                        {dict.consultation.step2.timeOptionalTag}
                      </span>
                    </div>
                    <select
                      id={`${formUid}-time`}
                      value={preferredTime}
                      onChange={(e) =>
                        setPreferredTime(e.target.value as PreferredTimeKey | "")
                      }
                      className="editorial-borderless-field w-full bg-transparent border-0 border-b border-outline-variant py-2.5 text-sm text-primary focus:border-copper-500"
                    >
                      <option value="">
                        {dict.consultation.step2.timeNone}
                      </option>
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

                {/* Borderless Bottom-Hairline Short Note + Sensitive Advisory */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor={`${formUid}-note`}
                      className="text-copper-700"
                    >
                      {dict.consultation.step2.noteLabel} —{" "}
                      <span className="text-outline">
                        {dict.consultation.step2.noteOptionalTag}
                      </span>
                    </label>
                    <span dir="ltr" className="text-outline">
                      {shortNote.length} / 300
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      id={`${formUid}-note`}
                      rows={3}
                      maxLength={300}
                      value={shortNote}
                      onFocus={() => setFocusedField("note")}
                      onBlur={() =>
                        setFocusedField((prev) =>
                          prev === "note" ? null : prev
                        )
                      }
                      onChange={(e) => setShortNote(e.target.value)}
                      placeholder={dict.consultation.step2.notePlaceholder}
                      aria-describedby={`${formUid}-sensitive-advisory`}
                      className="editorial-borderless-field w-full bg-transparent border-0 border-b border-outline-variant py-2.5 text-sm text-primary focus:border-copper-500 resize-y placeholder:text-outline/70"
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-copper-500 rtl:origin-right ltr:origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        focusedField === "note" ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>

                  <p
                    id={`${formUid}-sensitive-advisory`}
                    className="text-xs text-on-surface-variant border-s border-copper-500/50 ps-3.5 py-1 leading-relaxed"
                  >
                    {dict.consultation.step2.sensitiveWarning}
                  </p>

                  {step2Errors.note && (
                    <p role="alert" className="text-xs text-error font-medium">
                      {step2Errors.note}
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-pill-secondary text-xs sm:text-sm cursor-pointer"
                  >
                    <StitchIcon name={backArrow} size={15} />
                    <span>{dict.consultation.step2.backButton}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueFromStep2}
                    className="btn-pill-primary text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{dict.consultation.step2.nextButton}</span>
                    <StitchIcon name={dirArrow} size={15} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Summary, Preview & Unchecked Consent */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="space-y-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-copper-500/20 pb-4">
                  <h2 className="font-editorial text-2xl sm:text-3xl text-primary">
                    {dict.consultation.step3.summaryHeading}
                  </h2>
                  <div className="flex items-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="copper-link text-primary cursor-pointer"
                    >
                      {dict.consultation.step3.editStep1}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="copper-link text-primary cursor-pointer"
                    >
                      {dict.consultation.step3.editStep2}
                    </button>
                  </div>
                </div>

                {/* Clean Hairline Summary List */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2 text-sm">
                  <div>
                    <dt className="text-xs text-copper-700">
                      {dict.consultation.whatsappTemplate.name}
                    </dt>
                    <dd className="font-editorial text-xl text-primary mt-0.5">
                      {fullName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-copper-700">
                      {dict.consultation.whatsappTemplate.requestType}
                    </dt>
                    <dd className="font-editorial text-xl text-primary mt-0.5">
                      {requestTypeLabel}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-copper-700">
                      {dict.consultation.whatsappTemplate.topics}
                    </dt>
                    <dd className="text-primary font-normal mt-1">
                      {selectedTopicLabels}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-copper-700">
                      {dict.consultation.whatsappTemplate.language}
                    </dt>
                    <dd className="text-primary mt-0.5">
                      {preferredLanguageLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-copper-700">
                      {dict.consultation.whatsappTemplate.preferredTime}
                    </dt>
                    <dd className="text-primary mt-0.5">
                      {preferredTimeLabel ||
                        dict.consultation.step3.notProvided}
                    </dd>
                  </div>
                  {phoneNumber.trim() && (
                    <div>
                      <dt className="text-xs text-copper-700">
                        {dict.consultation.step2.phoneLabel}
                      </dt>
                      <dd className="text-primary mt-0.5">
                        <span dir="ltr">{phoneNumber.trim()}</span>
                      </dd>
                    </div>
                  )}
                  {shortNote.trim() && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-copper-700">
                        {dict.consultation.whatsappTemplate.notes}
                      </dt>
                      <dd className="text-primary mt-1 whitespace-pre-wrap">
                        {shortNote.trim()}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Live WhatsApp Message Preview */}
                <div className="space-y-3 pt-4 border-t border-copper-500/20">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm text-primary font-medium">
                      {dict.consultation.step3.previewHeading}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 text-xs text-copper-700 hover:text-primary border border-copper-500/35 px-3.5 py-1.5 rounded-full cursor-pointer"
                    >
                      <StitchIcon name="copy" size={13} />
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
                  <pre className="w-full bg-surface-low/80 border border-copper-500/20 p-5 rounded-2xl font-sans text-xs sm:text-sm text-primary whitespace-pre-wrap leading-[1.85]">
                    {composedMessage}
                  </pre>
                </div>

                {/* Unchecked-by-default Explicit Consent */}
                <div className="space-y-2">
                  <label
                    htmlFor={`${formUid}-consent`}
                    className="cursor-pointer flex items-start gap-3 p-4 rounded-2xl border border-copper-500/30 bg-surface-lowest"
                  >
                    <input
                      id={`${formUid}-consent`}
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => {
                        setConsentChecked(e.target.checked);
                        if (e.target.checked) setConsentError(undefined);
                      }}
                      className="w-4 h-4 accent-[#392C25] mt-1 shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-on-surface leading-relaxed">
                      {dict.consultation.step3.consentLabel}{" "}
                      <span aria-hidden="true">·</span>{" "}
                      <Link
                        href={`/${locale}/privacy`}
                        className="underline underline-offset-4 text-copper-700 hover:text-primary"
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
                    className="p-4 border-s-2 border-copper-500 bg-surface-low text-xs sm:text-sm text-primary leading-relaxed rounded-e-xl"
                  >
                    {dict.consultation.step3.openedReminder}
                  </div>
                )}

                <div className="space-y-5 pt-2">
                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-pill-secondary text-xs sm:text-sm cursor-pointer"
                    >
                      <StitchIcon name={backArrow} size={15} />
                      <span>{dict.consultation.step3.backButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleContinueOnWhatsapp}
                      className="btn-pill-primary text-xs sm:text-sm cursor-pointer"
                    >
                      <StitchIcon name="send" size={15} />
                      <span>{dict.consultation.step3.submitWhatsapp}</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-copper-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-outline">
                    <span>{dict.consultation.coordinationNotice}</span>
                    <a
                      href={doctorProfile.contact.whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="copper-link text-primary hover:text-copper-700"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quiet Editorial Doctor & Privacy Aside (4 cols) */}
        <aside className="lg:col-span-4 lg:ps-8 lg:border-s border-copper-500/20 space-y-8">
          <div className="space-y-5">
            <BrandLogo
              variant="full"
              className="w-28 h-auto text-[#a58f77]"
            />
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded-t-full rounded-b-xl overflow-hidden border border-copper-500/40 bg-surface-low shrink-0">
                <Image
                  src={doctorProfile.portraits.hero.src}
                  alt={doctorProfile.portraits.hero.alt[locale]}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-editorial text-2xl text-primary">
                  {doctorProfile.shortSignature[locale]}
                </p>
                <p className="text-xs text-copper-700">
                  {doctorProfile.title[locale]} ·{" "}
                  {doctorProfile.cityShort[locale]}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-[1.85]">
              {doctorProfile.specializationSummary[locale]}
            </p>
          </div>

          <div className="pt-6 border-t border-copper-500/20 space-y-3 text-xs">
            <span className="editorial-kicker">
              {dict.about.coordinationLabel}
            </span>
            <p>
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-editorial text-2xl text-primary hover:text-copper-700"
              >
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              {dict.consultation.coordinationNotice}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
