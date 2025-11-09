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

    // Split content at first closing tag (paragraph or list)
    const splitAfterFirstParagraph = (htmlContent: string) => {
        // Find first closing </ul> or </p> that has content
        const firstUlEnd = htmlContent.indexOf('</ul>');
        const firstPEnd = htmlContent.indexOf('</p>');

        let splitPoint = -1;

        // Find which comes first
        if (firstUlEnd > -1 && firstPEnd > -1) {
            splitPoint = Math.min(firstUlEnd, firstPEnd);
        } else if (firstUlEnd > -1) {
            splitPoint = firstUlEnd;
        } else if (firstPEnd > -1) {
            splitPoint = firstPEnd;
        }

        if (splitPoint === -1) {
            // No paragraphs found, return all as rest
            return { firstPart: '', restPart: htmlContent };
        }

        // Add length of closing tag
        splitPoint += (htmlContent.substring(splitPoint).startsWith('</ul>') ? 5 : 4);

        return {
            firstPart: htmlContent.substring(0, splitPoint),
            restPart: htmlContent.substring(splitPoint)
        };
    };

    const { firstPart, restPart } = imageName ? splitAfterFirstParagraph(content) : { firstPart: '', restPart: content };

    return (
        <div key={location.key} className="article-container">
            <Sidebar />
            <div className="article">
                <TitleAndBreadcrumbs />
                <article className="article-text">
                    {imageName ? (
                        <>
                            {/* Desktop: hidden first part, infobox floats */}
                            <div className="desktop-only">
                                <InfoBox imageName={imageName} caption={caption} />
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                            {/* Mobile: first para, then image, then rest */}
                            <div className="mobile-only">
                                <div dangerouslySetInnerHTML={{ __html: firstPart }} />
                                <InfoBox imageName={imageName} caption={caption} />
                                <div dangerouslySetInnerHTML={{ __html: restPart }} />
                            </div>
                        </>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                </article>
                <div className="classification-section">
                    Classification: <a href={`/exobase/Category-${classification.split('/')[0].replace(/ /g, '_')}`}>{classification}</a>
                </div>
            </div>
        </div>
    );
}

export default ExobaseArticle;