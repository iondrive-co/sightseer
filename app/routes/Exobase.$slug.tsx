import {exobaseLoader} from '~/components/ExobaseLoader';
import {useLoaderData, useLocation} from '@remix-run/react';
import ExobaseArticle from '~/components/ExobaseArticle';
import Sidebar from "~/components/Sidebar";

export let loader = exobaseLoader;
type ArticleData = [string, {content: string, classification: string}];

function ClassificationPage({ data }: { data: Record<string, ArticleData[]> }) {
    const location = useLocation();
    const classification = location.pathname.split('/')[2].replace('Category-', '');

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <div className="article">
                <h1>{classification}</h1>
                {Object.keys(data).map(subcategory => (
                    <div key={subcategory}>
                        <h2>{subcategory}</h2>
                        <ul>
                            {data[subcategory].map(([slug]) => (
                                <li key={slug}>
                                    <a href={`/exobase/${slug}`}>{slug}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="classification-section">
                    See all <a href={`/exobase/Classifications`}>Classifications</a>
                </div>
            </div>
        </div>
    );
}

function Exobase() {
    const data = useLoaderData();

    if (data.isClassification) {
        return <ClassificationPage data={data.articles} />;
    } else {
        return <ExobaseArticle />;
    }
}

export default Exobase;
