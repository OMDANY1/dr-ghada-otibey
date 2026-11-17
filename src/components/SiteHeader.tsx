"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getOppositeLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";
import { StitchIcon } from "@/components/StitchIcon";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;

  const setMenuOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(menuOpen) : next;
    setOpenForPath(resolved ? pathname : null);
  };

  const oppositeLocale = getOppositeLocale(locale);
  const switchedPath = pathname.startsWith(`/${locale}`)
    ? `/${oppositeLocale}${pathname.slice(`/${locale}`.length)}`
    : `/${oppositeLocale}`;

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenForPath(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/about`, label: dict.nav.about, exact: false },
    { href: `/${locale}/areas-of-care`, label: dict.nav.areas, exact: false },
    { href: `/${locale}/articles`, label: dict.nav.articles, exact: false },
    { href: `/${locale}/reviews`, label: dict.nav.reviews, exact: false },
    {
      href: `/${locale}/consultation`,
      label: dict.nav.consultation,
      exact: false,
    },
  ];

  const isItemActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const consultationHref = `/${locale}/consultation`;

  return (
    <header className="sticky top-0 w-full z-50 bg-surface-bright border-b border-surface-high shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-4 focus:z-50 focus:bg-primary-container focus:text-on-primary focus:px-4 focus:py-2 focus:rounded focus:text-sm"
      >
        {dict.nav.skipToContent}
      </a>

      <div className="mx-auto max-w-[1440px] h-20 px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Stitch Signature Wordmark */}
        <Link
          href={`/${locale}`}
          className="flex flex-col justify-center group min-w-0"
        >
          <span className="font-editorial text-[19px] sm:text-[22px] font-medium text-primary group-hover:text-primary-container editorial-fade leading-tight truncate">
            {doctorProfile.shortSignature[locale]}
          </span>
          <span className="mt-0.5">
            <span
              dir="ltr"
              className="inline-block font-en-label text-[9px] sm:text-[10px] font-semibold text-secondary"
            >
              Dr. Ghada Alotaibi
              <span className="hidden sm:inline"> · Riyadh</span>
            </span>
          </span>
        </Link>

        {/* Stitch Center Navigation */}
        <nav
          aria-label={dict.nav.mobileNavTitle}
          className="hidden xl:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const active = isItemActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`editorial-fade text-[13px] py-1 ${
                  active
                    ? "text-primary font-medium border-b border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Stitch End Controls: Pill Language Switcher + Primary Container CTA */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center bg-surface-low border border-surface-high px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10.5px] sm:text-[11px]">
            {locale === "ar" ? (
              <>
                <span className="px-1.5 text-primary font-semibold">عربي</span>
                <span className="text-outline-variant text-[10px]">|</span>
                <Link
                  href={switchedPath}
                  hrefLang="en"
                  aria-label={dict.nav.switchLangLabel}
                  className="px-1.5 text-on-surface-variant hover:text-primary editorial-fade font-medium"
                >
                  EN
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={switchedPath}
                  hrefLang="ar"
                  aria-label={dict.nav.switchLangLabel}
                  className="px-1.5 text-on-surface-variant hover:text-primary editorial-fade font-medium"
                >
                  عربي
                </Link>
                <span className="text-outline-variant text-[10px]">|</span>
                <span className="px-1.5 text-primary font-semibold">EN</span>
              </>
            )}
          </div>

          <Link
            href={consultationHref}
            className="editorial-fade hidden sm:inline-flex items-center justify-center bg-primary-container text-on-primary hover:bg-primary-hover px-6 h-11 rounded text-xs font-medium shadow-xs"
          >
            {dict.nav.bookCta}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 bg-surface-low border border-surface-high text-primary rounded hover:bg-surface-container"
          >
            <StitchIcon name={menuOpen ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {menuOpen && (
        <div
          id="mobile-navigation-panel"
          className="xl:hidden border-t border-surface-high bg-surface-lowest shadow-md"
        >
          <div className="mx-auto max-w-[1440px] px-5 md:px-12 py-6 space-y-5">
            <nav
              aria-label={dict.nav.mobileNavTitle}
              className="flex flex-col divide-y divide-surface-high"
            >
              {navItems.map((item) => {
                const active = isItemActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3.5 text-sm flex items-center justify-between ${
                      active
                        ? "text-primary font-semibold"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-secondary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-1 flex flex-col gap-3">
              <Link
                href={consultationHref}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-primary-container text-on-primary h-12 inline-flex items-center justify-center text-sm font-medium rounded"
              >
                {dict.nav.consultation}
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-outline">
                <a
                  href={doctorProfile.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline underline-offset-4"
                >
                  <span dir="ltr">{doctorProfile.contact.instagramHandle}</span>
                </a>
                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline underline-offset-4"
                >
                  <span dir="ltr">{doctorProfile.contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
