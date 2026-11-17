"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

interface ArticleShareBarProps {
  title: string;
  url: string;
  dict: Dictionary;
}

export function ArticleShareBar({ title, url, dict }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title}\n${url}`
  )}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-hairline">
      <span className="editorial-kicker">{dict.articles.shareHeading}</span>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="editorial-fade border border-hairline hover:border-espresso px-4 py-2 text-xs text-espresso rounded-[3px]"
        >
          {copied ? dict.articles.linkCopied : dict.articles.copyLink}
        </button>
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-fade border border-hairline hover:border-espresso px-4 py-2 text-xs text-espresso rounded-[3px]"
        >
          {dict.articles.shareWhatsapp}
        </a>
      </div>
    </div>
  );
}
