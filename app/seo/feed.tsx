import { stories } from "~/components/HolonsData";
import { SITE_URL, SITE_NAME, escapeXml, truncate } from "~/utils/seo";

/** First ~300 chars of a story's prose, with separators/blank lines removed. */
function storyExcerpt(content: string): string {
  const text = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && p !== "---")
    .join(" ");
  return truncate(text, 300);
}

export async function loader() {
  const items = stories.map((story) => {
    const url = `${SITE_URL}/Holons#${encodeURIComponent(story.id)}`;
    return (
      `    <item>\n` +
      `      <title>${escapeXml(story.name)}</title>\n` +
      `      <link>${url}</link>\n` +
      `      <guid isPermaLink="true">${url}</guid>\n` +
      `      <description>${escapeXml(storyExcerpt(story.content))}</description>\n` +
      `    </item>`
    );
  });

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${escapeXml(SITE_NAME)} — Holons</title>\n` +
    `    <link>${SITE_URL}/Holons</link>\n` +
    `    <description>Short stories set in the Exobase, a speculative future history.</description>\n` +
    `    <language>en</language>\n` +
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    items.join("\n") +
    `\n  </channel>\n` +
    `</rss>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
