import {useLoaderData, useLocation} from '@remix-run/react';
import Sidebar from '~/components/Sidebar';

function TitleAndBreadcrumbs() {
    const location = useLocation();
    const currentPage = location.pathname.split('/').pop() || 'exobase';
    return (
        <div style={{ textAlign: 'center', paddingTop: '10%' }}>
            <h1>{currentPage}</h1>
        </div>
    )
}

function ExobaseArticle() {
    const location = useLocation();
    const { content } = useLoaderData();

    return (
        <div key={location.key} style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '0 10%', whiteSpace: 'pre' }}>
                <TitleAndBreadcrumbs />
                <article style={{ fontSize: '25px' }}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
            </div>
        </div>
    );
}

export default ExobaseArticle;