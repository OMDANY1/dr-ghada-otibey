"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getOppositeLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";

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
  ];

  const isItemActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const consultationHref = `/${locale}/consultation`;
  const isConsultationActive = pathname.startsWith(consultationHref);

  return (
    <header className="sticky top-0 z-40 bg-canvas border-b border-hairline">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-4 focus:z-50 focus:bg-espresso focus:text-canvas focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        {dict.nav.skipToContent}
      </a>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Typographic Signature Wordmark Matching Visual Reference */}
          <Link
            href={`/${locale}`}
            className="flex flex-col justify-center py-1 shrink-0"
          >
            <span className="text-lg sm:text-[1.2rem] font-semibold text-espresso leading-snug">
              {doctorProfile.shortSignature[locale]}
            </span>
            <span
              dir="ltr"
              className="font-en-brand text-[9.5px] sm:text-[10px] font-medium text-ink-muted mt-0.5"
            >
              {locale === "ar"
                ? "DR. GHADA ALOTAIBI"
                : "CONSULTANT DERMATOLOGIST"}
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <nav
            aria-label={dict.nav.mobileNavTitle}
            className="hidden lg:flex items-center gap-7 xl:gap-8"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`editorial-fade relative py-1.5 text-[13.5px] ${
                    active
                      ? "text-espresso font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-espresso"
                      : "text-ink-soft hover:text-espresso font-normal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* End Actions: Minimal Language Code + Rounded Espresso CTA */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={switchedPath}
              hrefLang={oppositeLocale}
              aria-label={dict.nav.switchLangLabel}
              className="editorial-fade px-2 py-1 text-xs font-medium text-ink-soft hover:text-espresso"
            >
              <span dir={oppositeLocale === "ar" ? "rtl" : "ltr"}>
                {oppositeLocale === "en" ? "EN" : "عربي"}
              </span>
            </Link>

            <Link
              href={consultationHref}
              aria-current={isConsultationActive ? "page" : undefined}
              className="editorial-fade hidden sm:inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2c201a] px-5 py-2.5 text-xs sm:text-[13px] font-medium rounded-[6px]"
            >
              {dict.nav.bookCta}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-hairline text-espresso rounded-[6px] hover:bg-warm"
            >
              {menuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h11" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div
          id="mobile-navigation-panel"
          className="lg:hidden border-t border-hairline bg-warm"
        >
          <div className="mx-auto max-w-6xl px-5 py-6 space-y-6">
            <nav
              aria-label={dict.nav.mobileNavTitle}
              className="flex flex-col divide-y divide-hairline"
            >
              {navItems.map((item) => {
                const active = isItemActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3.5 text-[15px] flex items-center justify-between ${
                      active
                        ? "text-espresso font-medium"
                        : "text-ink-soft hover:text-espresso"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-taupe"
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
                className="w-full text-center bg-espresso text-canvas py-3 px-5 text-sm font-medium rounded-[6px]"
              >
                {dict.nav.consultation}
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-ink-muted">
                <a
                  href={doctorProfile.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-espresso underline underline-offset-4"
                >
                  <span dir="ltr">{doctorProfile.contact.instagramHandle}</span>
                </a>
                <a
                  href={doctorProfile.contact.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-espresso underline underline-offset-4"
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
