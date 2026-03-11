import {useLoaderData} from 'react-router';
import Sidebar from "~/components/Sidebar";
import {classificationOverviewLoader} from '~/components/exobase/ExobaseLoader';
import '~/styles/tailwind.css';
import '~/styles/exobase.css';

export const loader = classificationOverviewLoader;
function Exobase() {
    const { classifications } = useLoaderData<{ classifications: string[] }>();

    return (
        <div className="article-container">
            <Sidebar />
            <main id="main-content" className="article">
                <h1>Classifications</h1>
                <nav aria-label="Exobase classifications">
                    <ul className="list-none p-0">
                        {classifications.map(classification => (
                            <li key={classification}>
                                <a href={`/exobase/Category-${classification}`}>{classification}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </main>
        </div>
    );
}
export default Exobase;