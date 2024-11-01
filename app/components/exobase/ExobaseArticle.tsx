import {useLoaderData, useLocation} from '@remix-run/react';
import Sidebar from '~/components/Sidebar';
import '~/styles/tailwind.css';
import '~/styles/exobase.css';

function TitleAndBreadcrumbs() {
    const location = useLocation();
    const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'exobase');
    return (
        <div className="title">
            <h1>{currentPage.replace(/_/g, ' ')}</h1>
        </div>
    )
}

function ExobaseArticle() {
    const location = useLocation();
    // @ts-expect-error content, classification
    const { content, classification } = useLoaderData();

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <div className="article">
                <TitleAndBreadcrumbs />
                <article className="article-text">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
                <div className="classification-section">
                    Classification: <a href={`/exobase/Category-${classification.split('/')[0].replace(/ /g, '_')}`}>{classification}</a>
                </div>
            </div>
        </div>
    );
}

export default ExobaseArticle;