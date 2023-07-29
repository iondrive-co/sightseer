import {json, LoaderFunction} from "@remix-run/cloudflare";
import {pageData} from '~/components/ExobaseData';

type ArticleData = [string, {content: string, classification: string}];

export const exobaseLoader: LoaderFunction = async ({ params }) => {
    try {
        const slug = (params.slug ?? 'exobase').replace(/_/g, ' ');
        const isClassification = slug.startsWith('Category-');
        if (isClassification) {
            const classification = slug.replace('Category-', '');
            const articles: ArticleData[] = Array.from(pageData).filter(([, data]) => data.classification === classification);
            return json({ isClassification, articles });
        }
        const page = pageData.get(slug);
        // If the slug does not correspond to a page, treat it as a classification
        if (!page) {
            const classificationArticles: ArticleData[] = Array.from(pageData).filter(([, data]) => data.classification === slug);
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