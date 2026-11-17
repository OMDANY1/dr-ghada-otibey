import type { Locale } from "@/i18n/config";

export interface VerifiedReview {
  id: string;
  language: Locale;
  authorDisplay: string;
  excerpt: string;
  sourceLabel: string;
  sourceUrl?: string;
  publishedAt: string;
  status: "pending" | "approved";
  consentedForPublication: boolean;
}

/**
 * Verified patient testimonials repository.
 *
 * STRICT EDITORIAL RULE:
 * Do not add placeholder quotes, fictional initials/names, sample star ratings,
 * or private chat messages without explicit publication consent.
 * Remains empty until verified, approved testimonials are supplied.
 */
const allReviews: VerifiedReview[] = [];

export function getPublicReviews(locale: Locale): VerifiedReview[] {
  return allReviews.filter(
    (review) =>
      review.language === locale &&
      review.status === "approved" &&
      review.consentedForPublication === true &&
      review.excerpt.trim().length > 0
  );
}
