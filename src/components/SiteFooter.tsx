import Link from "next/link";
import { getOppositeLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const year = 2026;
  const oppositeLocale = getOppositeLocale(locale);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/areas-of-care`, label: dict.nav.areas },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/reviews`, label: dict.nav.reviews },
    { href: `/${locale}/consultation`, label: dict.nav.consultation },
  ];

  return (
    <footer className="bg-canvas border-t border-hairline text-espresso">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0">
          {/* Column 1: Signature Wordmark & Role */}
          <div className="md:col-span-5 md:pe-10 md:border-e border-hairline space-y-3">
            <div>
              <p className="text-xl font-semibold text-espresso">
                {doctorProfile.shortSignature[locale]}
              </p>
              <p className="mt-1">
                <span
                  dir="ltr"
                  className="inline-block font-en-brand text-[10px] font-medium text-ink-muted"
                >
                  DR. GHADA ALOTAIBI
                </span>
              </p>
            </div>
            <p className="text-xs sm:text-[13px] text-ink-soft max-w-sm leading-relaxed pt-1">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 md:px-8 md:border-e border-hairline space-y-3">
            <h2 className="text-xs font-semibold text-espresso">
              {dict.footer.navigationHeading}
            </h2>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="editorial-fade text-ink-soft hover:text-espresso"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="editorial-fade text-ink-soft hover:text-espresso"
                >
                  {dict.footer.privacyLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Coordination Channels + Language Switcher */}
          <div className="md:col-span-4 md:ps-10 flex flex-col justify-between gap-6">
            <div className="space-y-3 text-xs sm:text-[13px]">
              <a
                href={doctorProfile.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade flex items-center gap-2.5 text-ink-soft hover:text-espresso"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-taupe shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                <span dir="ltr">dr.ghada.alotaibi</span>
              </a>

              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade flex items-center gap-2.5 text-ink-soft hover:text-espresso"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-taupe shrink-0"
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
                <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-hairline/70 text-xs text-ink-muted">
              <Link
                href={`/${oppositeLocale}`}
                hrefLang={oppositeLocale}
                className="font-medium text-espresso hover:text-taupe"
              >
                {oppositeLocale === "en" ? "EN" : "عربي"}
              </Link>
              <span>© {year}</span>
            </div>
          </div>
        </div>

        {/* Bottom Medical Disclaimer & Privacy Colophon */}
        <div className="mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11.5px] text-ink-muted">
          <p>{dict.footer.medicalNotice}</p>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-espresso underline underline-offset-4"
            >
              {dict.footer.privacyLink}
            </Link>
            <span>{dict.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
