"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getOppositeLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { doctorProfile } from "@/content/doctor";
import { StitchIcon } from "@/components/StitchIcon";
import { BrandLogo } from "@/components/BrandLogo";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const reduced = useReducedMotion();

  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;

  const setMenuOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(menuOpen) : next;
    setOpenForPath(resolved ? pathname : null);
  };

  const [scrolled, setScrolled] = useState(false);
  const [pastHeroOnMobile, setPastHeroOnMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 28);
      setPastHeroOnMobile(y > 280);

      if (!reduced && !menuOpen) {
        if (y > 160 && y > lastScrollY.current + 8) {
          setHidden(true);
        } else if (y < lastScrollY.current - 6 || y <= 80) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced, menuOpen]);

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

  const oppositeLocale = getOppositeLocale(locale);
  const switchedPath = pathname.startsWith(`/${locale}`)
    ? `/${oppositeLocale}${pathname.slice(`/${locale}`.length)}`
    : `/${oppositeLocale}`;

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
  const isConsultationPage = pathname.startsWith(consultationHref);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 w-full z-50 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || menuOpen
            ? "bg-surface/90 backdrop-blur-md border-b border-copper-500/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-4 focus:z-50 focus:bg-primary-container focus:text-on-primary focus:px-5 focus:py-2.5 focus:rounded-full focus:text-sm"
        >
          {dict.nav.skipToContent}
        </a>

        <div
          className={`mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 flex items-center justify-between gap-2 sm:gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "h-14 sm:h-[62px]" : "h-16 sm:h-[72px]"
          }`}
        >
          {/* Official Brand Emblem + Editorial Signature */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0"
          >
            <BrandLogo
              variant="mark"
              className={`text-[#a58f77] shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                scrolled ? "w-8 h-5.5 sm:w-10 sm:h-7" : "w-9 h-6 sm:w-12 sm:h-8"
              }`}
            />
            <span className="flex flex-col justify-center">
              <span className="font-editorial text-[18px] sm:text-[24px] text-primary leading-normal py-0.5 whitespace-nowrap">
                {doctorProfile.shortSignature[locale]}
              </span>
              <span className="hidden sm:block -mt-0.5">
                <span
                  dir="ltr"
                  className="inline-block font-latin-italic text-[11px] sm:text-[12px] text-copper-700"
                >
                  {locale === "ar"
                    ? "Dr. Ghada Alotaibi · Dermatologist"
                    : "Consultant Dermatologist · Riyadh"}
                </span>
              </span>
            </span>
          </Link>

          {/* Light Editorial Navigation */}
          <nav
            aria-label={dict.nav.mobileNavTitle}
            className="hidden xl:flex items-center gap-8"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[13.5px] font-normal transition-colors duration-300 ${
                    active
                      ? "text-primary font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-copper-500"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* End Controls: Language Switcher + Outlined Copper-Hairline Pill CTA */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center bg-surface-low/80 border border-copper-500/25 px-2.5 py-1 rounded-full text-[11px]">
              {locale === "ar" ? (
                <>
                  <span className="px-1.5 text-primary font-medium">عربي</span>
                  <span className="text-copper-500/40 text-[10px]">|</span>
                  <Link
                    href={switchedPath}
                    hrefLang="en"
                    aria-label={dict.nav.switchLangLabel}
                    className="px-1.5 text-on-surface-variant hover:text-primary transition-colors"
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
                    className="px-1.5 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    عربي
                  </Link>
                  <span className="text-copper-500/40 text-[10px]">|</span>
                  <span className="px-1.5 text-primary font-medium">EN</span>
                </>
              )}
            </div>

            <Link
              href={consultationHref}
              className="hidden sm:inline-flex items-center justify-center min-h-[46px] px-6 rounded-full border border-copper-500/65 text-primary hover:bg-primary-container hover:text-on-primary hover:border-copper-500 text-xs font-medium transition-colors duration-300"
            >
              {dict.nav.bookCta}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-copper-500/35 bg-surface/80 text-primary hover:border-copper-500"
            >
              <StitchIcon name={menuOpen ? "close" : "menu"} size={17} />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation-panel"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="xl:hidden border-t border-copper-500/25 bg-surface/98 backdrop-blur-lg shadow-lg"
            >
              <div className="mx-auto max-w-[1440px] px-5 sm:px-8 py-7 space-y-6">
                <div className="pb-4 border-b border-copper-500/15 flex items-center justify-between">
                  <BrandLogo
                    variant="full"
                    className="w-28 h-auto text-[#a58f77]"
                  />
                  <span className="text-xs text-copper-700">
                    {doctorProfile.cityShort[locale]}
                  </span>
                </div>

                <nav
                  aria-label={dict.nav.mobileNavTitle}
                  className="flex flex-col divide-y divide-copper-500/15"
                >
                  {navItems.map((item) => {
                    const active = isItemActive(item.href, item.exact);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`py-3.5 text-base font-editorial flex items-center justify-between ${
                          active
                            ? "text-primary font-medium"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        <span>{item.label}</span>
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-copper-500"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-1 flex flex-col gap-4">
                  <Link
                    href={consultationHref}
                    onClick={() => setMenuOpen(false)}
                    className="btn-pill-primary w-full text-sm font-medium"
                  >
                    {dict.nav.consultation}
                  </Link>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-outline">
                    <a
                      href={doctorProfile.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary underline underline-offset-4"
                    >
                      <span dir="ltr">
                        {doctorProfile.contact.instagramHandle}
                      </span>
                    </a>
                    <a
                      href={doctorProfile.contact.whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary underline underline-offset-4"
                    >
                      <span dir="ltr">
                        {doctorProfile.contact.whatsappDisplay}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Header Spacer to prevent initial layout overlap */}
      <div className="h-16 sm:h-[72px]" aria-hidden="true" />

      {/* Mobile-Only Slim Floating Pill CTA (Appears after Hero on Home; hidden on consultation route & when menu open) */}
      {!isConsultationPage &&
        !menuOpen &&
        (pathname !== `/${locale}` || pastHeroOnMobile) && (
        <div className="sm:hidden fixed bottom-5 end-4 z-40">
          <Link
            href={consultationHref}
            className="inline-flex items-center gap-2 min-h-[46px] px-5 rounded-full bg-primary-container/95 text-on-primary border border-copper-300/60 shadow-[0_10px_28px_rgba(35,24,17,0.22)] text-xs font-medium"
          >
            <span>{dict.nav.bookCta}</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-copper-300"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </>
  );
}
