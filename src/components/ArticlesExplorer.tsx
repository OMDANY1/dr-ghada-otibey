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
    <div className="space-y-12">
      {/* Stitch Filter & Search Bar */}
      <div className="bg-surface-lowest border border-surface-high p-4 sm:p-5 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="group"
            aria-label={dict.articles.allCategories}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={`editorial-fade px-4 py-2 text-xs font-medium rounded ${
                selectedCategory === "all"
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:text-primary"
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
                  className={`editorial-fade px-4 py-2 text-xs font-medium rounded ${
                    active
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface-container text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {labelMap[locale]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-80">
            <label htmlFor="article-search-input" className="sr-only">
              {dict.articles.searchLabel}
            </label>
            <input
              id="article-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.articles.searchPlaceholder}
              className="w-full bg-surface-low border border-surface-high focus:border-primary px-4 py-2.5 text-xs sm:text-sm text-on-surface rounded outline-none"
            />
            {(searchQuery || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs text-secondary hover:text-primary underline shrink-0"
              >
                {dict.articles.clearFilters}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Approved Articles OR Stitch Sophisticated In-Preparation Banner */}
      {articles.length === 0 ? (
        <div className="space-y-14">
          <div className="bg-surface-lowest border border-surface-high rounded-xl p-7 sm:p-11 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-semibold bg-tertiary-fixed text-primary px-2.5 py-1 rounded">
                  {dict.articles.emptyStateTitle}
                </span>
                <span className="text-xs text-secondary">
                  {locale === "ar"
                    ? "يُنشر المحتوى المعتمد فقط"
                    : "Approved articles only"}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-[32px] text-primary leading-snug">
                {dict.articles.emptyStateMessage}
              </h2>

              <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                {dict.articles.editorialStandardNote}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={doctorProfile.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-fade inline-flex items-center gap-2 bg-primary-container text-on-primary text-xs font-medium px-6 h-12 rounded hover:bg-primary-hover shadow-xs"
                >
                  <StitchIcon name="camera" size={16} />
                  <span>{dict.articles.emptyStateInstagramCta}</span>
                </a>

                <Link
                  href={`/${locale}/consultation`}
                  className="editorial-fade inline-flex items-center gap-2 bg-surface-container text-primary text-xs font-medium px-6 h-12 rounded hover:bg-surface-high"
                >
                  <StitchIcon name="chat" size={16} />
                  <span>{dict.nav.consultation}</span>
                </Link>
              </div>
            </div>

            {/* Editorial Standards Checklist Panel */}
            <div className="lg:col-span-4 bg-surface-low border border-surface-high p-6 rounded-xl space-y-4">
              <span className="editorial-kicker block">
                {locale === "ar"
                  ? "ضوابط النشر التثقيفي"
                  : "Editorial Publishing Standards"}
              </span>
              <ul className="space-y-3 text-xs text-on-surface-variant">
                <li className="flex items-start gap-2.5">
                  <StitchIcon
                    name="check-circle"
                    size={16}
                    className="text-secondary shrink-0 mt-0.5"
                  />
                  <span>
                    {locale === "ar"
                      ? "لا يُنشر أي محتوى طبي مولّد آليًا بوصفه من كتابة الدكتورة."
                      : "No AI-generated medical text is published or attributed to the doctor."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <StitchIcon
                    name="check-circle"
                    size={16}
                    className="text-secondary shrink-0 mt-0.5"
                  />
                  <span>
                    {locale === "ar"
                      ? "تظل المسودات التحضيرية محجوبة حتى المراجعة والاعتماد الرسمي."
                      : "Preparatory drafts remain unpublished until formally reviewed and approved."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Account Educational Themes Reference (Non-article links to Instagram) */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="editorial-kicker">
                {dict.home.topicsKicker}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-primary">
                {dict.home.topicsHeading}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
                {dict.home.topicsDisclaimer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accountTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-surface-lowest border border-surface-high rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-surface-high">
                      <Image
                        src={
                          previewImageMap[topic.id] ||
                          "/images/editorial/topic-pores-droplets.jpg"
                        }
                        alt={topic.title[locale]}
                        width={900}
                        height={672}
                        sizes="(max-width: 768px) 92vw, 31vw"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 start-3 text-[10px] font-semibold bg-surface-bright/95 text-primary px-2.5 py-1 rounded shadow-xs">
                        {locale === "ar"
                          ? "من موضوعات إنستغرام"
                          : "Instagram Topic"}
                      </span>
                    </div>

                    <div className="p-6 space-y-2">
                      <span className="text-[11px] font-medium text-secondary">
                        {topic.tag[locale]}
                      </span>
                      <h4 className="font-editorial text-xl text-primary leading-snug">
                        {topic.title[locale]}
                      </h4>
                      <p className="text-xs sm:text-[13.5px] text-on-surface-variant leading-relaxed">
                        {topic.contextNote[locale]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="bg-surface-low p-3 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">
                        {dict.home.topicsFollowLink}
                      </span>
                      <a
                        href={doctorProfile.contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold inline-flex items-center gap-1 hover:text-secondary"
                      >
                        <span dir="ltr">Instagram</span>
                        <StitchIcon name="arrow-up-right" size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="border border-surface-high bg-surface-lowest px-6 py-14 text-center rounded-xl space-y-4">
          <p className="text-sm text-on-surface-variant">
            {dict.articles.noFilterMatches}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs font-medium text-primary underline underline-offset-4"
          >
            {dict.articles.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-surface-lowest border border-surface-high rounded-xl overflow-hidden shadow-xs flex flex-col justify-between group"
            >
              <div>
                {article.coverImage && (
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                    className="block h-56 overflow-hidden bg-surface-high"
                  >
                    <Image
                      src={article.coverImage.src}
                      alt={article.coverImage.alt}
                      width={article.coverImage.width}
                      height={article.coverImage.height}
                      className="w-full h-full object-cover group-hover:scale-103 editorial-fade"
                    />
                  </Link>
                )}
                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-secondary">
                    <span>{articleCategories[article.categoryKey][locale]}</span>
                    {article.publishedAt && (
                      <>
                        <span>·</span>
                        <time dateTime={article.publishedAt}>
                          {article.publishedAt}
                        </time>
                      </>
                    )}
                  </div>
                  <h2 className="font-editorial text-2xl text-primary leading-snug">
                    <Link
                      href={`/${locale}/articles/${article.slug}`}
                      className="hover:text-secondary editorial-fade"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-surface-high flex items-center justify-between">
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary"
                >
                  <span>{dict.articles.readArticle}</span>
                  <StitchIcon name={dirArrow} size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
