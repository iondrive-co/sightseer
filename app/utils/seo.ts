import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://iondrive.co";
export const SITE_NAME = "Iondrive";

const DEFAULT_DESCRIPTION =
  "Creative writing, opinions, projects, and links — a personal site by Miles.";

type SeoArgs = {
  /** Page title without the site-name suffix. Omit for the homepage. */
  title?: string;
  /** Meta description. Falls back to a site-wide default. */
  description?: string;
  /** Canonical path beginning with "/", e.g. "/Reviews". Omit for the homepage. */
  path?: string;
  /** Emit a noindex robots tag (e.g. for 404 / not-found states). */
  noIndex?: boolean;
};

/**
 * Build a complete set of meta descriptors for a route: title, description and a
 * canonical link. Each route's meta replaces its parent's in React Router, so the
 * returned array is self-contained.
 */
export function seo({ title, description, path, noIndex }: SeoArgs = {}): MetaDescriptor[] {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL;

  const descriptors: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonical },
  ];

  if (noIndex) {
    descriptors.push({ name: "robots", content: "noindex, nofollow" });
  }

  return descriptors;
}

/** Collapse whitespace and truncate to `max` chars at a word boundary. */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}
