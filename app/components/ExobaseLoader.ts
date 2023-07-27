import {json, LoaderFunction} from "@remix-run/cloudflare";
import {pageData} from '~/components/ExobaseData';

export const exobaseLoader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug ?? 'exobase';
        const page = pageData.get(slug);
        if (!page) {
            throw new Error('Page not found');
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
            return `<a href="/exobase/${p1}">${p1}</a>`;
        });

        const finalHtml = `<ul>${finalContent}</ul>`;

        return json({ content: finalHtml, classification });
    } catch (error) {
        return json({ error: (error as any).message }, { status: 404 });
    }
};