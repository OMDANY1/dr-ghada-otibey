import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";
import { BrandLogo } from "@/components/BrandLogo";

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
    <footer className="w-full bg-surface-low border-t border-copper-500/25 pt-18 pb-24 sm:py-20 text-on-surface">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 pb-14">
          {/* Column 1: Official Full Stacked SVG Brand Logo & Quiet Tagline */}
          <div className="md:col-span-5 md:pe-10 md:border-e border-copper-500/20 flex flex-col items-start gap-5">
            <Link
              href={`/${locale}`}
              aria-label={doctorProfile.name[locale]}
              className="inline-block group"
            >
              <BrandLogo
                variant="full"
                className="w-36 sm:w-44 h-auto text-[#a58f77] transition-opacity duration-300 group-hover:opacity-85"
              />
            </Link>

            {locale === "ar" && (
              <span className="font-editorial text-2xl sm:text-[28px] text-primary block leading-normal">
                {doctorProfile.name.ar}
              </span>
            )}

            <p className="text-sm text-on-surface-variant max-w-[46ch] leading-[1.9]">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Column 2: Navigation Index */}
          <div className="md:col-span-3 md:px-9 md:border-e border-copper-500/20 flex flex-col gap-4">
            <span className="editorial-kicker">
              {dict.footer.navigationHeading}
            </span>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Verified Channels */}
          <div className="md:col-span-4 md:ps-10 flex flex-col gap-4">
            <span className="editorial-kicker">
              {dict.footer.contactHeading}
            </span>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={doctorProfile.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2.5 text-primary hover:text-copper-700 transition-colors"
              >
                <span className="text-xs text-copper-700">
                  {dict.footer.coordinationLabel}:
                </span>
                <span dir="ltr" className="font-normal">
                  {doctorProfile.contact.whatsappDisplay}
                </span>
              </a>

              <a
                href={doctorProfile.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2.5 text-primary hover:text-copper-700 transition-colors"
              >
                <span className="text-xs text-copper-700">
                  {dict.footer.instagramLabel}:
                </span>
                <span dir="ltr" className="font-normal">
                  {doctorProfile.contact.instagramHandle}
                </span>
              </a>

              <a
                href={doctorProfile.contact.linktreeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2.5 text-primary hover:text-copper-700 transition-colors"
              >
                <span className="text-xs text-copper-700">
                  {locale === "ar" ? "صفحة الروابط:" : "Profile Links:"}
                </span>
                <span dir="ltr" className="font-normal">
                  linktr.ee/DrGhadah
                </span>
              </a>
            </div>

            <p className="text-xs text-outline mt-2 leading-relaxed max-w-[44ch]">
              {dict.footer.medicalNotice}
            </p>
          </div>
        </div>

        {/* Copper Hairline Colophon */}
        <div className="pt-7 border-t border-copper-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-on-surface-variant">
          <p>
            © {year} {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-primary underline underline-offset-4 decoration-copper-500/50"
            >
              {dict.footer.privacyLink}
            </Link>
            <span
              dir="ltr"
              className="font-latin-italic text-sm text-copper-700"
            >
              Riyadh, Saudi Arabia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
