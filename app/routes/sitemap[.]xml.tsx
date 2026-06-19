import { recipes } from "~/components/RecipesData";
import { pageData } from "~/components/exobase/ExobaseData";
import { SITE_URL } from "~/utils/seo";

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
  const urls = new Set<string>();

  for (const path of STATIC_PATHS) {
    urls.add(SITE_URL + path);
  }

  for (const recipe of recipes) {
    urls.add(`${SITE_URL}/Recipes/${encodeURIComponent(recipe.id)}`);
  }

  const categories = new Set<string>();
  for (const [key, data] of pageData) {
    urls.add(exobaseUrl(key));
    categories.add(data.classification.split("/")[0]);
  }
  for (const category of categories) {
    urls.add(`${SITE_URL}/exobase/Category-${encodeURIComponent(category)}`);
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls].map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
