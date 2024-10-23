import {useLoaderData} from '@remix-run/react';
import Sidebar from "~/components/Sidebar";
import {classificationOverviewLoader} from '~/components/exobase/ExobaseLoader';

export const loader = classificationOverviewLoader;
function Exobase() {
    const { classifications } = useLoaderData<{ classifications: string[] }>();

    return (
        <div className="article-container">
            <Sidebar />
            <div className="article">
                <h1>Classifications</h1>
                {classifications.map(classification => (
                    <div key={classification}>
                        <a href={`/exobase/Category-${classification}`}>{classification}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Exobase;