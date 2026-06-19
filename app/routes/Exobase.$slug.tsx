import type {MetaFunction} from 'react-router';
import {exobaseLoader} from '~/components/exobase/ExobaseLoader';
import {pageData} from '~/components/exobase/ExobaseData';
import {useLoaderData, useLocation} from 'react-router';
import ExobaseArticle from '~/components/exobase/ExobaseArticle';
import Sidebar from "~/components/Sidebar";
import {seo, truncate} from "~/utils/seo";
import '~/styles/tailwind.css';
import '~/styles/exobase.css';

export const loader = exobaseLoader;
type ArticleData = [string, {content: string, classification: string}];

/** Strip the wiki/markdown syntax from raw article source to plain prose. */
function plainText(raw: string): string {
    return raw
        .replace(/\$\$\$[\s\S]*?\$\$\$/g, ' ')        // inline code blocks
        .replace(/%%%[\s\S]*?%%%/g, ' ')              // pre code blocks
        .replace(/\[\[(.*?)(?:~.*?)?]]/g, '$1')       // wiki links -> display text
        .replace(/^[#-]\s+/gm, '')                    // heading / list markers
        .replace(/\s+/g, ' ')
        .trim();
}

export const meta: MetaFunction = ({params}) => {
    const rawSlug = decodeURIComponent(params.slug ?? 'Exobase');
    const key = rawSlug.replace(/_/g, ' ');

    // The pseudo-overview slug (/exobase/Exobase) consolidates to the index.
    if (key.toLowerCase() === 'exobase') {
        return seo({
            title: 'Exobase',
            description: 'An interlinked wiki of speculative future history — its polities, people, technologies, and places.',
            path: '/exobase',
        });
    }

    const article = pageData.get(key);
    if (article) {
        return seo({
            title: key,
            description: truncate(plainText(article.content)),
            path: `/exobase/${encodeURIComponent(key.replace(/ /g, '_'))}`,
        });
    }

    // Otherwise this is a classification / category listing.
    const name = key.replace(/^Category-/, '');
    return seo({
        title: name,
        description: `Exobase entries classified under ${name}.`,
        path: `/exobase/${encodeURIComponent(rawSlug.replace(/ /g, '_'))}`,
    });
};

function ClassificationPage({ data, noSubcategory }: { data: Record<string, ArticleData[]>, noSubcategory: ArticleData[] }) {
    const location = useLocation();
    const classification = decodeURIComponent(location.pathname.split('/')[2]).replace('Category-', '');

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <main id="main-content" className="article">
                <h1>{classification}</h1>
                <ul>
                    {noSubcategory.map(([slug]) => (
                        <li key={slug}>
                            <a href={`/exobase/${slug}`}>{slug}</a>
                        </li>
                    ))}
                </ul>
                {Object.keys(data).map(subcategory => (
                    <div key={subcategory}>
                        {subcategory !== '' && <h2>{subcategory}</h2>}
                        <ul>
                            {data[subcategory].map(([slug]) => (
                                <li key={slug}>
                                    <a href={`/exobase/${slug}`}>{slug}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <br/>
                <nav className="classification-section" aria-label="Exobase navigation">
                    See all <a href={`/exobase`}>Classifications</a>
                </nav>
            </main>
        </div>
    );
}

function Exobase() {
    const data = useLoaderData();
    if (data.isClassification) {
        return <ClassificationPage data={data.articles} noSubcategory={data.noSubcategory} />;
    } else {
        return <ExobaseArticle />;
    }
}
export default Exobase;