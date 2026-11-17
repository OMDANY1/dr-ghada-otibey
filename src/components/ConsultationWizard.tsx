"use client";

import { useId, useMemo, useState } from "react";
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

  // Step 2 state (kept strictly in component memory — never persisted to localStorage or DB)
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

  // Resolve localized labels for summary & WhatsApp message
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

  // Construct clean WhatsApp message in UI language, omitting empty optional lines
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
      // Fallback copy if clipboard API restricted
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

  return (
    <div className="bg-canvas border border-hairline rounded-[4px] p-6 sm:p-9 lg:p-12">
      {/* Progress Indicator */}
      <ol
        aria-label={dict.consultation.steps.stepIndicator}
        className="grid grid-cols-3 gap-3 sm:gap-6 pb-8 mb-8 border-b border-hairline"
      >
        {stepsMeta.map((item) => {
          const isActive = step === item.num;
          const isCompleted = step > item.num;
          return (
            <li key={item.num} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full border ${
                    isActive
                      ? "bg-espresso text-canvas border-espresso"
                      : isCompleted
                      ? "bg-sand text-espresso border-sand"
                      : "bg-warm text-ink-muted border-hairline"
                  }`}
                >
                  <span dir="ltr">0{item.num}</span>
                </span>
                <span
                  className={`text-xs sm:text-sm ${
                    isActive
                      ? "text-espresso font-medium"
                      : isCompleted
                      ? "text-espresso"
                      : "text-ink-muted"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <div
                className={`h-[2px] w-full ${
                  isActive || isCompleted ? "bg-espresso" : "bg-hairline"
                }`}
                aria-hidden="true"
              />
            </li>
          );
        })}
      </ol>

      {/* STEP 1: Reason & Multi-Select Consultation Topics */}
      {step === 1 && (
        <div className="space-y-9">
          {/* Request Type */}
          <fieldset className="space-y-4">
            <legend className="font-editorial text-xl sm:text-2xl text-espresso mb-2">
              {dict.consultation.step1.requestTypeLabel}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {requestTypeOptions.map((opt) => {
                const checked = requestType === opt.key;
                const inputId = `${formUid}-req-${opt.key}`;
                return (
                  <label
                    key={opt.key}
                    htmlFor={inputId}
                    className={`editorial-fade cursor-pointer flex flex-col justify-between p-4 border rounded-[3px] ${
                      checked
                        ? "border-espresso bg-warm"
                        : "border-hairline bg-canvas hover:border-taupe"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm sm:text-base font-medium text-espresso">
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
                        className="mt-1 h-4 w-4 accent-[#392C25]"
                      />
                    </div>
                    {opt.hint && (
                      <span className="text-xs text-ink-muted mt-2 leading-relaxed">
                        {opt.hint[locale]}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {step1Errors.requestType && (
              <p role="alert" className="text-xs text-[#8a2c2c] font-medium">
                {step1Errors.requestType}
              </p>
            )}
          </fieldset>

          {/* Multi-Select Consultation Topics */}
          <fieldset className="space-y-4">
            <legend className="font-editorial text-xl sm:text-2xl text-espresso">
              {dict.consultation.step1.topicsLabel}
            </legend>
            <p className="text-xs sm:text-sm text-ink-soft">
              {dict.consultation.step1.topicsHint}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {consultationTopicOptions.map((topic) => {
                const selected = selectedTopics.includes(topic.key);
                const checkboxId = `${formUid}-topic-${topic.key}`;
                return (
                  <label
                    key={topic.key}
                    htmlFor={checkboxId}
                    className={`editorial-fade cursor-pointer flex items-center justify-between gap-3 px-4 py-3.5 border rounded-[3px] ${
                      selected
                        ? "border-espresso bg-warm text-espresso font-medium"
                        : "border-hairline bg-canvas text-ink-soft hover:border-taupe hover:text-espresso"
                    }`}
                  >
                    <span className="text-sm">{topic.label[locale]}</span>
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleTopic(topic.key)}
                      className="h-4 w-4 accent-[#392C25] shrink-0"
                    />
                  </label>
                );
              })}
            </div>

            {step1Errors.topics && (
              <p role="alert" className="text-xs text-[#8a2c2c] font-medium">
                {step1Errors.topics}
              </p>
            )}

            <p className="text-xs text-ink-muted bg-warm border-s-2 border-taupe px-4 py-3 leading-relaxed">
              {dict.consultation.step1.routingDisclaimer}
            </p>
          </fieldset>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleContinueFromStep1}
              className="editorial-fade w-full sm:w-auto bg-espresso text-canvas hover:bg-[#2a201b] px-7 py-3.5 text-sm font-medium rounded-[3px]"
            >
              {dict.consultation.step1.nextButton}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Brief Contact Details */}
      {step === 2 && (
        <div className="space-y-7">
          {/* Name (Required) */}
          <div className="space-y-2">
            <label
              htmlFor={`${formUid}-name`}
              className="block text-sm font-medium text-espresso"
            >
              {dict.consultation.step2.nameLabel}{" "}
              <span className="text-taupe" aria-hidden="true">
                *
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
                  setStep2Errors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              placeholder={dict.consultation.step2.namePlaceholder}
              aria-invalid={Boolean(step2Errors.name)}
              aria-describedby={
                step2Errors.name ? `${formUid}-name-err` : undefined
              }
              className="w-full border border-hairline focus:border-espresso bg-canvas px-4 py-3 text-sm text-espresso rounded-[3px]"
            />
            {step2Errors.name && (
              <p
                id={`${formUid}-name-err`}
                role="alert"
                className="text-xs text-[#8a2c2c] font-medium"
              >
                {step2Errors.name}
              </p>
            )}
          </div>

          {/* Contact Number (Optional, BiDi isolated) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor={`${formUid}-phone`}
                className="text-sm font-medium text-espresso"
              >
                {dict.consultation.step2.phoneLabel}
              </label>
              <span className="text-xs text-taupe">
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
              className="w-full border border-hairline focus:border-espresso bg-canvas px-4 py-3 text-sm text-espresso rounded-[3px] text-start"
            />
            <p className="text-xs text-ink-muted">
              {dict.consultation.step2.phoneHint}
            </p>
          </div>

          {/* Preferred Language & Preferred Contact Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-espresso">
                {dict.consultation.step2.languageLabel}
              </legend>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {(["ar", "en"] as const).map((langOpt) => {
                  const active = preferredLanguage === langOpt;
                  const radioId = `${formUid}-pref-lang-${langOpt}`;
                  return (
                    <label
                      key={langOpt}
                      htmlFor={radioId}
                      className={`editorial-fade cursor-pointer flex items-center justify-between px-4 py-2.5 border rounded-[3px] text-sm ${
                        active
                          ? "border-espresso bg-warm text-espresso font-medium"
                          : "border-hairline bg-canvas text-ink-soft hover:border-taupe"
                      }`}
                    >
                      <span>
                        {langOpt === "ar"
                          ? dict.consultation.step2.languageAr
                          : dict.consultation.step2.languageEn}
                      </span>
                      <input
                        id={radioId}
                        type="radio"
                        name="preferredLanguage"
                        value={langOpt}
                        checked={active}
                        onChange={() => setPreferredLanguage(langOpt)}
                        className="h-4 w-4 accent-[#392C25]"
                      />
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor={`${formUid}-time`}
                  className="text-sm font-medium text-espresso"
                >
                  {dict.consultation.step2.timeLabel}
                </label>
                <span className="text-xs text-taupe">
                  {dict.consultation.step2.timeOptionalTag}
                </span>
              </div>
              <select
                id={`${formUid}-time`}
                value={preferredTime}
                onChange={(e) =>
                  setPreferredTime(e.target.value as PreferredTimeKey | "")
                }
                className="w-full border border-hairline focus:border-espresso bg-canvas px-4 py-2.5 text-sm text-espresso rounded-[3px]"
              >
                <option value="">{dict.consultation.step2.timeNone}</option>
                {preferredTimeOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label[locale]}
                  </option>
                ))}
              </select>
              <p className="text-xs text-ink-muted">
                {dict.consultation.step2.timeHint}
              </p>
            </div>
          </div>

          {/* Short Note (Optional, max 300 chars + Sensitive Medical Data Advisory) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor={`${formUid}-note`}
                className="text-sm font-medium text-espresso"
              >
                {dict.consultation.step2.noteLabel}
              </label>
              <span className="text-xs text-taupe" dir="ltr">
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
              className="w-full border border-hairline focus:border-espresso bg-canvas px-4 py-3 text-sm text-espresso rounded-[3px] resize-y"
            />

            <p
              id={`${formUid}-sensitive-advisory`}
              className="text-xs text-espresso bg-warm border border-sand px-3.5 py-2.5 rounded-[3px]"
            >
              {dict.consultation.step2.sensitiveWarning}
            </p>

            {step2Errors.note && (
              <p role="alert" className="text-xs text-[#8a2c2c] font-medium">
                {step2Errors.note}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="editorial-fade w-full sm:w-auto border border-hairline hover:border-espresso text-espresso px-6 py-3 text-sm rounded-[3px]"
            >
              {dict.consultation.step2.backButton}
            </button>
            <button
              type="button"
              onClick={handleContinueFromStep2}
              className="editorial-fade w-full sm:w-auto bg-espresso text-canvas hover:bg-[#2a201b] px-7 py-3.5 text-sm font-medium rounded-[3px]"
            >
              {dict.consultation.step2.nextButton}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review Summary, Message Preview & Explicit WhatsApp Consent */}
      {step === 3 && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-editorial text-xl sm:text-2xl text-espresso">
                {dict.consultation.step3.summaryHeading}
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-espresso underline underline-offset-4 hover:text-taupe"
                >
                  {dict.consultation.step3.editStep1}
                </button>
                <span className="text-hairline">|</span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-espresso underline underline-offset-4 hover:text-taupe"
                >
                  {dict.consultation.step3.editStep2}
                </button>
              </div>
            </div>

            {/* Structured Editable Summary */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-warm border border-hairline p-5 rounded-[3px] text-sm">
              <div>
                <dt className="text-xs text-ink-muted">
                  {dict.consultation.whatsappTemplate.name}
                </dt>
                <dd className="text-espresso font-medium mt-0.5">{fullName}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">
                  {dict.consultation.whatsappTemplate.requestType}
                </dt>
                <dd className="text-espresso font-medium mt-0.5">
                  {requestTypeLabel}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-ink-muted">
                  {dict.consultation.whatsappTemplate.topics}
                </dt>
                <dd className="text-espresso font-medium mt-0.5">
                  {selectedTopicLabels}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">
                  {dict.consultation.whatsappTemplate.language}
                </dt>
                <dd className="text-espresso mt-0.5">
                  {preferredLanguageLabel}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">
                  {dict.consultation.whatsappTemplate.preferredTime}
                </dt>
                <dd className="text-espresso mt-0.5">
                  {preferredTimeLabel || dict.consultation.step3.notProvided}
                </dd>
              </div>
              {phoneNumber.trim() && (
                <div>
                  <dt className="text-xs text-ink-muted">
                    {dict.consultation.step2.phoneLabel}
                  </dt>
                  <dd className="text-espresso mt-0.5">
                    <span dir="ltr">{phoneNumber.trim()}</span>
                  </dd>
                </div>
              )}
              {shortNote.trim() && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-ink-muted">
                    {dict.consultation.whatsappTemplate.notes}
                  </dt>
                  <dd className="text-espresso mt-0.5 whitespace-pre-wrap">
                    {shortNote.trim()}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Exact WhatsApp Message Preview */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-medium text-espresso">
                {dict.consultation.step3.previewHeading}
              </h4>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="editorial-fade text-xs border border-hairline hover:border-espresso px-3 py-1.5 rounded-[3px] text-espresso"
              >
                {copied
                  ? dict.consultation.step3.copiedMessage
                  : dict.consultation.step3.copyMessage}
              </button>
            </div>
            <p className="text-xs text-ink-muted">
              {dict.consultation.step3.previewHint}
            </p>
            <pre className="w-full whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed bg-canvas border border-hairline p-4 rounded-[3px] text-espresso">
              {composedMessage}
            </pre>
          </div>

            {/* Unchecked-by-default Consent */}
          <div className="space-y-2 pt-1">
            <label
              htmlFor={`${formUid}-consent`}
              className="cursor-pointer flex items-start gap-3 p-4 border border-hairline bg-warm rounded-[3px]"
            >
              <input
                id={`${formUid}-consent`}
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
                  if (e.target.checked) setConsentError(undefined);
                }}
                className="mt-1 h-4 w-4 accent-[#392C25] shrink-0"
              />
              <span className="text-xs sm:text-sm text-espresso leading-relaxed">
                {dict.consultation.step3.consentLabel}{" "}
                <span aria-hidden="true">·</span>{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="underline underline-offset-4 text-ink-soft hover:text-espresso"
                >
                  {dict.consultation.step3.privacyLinkText}
                </Link>
              </span>
            </label>
            {consentError && (
              <p role="alert" className="text-xs text-[#8a2c2c] font-medium">
                {consentError}
              </p>
            )}
          </div>

          {/* Honest Post-Click Coordination Notice (Never claims booking is confirmed) */}
          {whatsappOpened && (
            <div
              role="status"
              className="p-4 bg-warm border-s-2 border-espresso text-xs sm:text-sm text-espresso leading-relaxed"
            >
              {dict.consultation.step3.openedReminder}
            </div>
          )}

          {/* Primary WhatsApp Action + Back & Direct Fallback */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="editorial-fade w-full sm:w-auto border border-hairline hover:border-espresso text-espresso px-6 py-3 text-sm rounded-[3px]"
              >
                {dict.consultation.step3.backButton}
              </button>

              <button
                type="button"
                onClick={handleContinueOnWhatsapp}
                className="editorial-fade w-full sm:w-auto bg-espresso text-canvas hover:bg-[#2a201b] px-8 py-3.5 text-sm font-medium rounded-[3px]"
              >
                {dict.consultation.step3.submitWhatsapp}
              </button>
            </div>

            <div className="pt-2 border-t border-hairline flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
              <span>{dict.consultation.coordinationNotice}</span>
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-espresso underline underline-offset-4 hover:text-taupe font-medium"
              >
                <span>{dict.consultation.step3.directWhatsappFallback}</span>
                <span aria-hidden="true">·</span>
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
