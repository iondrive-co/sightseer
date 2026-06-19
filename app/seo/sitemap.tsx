import { recipes } from "~/components/RecipesData";
import { pageData } from "~/components/exobase/ExobaseData";
import { SITE_URL } from "~/utils/seo";
import contentDates from "~/data/content-dates.json";

const dates = contentDates as {
  exobase: Record<string, string>;
  recipes: Record<string, string>;
  holons: Record<string, string>;
};

// Top-level pages that have a single, stable URL.
const STATIC_PATHS = [
  "/",
  "/Chad",
  "/Holons",
  "/Links",
  "/Meta",
  "/Recipes",
  "/Reviews",
  "/Solar",
  "/Winnow",
  "/exobase",
];

/** Canonical URL for an Exobase article, using the underscore slug form. */
function exobaseUrl(key: string): string {
  return `${SITE_URL}/exobase/${encodeURIComponent(key.replace(/ /g, "_"))}`;
}

export async function loader() {
  const entries: { loc: string; lastmod?: string }[] = [];
  const seen = new Set<string>();
  const add = (loc: string, lastmod?: string) => {
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, lastmod });
  };

  for (const path of STATIC_PATHS) add(SITE_URL + path);

  for (const recipe of recipes) {
    add(`${SITE_URL}/Recipes/${encodeURIComponent(recipe.id)}`, dates.recipes[recipe.id]);
  }

  const categories = new Set<string>();
  for (const [key, data] of pageData) {
    add(exobaseUrl(key), dates.exobase[key]);
    categories.add(data.classification.split("/")[0]);
  }
  for (const category of categories) {
    add(`${SITE_URL}/exobase/Category-${encodeURIComponent(category)}`);
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map((e) =>
        e.lastmod
          ? `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>`
          : `  <url><loc>${e.loc}</loc></url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
