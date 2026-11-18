"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* ==========================================================================
   CENTRALIZED MOTION TOKENS
   ========================================================================== */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION = {
  micro: 0.2,
  standard: 0.65,
  hero: 1.08,
  draw: 1.25,
} as const;

export const MOTION_STAGGER = {
  tight: 0.065,
  standard: 0.085,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  margin: "-10% 0px",
} as const;

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}

/* ==========================================================================
   1. REVEAL (Fade + 24px gentle rise, once-only, reduced-motion safe)
   ========================================================================== */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT_ONCE })}
      transition={{
        duration: MOTION_DURATION.standard,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   2. LINE REVEAL (Masked line/phrase slide-up — NEVER splits Arabic letters)
   ========================================================================== */
export function LineReveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className="block overflow-hidden py-[0.24em] -my-[0.2em]">
      <motion.span
        data-motion-reveal=""
        initial={{ y: "108%", opacity: 0 }}
        {...(immediate
          ? { animate: { y: "0%", opacity: 1 } }
          : { whileInView: { y: "0%", opacity: 1 }, viewport: VIEWPORT_ONCE })}
        transition={{
          duration: MOTION_DURATION.hero,
          delay,
          ease: EASE_OUT_EXPO,
        }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ==========================================================================
   3. MASK REVEAL (Arch doorway or soft-rounded clip-path reveal from bottom)
   ========================================================================== */
export function MaskReveal({
  children,
  variant = "arch",
  delay = 0,
  immediate = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "arch" | "rounded";
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const initialClip =
    variant === "arch"
      ? "inset(22% 0% 0% 0% round 999px 999px 22px 22px)"
      : "inset(18% 0% 0% 0% round 24px)";

  const finalClip =
    variant === "arch"
      ? "inset(0% 0% 0% 0% round 999px 999px 22px 22px)"
      : "inset(0% 0% 0% 0% round 24px)";

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      initial={{ clipPath: initialClip }}
      {...(immediate
        ? { animate: { clipPath: finalClip } }
        : { whileInView: { clipPath: finalClip }, viewport: VIEWPORT_ONCE })}
      transition={{
        duration: MOTION_DURATION.hero,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   4. DRAW LINE (1px Copper Hairline drawing from inline-start to inline-end)
   ========================================================================== */
export function DrawLine({
  orientation = "horizontal",
  delay = 0,
  className = "",
}: {
  orientation?: "horizontal" | "vertical";
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (orientation === "vertical") {
    return (
      <motion.span
        aria-hidden="true"
        data-motion-reveal=""
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{
          duration: MOTION_DURATION.standard,
          delay,
          ease: EASE_OUT_EXPO,
        }}
        className={`block w-px origin-top bg-copper-500/40 ${className}`}
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      data-motion-reveal=""
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: 0.85,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={`block h-px w-full rtl:origin-right ltr:origin-left bg-gradient-to-r from-copper-300/60 via-copper-500/45 to-copper-700/35 ${className}`}
    />
  );
}

/* ==========================================================================
   5. PARALLAX BOX (Subtle transform-only scroll parallax capped at ±8-10%)
   ========================================================================== */
export function ParallaxBox({
  children,
  offsetPercent = 8,
  className = "",
}: {
  children: React.ReactNode;
  offsetPercent?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${offsetPercent}%`, `${offsetPercent}%`]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ==========================================================================
   6. MAGNETIC (Subtle 7px magnetic pull on fine desktop pointers only)
   ========================================================================== */
export function Magnetic({
  children,
  strength = 7,
  className = "inline-block",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  const x = useSpring(0, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 22, mass: 0.4 });

  if (reduced || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   7. ROTATING CIRCULAR BADGE (Slow 24s linear spin near Hero portrait)
   ========================================================================== */
export function RotatingCircularBadge({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const rawId = useId();
  const pathId = `seal-path-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const hasArabic = /[\u0600-\u06FF]/.test(text);

  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className={`relative w-28 h-28 sm:w-32 sm:h-32 select-none pointer-events-none ${className}`}
    >
      <svg
        style={{ direction: "ltr" }}
        viewBox="0 0 140 140"
        className="w-full h-full animate-seal-spin text-copper-700"
      >
        <defs>
          <path
            id={pathId}
            d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <circle
          cx="70"
          cy="70"
          r="64"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.24"
          strokeWidth="0.75"
        />
        <text
          direction="ltr"
          fill="currentColor"
          fontSize={hasArabic ? "10.2" : "9.2"}
          fontWeight="400"
          letterSpacing={hasArabic ? "0" : "1.6"}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Stationary Center Copper Star Mark */}
      <span className="absolute inset-0 flex items-center justify-center text-copper-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c.7 4.8 4.2 8.3 9 9-4.8.7-8.3 4.2-9 9-.7-4.8-4.2-8.3-9-9 4.8-.7 8.3-4.2 9-9Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </span>
    </div>
  );
}

/* ==========================================================================
   8. DRAW COPPER SECTION FRAME (Draws 1px border around dark CTA section)
   ========================================================================== */
export function DrawCopperFrame({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-4 sm:inset-6 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] h-[calc(100%-2rem)] sm:h-[calc(100%-3rem)] ${className}`}
    >
      <motion.rect
        x="0.5"
        y="0.5"
        width="99.5%"
        height="99%"
        rx="24"
        ry="24"
        fill="none"
        stroke="url(#copperFrameGrad)"
        strokeWidth="1"
        initial={reduced ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
      />
      <defs>
        <linearGradient id="copperFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E3B08A" />
          <stop offset="55%" stopColor="#B87333" />
          <stop offset="100%" stopColor="#8A5226" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ==========================================================================
   9. DELICATE STROKE-DRAW INLINE SVG ORNAMENTS (Botanical / Empty States)
   ========================================================================== */
export function BotanicalCopperOrnament({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      width="84"
      height="42"
      viewBox="0 0 84 42"
      fill="none"
      aria-hidden="true"
      className={`text-copper-500 ${className}`}
    >
      <motion.path
        d="M4 36C22 34 38 22 48 6M48 6C42 18 46 29 60 32M28 28C23 20 26 12 35 9M54 22C62 18 70 20 78 26"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: MOTION_DURATION.draw, ease: EASE_OUT_EXPO }}
      />
    </svg>
  );
}

export function CopperLeafDot({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-copper-500 shrink-0 mt-1.5"
    >
      <motion.path
        d="M4 15C4 8.5 9.5 4 16 4C16 10.5 11.5 16 5 16"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
      />
      <circle cx="5" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function DelicateEditorialEmblem({
  variant = "journal",
  className = "",
}: {
  variant?: "journal" | "seal";
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      className={`text-copper-500 mx-auto ${className}`}
    >
      {variant === "journal" ? (
        <>
          <motion.path
            d="M10 15C16 13 23 14 28 18C33 14 40 13 46 15V41C40 39 33 40 28 44C23 40 16 39 10 41V15Z"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.35, ease: EASE_OUT_EXPO }}
          />
          <motion.path
            d="M28 18V44M16 23H23M33 23H40M16 29H22M34 29H40"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_OUT_EXPO }}
          />
        </>
      ) : (
        <>
          <motion.path
            d="M28 8C37 12 43 19 43 29C43 38 36 45 28 48C20 45 13 38 13 29C13 19 19 12 28 8Z"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.35, ease: EASE_OUT_EXPO }}
          />
          <motion.path
            d="M22 29L26.2 33.2L34.5 24.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT_EXPO }}
          />
        </>
      )}
    </svg>
  );
}
