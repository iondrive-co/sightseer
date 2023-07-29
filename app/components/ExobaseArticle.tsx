import {useLoaderData, useLocation} from '@remix-run/react';
import Sidebar from '~/components/Sidebar';
import '~/styles/styles.css';
import '~/styles/exobase.css';

function TitleAndBreadcrumbs() {
    const location = useLocation();
    const currentPage = location.pathname.split('/').pop() || 'exobase';
    return (
        <div className="title">
            <h1>{currentPage.replace(/_/g, ' ')}</h1>
        </div>
    )
}

function ExobaseArticle() {
    const location = useLocation();
    const { content, classification } = useLoaderData();

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <div className="article">
                <TitleAndBreadcrumbs />
                <article className="article-text">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
                <div>Classification: <a href={`/exobase/Category-${classification.replace(/ /g, '_')}`}>{classification}</a></div>
            </div>
        </div>
    );
}

export default ExobaseArticle;