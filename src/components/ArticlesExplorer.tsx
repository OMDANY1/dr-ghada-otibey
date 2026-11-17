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
import { doctorProfile } from "@/content/doctor";

interface ArticlesExplorerProps {
  locale: Locale;
  dict: Dictionary;
  articles: ArticleRecord[];
}

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

  return (
    <div className="space-y-12">
      {/* Search & Category Controls — Always functional */}
      <div className="bg-warm border border-hairline p-5 sm:p-7 rounded-[4px] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <label htmlFor="article-search-input" className="sr-only">
              {dict.articles.searchLabel}
            </label>
            <input
              id="article-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.articles.searchPlaceholder}
              className="w-full bg-canvas border border-hairline focus:border-espresso px-4 py-3 text-sm text-espresso rounded-[3px]"
            />
          </div>

          {(searchQuery || selectedCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs text-espresso underline underline-offset-4 hover:text-taupe self-start md:self-center"
            >
              {dict.articles.clearFilters}
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label={dict.articles.allCategories}
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`editorial-fade px-3.5 py-1.5 text-xs rounded-[3px] border ${
              selectedCategory === "all"
                ? "bg-espresso text-canvas border-espresso"
                : "bg-canvas text-ink-soft border-hairline hover:border-taupe"
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
                className={`editorial-fade px-3.5 py-1.5 text-xs rounded-[3px] border ${
                  active
                    ? "bg-espresso text-canvas border-espresso"
                    : "bg-canvas text-ink-soft border-hairline hover:border-taupe"
                }`}
              >
                {labelMap[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Output: Approved Articles vs Elegant Empty State */}
      {articles.length === 0 ? (
        <div className="border border-hairline bg-canvas px-6 py-16 sm:px-12 sm:py-20 text-center rounded-[4px] max-w-3xl mx-auto space-y-5">
          <p className="editorial-kicker">{dict.articles.emptyStateTitle}</p>
          <h2 className="font-editorial text-2xl sm:text-3xl text-espresso leading-snug">
            {dict.articles.emptyStateMessage}
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto leading-relaxed">
            {dict.articles.editorialStandardNote}
          </p>
          <div className="pt-3">
            <a
              href={doctorProfile.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-fade inline-flex items-center justify-center bg-espresso text-canvas hover:bg-[#2a201b] px-6 py-3 text-sm font-medium rounded-[3px]"
            >
              <span>{dict.articles.emptyStateInstagramCta}</span>
            </a>
          </div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="border border-hairline bg-warm px-6 py-14 text-center rounded-[4px] space-y-4">
          <p className="text-sm text-ink-soft">
            {dict.articles.noFilterMatches}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs font-medium text-espresso underline underline-offset-4"
          >
            {dict.articles.clearFilters}
          </button>
        </div>
      ) : (
        <div className="divide-y divide-hairline border-t border-b border-hairline">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              {article.coverImage && (
                <div className="md:col-span-4">
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                    className="block overflow-hidden rounded-[3px] bg-warm"
                  >
                    <Image
                      src={article.coverImage.src}
                      alt={article.coverImage.alt}
                      width={article.coverImage.width}
                      height={article.coverImage.height}
                      className="w-full h-56 object-cover"
                    />
                  </Link>
                </div>
              )}
              <div
                className={
                  article.coverImage ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-3"
                }
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-taupe">
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
                <h2 className="font-editorial text-2xl sm:text-3xl text-espresso">
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                    className="hover:text-taupe editorial-fade"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
                  {article.summary}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                    className="text-xs font-medium text-espresso underline underline-offset-4 hover:text-taupe"
                  >
                    {dict.articles.readArticle}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
