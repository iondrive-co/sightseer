import {exobaseLoader} from '~/components/exobase/ExobaseLoader';
import {useLoaderData, useLocation} from 'react-router';
import ExobaseArticle from '~/components/exobase/ExobaseArticle';
import Sidebar from "~/components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/exobase.css';

export const loader = exobaseLoader;
type ArticleData = [string, {content: string, classification: string}];

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