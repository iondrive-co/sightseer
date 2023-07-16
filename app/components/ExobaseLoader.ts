import {json, LoaderFunction} from "@remix-run/cloudflare";
import {pageData} from '~/components/ExobaseData';

export const exobaseLoader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug ?? 'exobase';
        const content = pageData.get(slug);

        if (!content) {
            throw new Error('Page not found');
        }

        const parsedContent = content.replace(/\[\[(.*?)\]\]/g, function (match, p1) {
            return `<a href="/exobase/${p1}">${p1}</a>`;
        });

        return json({ content: parsedContent });
    } catch (error) {
        return json({ error: (error as any).message }, { status: 404 });
    }
};