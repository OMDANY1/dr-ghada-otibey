"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

let hasHydratedOnce = false;

export default function LocalizedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const isRouteNavigation = hasHydratedOnce;

  useEffect(() => {
    hasHydratedOnce = true;
  }, []);

  if (reduced || !isRouteNavigation) {
    return <>{children}</>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
