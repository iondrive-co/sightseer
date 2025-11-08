import {useLoaderData, useLocation} from '@remix-run/react';
import Sidebar from '~/components/Sidebar';

function TitleAndBreadcrumbs() {
    const location = useLocation();
    const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'exobase');
    return (
        <div className="title">
            <h1>{currentPage.replace(/_/g, ' ')}</h1>
        </div>
    )
}

function InfoBox({ imageName, caption }: { imageName?: string, caption?: string }) {
    if (!imageName) return null;
    return (
        <div className="infobox">
            <picture>
                <img
                    src={`/images/${imageName}`}
                    alt={caption || ''}
                    loading="lazy"
                    decoding="async"
                />
            </picture>
            {caption && <div className="infobox-caption">{caption}</div>}
        </div>
    );
}

function ExobaseArticle() {
    const location = useLocation();
    // @ts-expect-error content, classification, imageName, caption
    const { content, classification, imageName, caption } = useLoaderData();

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <div className="article">
                <TitleAndBreadcrumbs />
                <article className="article-text">
                    <InfoBox imageName={imageName} caption={caption} />
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