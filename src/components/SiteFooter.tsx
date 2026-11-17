import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const year = 2026;

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/areas-of-care`, label: dict.nav.areas },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/reviews`, label: dict.nav.reviews },
    { href: `/${locale}/consultation`, label: dict.nav.consultation },
    { href: `/${locale}/privacy`, label: dict.footer.privacyLink },
  ];

  return (
    <footer className="w-full bg-surface-low border-t border-surface-high py-14 lg:py-16 text-on-surface">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Doctor Wordmark, Verified Summary & Verified Badges */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <div>
              <span className="font-editorial text-2xl sm:text-[28px] text-primary block leading-tight">
                {doctorProfile.shortSignature[locale]}
              </span>
              <span className="block mt-1">
                <span
                  dir="ltr"
                  className="inline-block font-en-label text-[10px] font-semibold text-secondary"
                >
                  Dr. Ghada Alotaibi · Consultant Dermatologist
                </span>
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              {dict.footer.tagline}
            </p>

            {/* Verified-only Chips (Zero unverified board claims) */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-[11px] font-medium bg-tertiary-fixed text-primary px-2.5 py-1 rounded">
                {doctorProfile.title[locale]}
              </span>
              <span className="text-[11px] font-medium bg-tertiary-fixed text-primary px-2.5 py-1 rounded">
                {doctorProfile.city[locale]}
              </span>
            </div>
          </div>

          {/* Column 2: Dossier / Site Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="editorial-kicker">
              {dict.footer.navigationHeading}
            </span>
            <ul className="flex flex-col gap-2 text-[13px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="editorial-fade text-on-surface-variant hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Verified Channels & Privacy Notice */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="editorial-kicker">
              {dict.footer.contactHeading}
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade text-primary hover:text-secondary flex items-center gap-2"
              >
                <span className="text-xs font-medium text-secondary">
                  {dict.footer.coordinationLabel}:
                </span>
                <span dir="ltr" className="font-medium">
                  {doctorProfile.contact.whatsappDisplay}
                </span>
              </a>

              <a
                href={doctorProfile.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade text-primary hover:text-secondary flex items-center gap-2"
              >
                <span className="text-xs font-medium text-secondary">
                  {dict.footer.instagramLabel}:
                </span>
                <span dir="ltr" className="font-medium">
                  {doctorProfile.contact.instagramHandle}
                </span>
              </a>

              <a
                href={doctorProfile.contact.linktreeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-fade text-primary hover:text-secondary flex items-center gap-2"
              >
                <span className="text-xs font-medium text-secondary">
                  {locale === "ar" ? "صفحة الروابط:" : "Profile Links:"}
                </span>
                <span dir="ltr" className="font-medium">
                  linktr.ee/DrGhadah
                </span>
              </a>
            </div>

            <p className="text-xs text-outline mt-2 leading-relaxed">
              {dict.footer.medicalNotice}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-high flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
          <p>
            © {year} {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-primary underline underline-offset-4"
            >
              {dict.footer.privacyLink}
            </Link>
            <span className="text-outline" dir="ltr">
              Riyadh, Saudi Arabia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
