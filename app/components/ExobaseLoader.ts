import {json, LoaderFunction} from "@remix-run/cloudflare";
import {Classification, pageData} from '~/components/ExobaseData';

type ArticleData = [string, {content: string, classification: Classification}];

export let classificationOverviewLoader: LoaderFunction = async () => {
    const classifications = Array.from(pageData.values())
        .map(data => data.classification.split('/')[0]) // only use top-level classification
        .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
    return json({ classifications });
};
export const exobaseLoader: LoaderFunction = async ({ params }) => {
    try {
        const slug = (params.slug ?? 'exobase').replace(/_/g, ' ');
        const isClassification = slug.startsWith('Category-');
        if (isClassification) {
            const classification = slug.replace('Category-', '');
            const articles: ArticleData[] = Array.from(pageData).filter(([, data]) =>
                data.classification.startsWith(classification)
            );
            // Map articles to subcategories
            const subcategoryMap: Record<string, ArticleData[]> = {};
            articles.forEach(([slug, data]) => {
                const subcategory = data.classification.includes('/') ? data.classification.split('/')[1] : '';
                if (!subcategoryMap[subcategory]) {
                    subcategoryMap[subcategory] = [];
                }
                subcategoryMap[subcategory].push([slug, data]);
            });
            return json({ isClassification, articles: subcategoryMap });
        }
        const page = pageData.get(slug);
        if (!page) {
            const classificationArticles: ArticleData[] = Array.from(pageData).filter(([, data]) =>
                data.classification.startsWith(slug)
            );
            // No need to extract subcategories here because it's either an article or a main category.
            return json({ isClassification: true, articles: classificationArticles });
        }
        const content = page.content;
        const classification = page.classification;

        const lines = content.split(/\n|\r\n/);
        const processedLines = lines.map(line => {
            if (line.startsWith("- ")) {
                // This is a list item
                return `<li>${line.substring(2)}</li>`;  // Remove the "- " and wrap in <li>
            } else if (line.trim() === '') {
                // This is a blank line, treat it as a paragraph separator
                return '</ul><p></p><ul>';
            } else {
                // This is a regular line
                return line;
            }
        });
        const processedContent = processedLines.join(' ');
        const finalContent = processedContent.replace(/\[\[(.*?)\]\]/g, function (match, p1) {
            return `<a href="/exobase/${p1.replace(/ /g, '_')}">${p1}</a>`;
        });

        const finalHtml = `<ul>${finalContent}</ul>`;

        return json({ content: finalHtml, classification });
    } catch (error) {
        return json({ error: (error as any).message }, { status: 404 });
    }
};