"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  articleCategories,
  type ArticleCategoryKey,
  type ArticleRecord,
} from "@/content/articles";
import { accountTopics, doctorProfile } from "@/content/doctor";
import { StitchIcon } from "@/components/StitchIcon";
import { DelicateEditorialEmblem, Reveal } from "@/lib/motion";

interface ArticlesExplorerProps {
  locale: Locale;
  dict: Dictionary;
  articles: ArticleRecord[];
}

const previewImageMap: Record<string, string> = {
  "eye-area-care": "/images/editorial/topic-eye-contour.jpg",
  "neck-elasticity": "/images/editorial/topic-neck-profile.jpg",
  "pores-skin-care": "/images/editorial/topic-pores-droplets.jpg",
};

export function ArticlesExplorer({
  locale,
  dict,
  articles,
}: ArticlesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ArticleCategoryKey | "all"
  >("all");

  const categoryEntries = Object.entries(articleCategories) as [
    ArticleCategoryKey,
    Record<Locale, string>,
  ][];

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.categoryKey === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q)
      );
    });
  }, [articles, searchQuery, selectedCategory]);

  const dirArrow = locale === "ar" ? "arrow-back" : "arrow-forward";

  return (
    <div className="space-y-16">
      {/* Borderless Bottom-Hairline Search + Pill Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-copper-500/20">
        <div
          role="group"
          aria-label={dict.articles.allCategories}
          className="flex flex-wrap items-center gap-2.5"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`min-h-[42px] px-5 text-xs rounded-full border transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary-container text-on-primary border-copper-500"
                : "bg-transparent text-on-surface-variant border-surface-high hover:border-copper-500/50"
            }`}
          >
            {dict.articles.allCategories}
          </button>

          {categoryEntries.map(([key, labelMap]) => {
            const active = selectedCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                aria-pressed={active}
                className={`min-h-[42px] px-5 text-xs rounded-full border transition-colors cursor-pointer ${
                  active
                    ? "bg-primary-container text-on-primary border-copper-500"
                    : "bg-transparent text-on-surface-variant border-surface-high hover:border-copper-500/50"
                }`}
              >
                {labelMap[locale]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-80 relative">
          <label htmlFor="article-search-input" className="sr-only">
            {dict.articles.searchLabel}
          </label>
          <input
            id="article-search-input"
            type="search"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.articles.searchPlaceholder}
            className="editorial-borderless-field w-full bg-transparent border-0 border-b border-outline-variant py-2.5 text-sm text-primary focus:border-copper-500 placeholder:text-outline"
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-copper-500 rtl:origin-right ltr:origin-left transition-transform duration-500 ${
              searchFocused ? "scale-x-100" : "scale-x-0"
            }`}
          />
          {(searchQuery || selectedCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs text-copper-700 hover:text-primary underline shrink-0 cursor-pointer"
            >
              {dict.articles.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Intentional Centered Empty State + Staggered Instagram Topic Reference */}
      {articles.length === 0 ? (
        <div className="space-y-24">
          <Reveal className="max-w-2xl mx-auto text-center py-10 space-y-5">
            <DelicateEditorialEmblem variant="journal" />
            <span className="editorial-kicker justify-center">
              {dict.articles.emptyStateTitle}
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl text-primary leading-snug">
              {dict.articles.emptyStateMessage}
            </h2>
            <p className="text-sm text-on-surface-variant leading-[1.9] max-w-[54ch] mx-auto">
              {dict.articles.editorialStandardNote}
            </p>
            <div className="pt-3">
              <a
                href={doctorProfile.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-primary text-xs sm:text-sm"
              >
                <StitchIcon name="camera" size={16} />
                <span>{dict.articles.emptyStateInstagramCta}</span>
              </a>
            </div>
          </Reveal>

          {/* Staggered Instagram Educational Themes */}
          <div className="pt-10 border-t border-copper-500/20 space-y-6">
            <div className="max-w-2xl space-y-1.5">
              <span className="editorial-kicker">
                {dict.home.topicsKicker}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] text-primary leading-[1.18]">
                {dict.home.topicsHeading}
              </h3>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-[1.7]">
                {dict.home.topicsDisclaimer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-start">
              {accountTopics.map((topic, idx) => (
                <Reveal
                  key={topic.id}
                  delay={idx * 0.08}
                  className={idx === 1 ? "md:mt-3" : ""}
                >
                  <div className="group space-y-3">
                    <div className="p-1.5 rounded-[22px] border border-transparent group-hover:border-copper-500/50 transition-colors duration-500">
                      <div className="overflow-hidden rounded-[16px] aspect-[16/10] max-h-[210px] xl:max-h-[235px] bg-surface-low">
                        <Image
                          src={
                            previewImageMap[topic.id] ||
                            "/images/editorial/topic-pores-droplets.jpg"
                          }
                          alt={topic.title[locale]}
                          width={900}
                          height={672}
                          sizes="(max-width: 768px) 92vw, 31vw"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <div className="px-1.5 space-y-1.5">
                      <span className="text-[11.5px] text-copper-700 block">
                        {topic.tag[locale]}
                      </span>
                      <h4 className="font-editorial text-xl lg:text-[22px] text-primary leading-snug">
                        {topic.title[locale]}
                      </h4>
                      <p className="text-[13.5px] sm:text-sm text-on-surface-variant leading-[1.72]">
                        {topic.contextNote[locale]}
                      </p>
                      <div className="pt-1">
                        <a
                          href={doctorProfile.contact.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="copper-link text-xs text-primary hover:text-copper-700"
                        >
                          <span>{dict.home.topicsFollowLink}</span>
                          <StitchIcon
                            name="arrow-up-right"
                            size={13}
                            className="text-copper-500"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <p className="text-sm text-on-surface-variant">
            {dict.articles.noFilterMatches}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="copper-link text-xs text-primary cursor-pointer"
          >
            {dict.articles.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {filteredArticles.map((article) => (
            <article key={article.slug} className="group space-y-3">
              {article.coverImage && (
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="block overflow-hidden rounded-[18px] aspect-[16/10] max-h-[215px] xl:max-h-[240px] bg-surface-low"
                >
                  <Image
                    src={article.coverImage.src}
                    alt={article.coverImage.alt}
                    width={article.coverImage.width}
                    height={article.coverImage.height}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
              )}
              <div className="space-y-2">
                <span className="text-xs text-copper-700">
                  {articleCategories[article.categoryKey][locale]}
                </span>
                <h2 className="font-editorial text-2xl text-primary">
                  <Link href={`/${locale}/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="text-sm text-on-surface-variant leading-[1.85]">
                  {article.summary}
                </p>
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="copper-link text-xs text-primary"
                >
                  <span>{dict.articles.readArticle}</span>
                  <StitchIcon
                    name={dirArrow}
                    size={13}
                    className="text-copper-500"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
