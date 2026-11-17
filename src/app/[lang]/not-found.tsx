"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

function NotFoundInner() {
  const pathname = usePathname() || "/ar";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "ar";
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-28 sm:py-36 text-center space-y-6">
      <p className="editorial-kicker">{dict.notFound.kicker}</p>
      <h1 className="font-editorial text-3xl sm:text-5xl text-espresso">
        {dict.notFound.heading}
      </h1>
      <p className="text-sm sm:text-base text-ink-soft max-w-lg mx-auto leading-relaxed">
        {dict.notFound.body}
      </p>
      <div className="pt-4">
        <Link
          href={`/${locale}`}
          className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a201b] px-7 py-3.5 text-sm font-medium rounded-[3px]"
        >
          {dict.notFound.backHome}
        </Link>
      </div>
    </section>
  );
}

export default function LocalizedNotFound() {
  const fallbackDict = getDictionary("ar");
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-28 sm:py-36 text-center space-y-6">
          <p className="editorial-kicker">{fallbackDict.notFound.kicker}</p>
          <h1 className="font-editorial text-3xl sm:text-5xl text-espresso">
            {fallbackDict.notFound.heading}
          </h1>
        </section>
      }
    >
      <NotFoundInner />
    </Suspense>
  );
}
