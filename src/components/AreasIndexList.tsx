"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { AreaOfCare } from "@/content/areas";
import { StitchIcon } from "@/components/StitchIcon";
import { EASE_OUT_EXPO, useFinePointer, VIEWPORT_ONCE } from "@/lib/motion";

interface AreasIndexListProps {
  areas: AreaOfCare[];
  locale: Locale;
  inquireLabel: string;
}

const previewImageMap: Record<string, string> = {
  "skin-health": "/images/editorial/care-skin-radiance.jpg",
  "hair-scalp": "/images/editorial/care-hair-waves.jpg",
  "skin-aging": "/images/editorial/cream-jar-shadow.jpg",
  "cosmetic-rejuvenation": "/images/editorial/care-serum-dropper.jpg",
};

export function AreasIndexList({
  areas,
  locale,
  inquireLabel,
}: AreasIndexListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Smooth spring-lerp cursor coordinates relative to container
  const cursorX = useSpring(0, { stiffness: 190, damping: 25, mass: 0.45 });
  const cursorY = useSpring(0, { stiffness: 190, damping: 25, mass: 0.45 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !finePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left - 110);
    cursorY.set(e.clientY - rect.top - 135);
  };

  const dirArrow = locale === "ar" ? "arrow-back" : "arrow-forward";
  const activeArea = areas.find((a) => a.id === hoveredId);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredId(null)}
      className="relative border-t border-copper-500/25"
    >
      {areas.map((area, idx) => {
        const isHovered = hoveredId === area.id;
        return (
          <motion.div
            key={area.id}
            data-motion-reveal=""
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: 0.65,
              delay: idx * 0.075,
              ease: EASE_OUT_EXPO,
            }}
            onMouseEnter={(e) => {
              if (!reduced && finePointer && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                cursorX.set(e.clientX - rect.left - 110);
                cursorY.set(e.clientY - rect.top - 135);
              }
              setHoveredId(area.id);
            }}
            className="group relative border-b border-surface-high transition-colors duration-500 hover:bg-surface-low/80"
          >
            <Link
              href={`/${locale}/consultation?area=${area.consultationTopicKey}`}
              aria-label={`${area.title[locale]} — ${inquireLabel}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-8 sm:py-11 px-2 sm:px-5"
            >
              {/* Outlined Copper Numeral 01-04 */}
              <div className="md:col-span-2 flex items-baseline gap-4">
                <span
                  dir="ltr"
                  className="numeral-copper-outline text-4xl sm:text-5xl select-none transition-opacity duration-300 group-hover:opacity-100 opacity-85"
                >
                  {area.number}
                </span>
                <span className="text-xs text-copper-700 md:hidden">
                  {area.kicker[locale]}
                </span>
              </div>

              {/* Serif Title with Gentle Inline Shift on Hover */}
              <div className="md:col-span-5">
                <span className="hidden md:block text-xs text-copper-700 mb-1">
                  {area.kicker[locale]}
                </span>
                <h3 className="font-editorial text-2xl sm:text-[34px] text-primary leading-snug transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2">
                  {area.title[locale]}
                </h3>
              </div>

              {/* Concise One-Line Description */}
              <div className="md:col-span-4">
                <p className="text-sm sm:text-[15px] text-on-surface-variant leading-[1.85] max-w-[46ch]">
                  {area.shortSummary[locale]}
                </p>
              </div>

              {/* Sliding Arrow */}
              <div className="md:col-span-1 flex items-center md:justify-end pt-1 md:pt-0 text-copper-700">
                <span className="inline-flex items-center gap-2 text-xs font-medium md:sr-only">
                  {inquireLabel}
                </span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-copper-500/30 group-hover:border-copper-500 group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rtl:group-hover:-translate-x-1.5 ltr:group-hover:translate-x-1.5 ms-auto md:ms-0">
                  <StitchIcon name={dirArrow} size={16} />
                </span>
              </div>
            </Link>

            {/* Animated 1px Copper Line Drawing Across Bottom on Hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-copper-300 via-copper-500 to-copper-700 rtl:origin-right ltr:origin-left transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </motion.div>
        );
      })}

      {/* Floating Cursor-Following Editorial Arched Preview (Desktop Fine Pointers Only) */}
      {!reduced && finePointer && (
        <motion.div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          animate={{
            opacity: activeArea ? 1 : 0,
            scale: activeArea ? 1 : 0.9,
          }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="pointer-events-none hidden lg:block absolute top-0 left-0 z-30 w-52 h-64 rounded-t-full rounded-b-2xl overflow-hidden border border-copper-500/60 bg-surface-lowest p-1.5 shadow-[0_20px_50px_rgba(35,24,17,0.16)]"
        >
          {activeArea && (
            <div className="w-full h-full rounded-t-full rounded-b-[12px] overflow-hidden relative bg-surface-low">
              <Image
                src={
                  previewImageMap[activeArea.id] ||
                  "/images/editorial/care-skin-radiance.jpg"
                }
                alt=""
                width={420}
                height={520}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
