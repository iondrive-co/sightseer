import {useLoaderData} from '@remix-run/react';
import {classificationOverviewLoader} from '~/components/exobase/ExobaseLoader';
import Sidebar from "~/components/Sidebar";

export let loader = classificationOverviewLoader;

function ExobaseClassifications() {
    const { classifications } = useLoaderData<{classifications: string[]}>();

    return (
        <div className="article-container">
            <Sidebar/>
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

export default ExobaseClassifications;
