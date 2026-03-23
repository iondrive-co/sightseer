import type {LoaderFunction} from "react-router";
import {useLoaderData} from "react-router";
import {Story, stories} from "~/components/HolonsData";
import Sidebar from "~/components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/holons.css';

export const loader: LoaderFunction = async () => {
    return stories;
};

export default function Holons() {
    const stories: Story[] = useLoaderData();

    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-container">
                <h1 className="sr-only">Holons</h1>
                <div className="holons-list">
                    {stories.map(story => (
                        <details key={story.name} className="holons-story">
                            <summary>
                                <span className="holons-name">{story.name}</span>
                            </summary>
                            <div className="holons-content">
                                {story.content.split(/\n\s*\n/).filter(s => s.trim()).map((paragraph, i) => (
                                    <p key={i}>{paragraph.replace(/\n/g, ' ').trim()}</p>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </main>
        </div>
    );
}
